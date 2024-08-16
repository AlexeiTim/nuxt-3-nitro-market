<script setup lang="ts">
import { ElSkeleton } from "element-plus";
import { useCartStore } from "~/stores/cart-store";
import AddProductToCartButton from "../components/AddProductToCartButton.vue";
import DeleteProductFromCartButton from "~/components/DeleteProductFromCartButton.vue";
import { useReviewsStore } from "~/stores/reviews-store";
import { notifyService } from "~/services/notify.service";

const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();
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

onBeforeUnmount(() => {
  reviewsStore.$reset();
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-if="status === 'pending'">
      <ElSkeleton />
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
        <div class="flex flex-col items-start gap-3">
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
    <div class="flex flex-col gap-2">
      <h1>Reviews</h1>
      <ElCard v-for="review in reviewsStore.reviews" :key="review.id">
        <template #header>
          <p>
            {{ review.user.username }}
            {{ $moment(review.created_at).format("DD.MM.YYYY HH:mm:ss") }}
          </p>
        </template>
        <p>{{ review.comment }}</p>
      </ElCard>
      <ElCard>
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
