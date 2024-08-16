<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from "element-plus";
import { useCartStore } from "~/stores/cart-store";
import AddProductToCartButton from "../components/AddProductToCartButton.vue";
import DeleteProductFromCartButton from "~/components/DeleteProductFromCartButton.vue";
import { useReviewsStore } from "~/stores/reviews-store";
import { notifyService } from "~/services/notify.service";

const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();
const userStore = useUserStore();
const reviewsStore = useReviewsStore();

const { data, status } = useAsyncData(
  async () =>
    await Promise.all([
      productsStore.getProduct(+route.params.id),
      reviewsStore.getProductReviews(+route.params.id),
    ])
);
const isLoading = ref(false);
const product = computed(() => data.value?.[0]);

if (!product)
  throw createError({
    statusCode: 404,
    message: "Not found Product",
    fatal: true,
  });

useHead({
  title: product.value?.name,
});

const comment = ref("");

async function handleAddComment() {
  if (!product.value) return;

  isLoading.value = true;
  await reviewsStore.createComment({
    comment: comment.value,
    product: product.value?.id,
  });
  isLoading.value = false;

  if (reviewsStore.error) return;

  comment.value = "";
  notifyService.success("Review added");
}

async function handleDeleteReview(id: number) {
  isLoading.value = true;
  await reviewsStore.removeReview(id);
  isLoading.value = false;
}

onBeforeUnmount(() => {
  reviewsStore.$reset();
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-if="status === 'pending'">
      <ElSkeleton class="flex gap-4 w-full" animated>
        <template #template>
          <div class="flex gap-4 w-full">
            <ElSkeletonItem variang="image" style="width: 40vw; height: 50vh" />
            <div class="flex flex-col gap-4 w-full">
              <ElSkeletonItem v-for="i in 5" :key="i" />
            </div>
          </div>
        </template>
      </ElSkeleton>
    </div>
    <div v-else-if="product" class="gap-4 flex flex-col md:flex-row">
      <ElCard class="w-[100vw] h-[50vh]">
        <div
          class="bg-contain w-full h-full bg-center bg-no-repeat rounded-sm bg-white relative"
          :style="{ backgroundImage: `url(${product.image_url})` }"
        />
      </ElCard>

      <div
        class="flex-grow md:max-w-[50vw] md:min-w-[50vw] flex flex-col justify-between gap-2 md:items-start"
      >
        <div class="w-full">
          <h3 class="font-bold">{{ product.name }}</h3>
          <p class="w-full">{{ product.description }}</p>
        </div>
        <div class="flex flex-col items-start gap-3 w-full">
          <div class="flex justify-start gap-2 flex-col items-start">
            <p class="text-sm">
              Category:
              <ElTag type="primary">{{ product.category.name }}</ElTag>
            </p>
            <p>
              Brand: <ElTag type="success">{{ product.brand.name }}</ElTag>
            </p>
          </div>
          <ElRate :model-value="product.rating" disabled />
          <p>
            Price: <b>{{ product.price }} Br</b>
          </p>
          <AddProductToCartButton
            v-if="!cartStore.hasProductInCart(product.id)"
            :product="product"
          />
          <DeleteProductFromCartButton v-else :product-id="product.id" />
        </div>
      </div>
    </div>
    <ElSkeleton v-if="status === 'pending'" animated>
      <template #template>
        <ElSkeletonItem style="width: 100%; height: 100px" />
      </template>
    </ElSkeleton>
    <div v-else class="flex flex-col gap-2">
      <h1 class="text-center">Reviews</h1>
      <ElCard v-if="!reviewsStore.reviews?.length">
        <div class="flex items-center justify-center">
          <ElTag type="primary">Empty</ElTag>
        </div>
      </ElCard>
      <ElCard v-for="review in reviewsStore.reviews" :key="review.id">
        <template #header>
          <div class="flex items-center justify-between">
            <p>
              {{ review.user.username }}
              {{ $moment(review.created_at).format("DD.MM.YYYY HH:mm:ss") }}
            </p>
            <ElButton
              v-show="userStore.user && review.user.id === userStore?.user.id"
              circle
              type="danger"
              icon="Delete"
              @click="handleDeleteReview(review.id)"
            />
          </div>
        </template>
        <p>{{ review.comment }}</p>
      </ElCard>
      <ElCard v-if="userStore.user">
        <div class="flex flex-col gap-2">
          <ElInput v-model="comment" />
          <div class="flex items-center justify-end">
            <ElButton
              type="primary"
              :loading="isLoading"
              @click="handleAddComment"
            >
              Create comment
            </ElButton>
          </div>
        </div>
      </ElCard>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-card__body) {
  width: 100%;
  height: 100%;
}
</style>
