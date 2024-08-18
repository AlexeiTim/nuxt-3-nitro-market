<script setup lang="ts">
import type { Product } from "~/types/product";

const props = defineProps<{
  product: Product;
}>();

const reviewsStore = useReviewsStore();
const userStore = useUserStore();
const route = useRoute();
const { comment, isLoading, addReview, removeReview } = useReview();

const { status } = useAsyncData(() =>
  reviewsStore.getProductReviews(+route.params.id)
);

const product = computed(() => props.product);

async function handleAddComment() {
  if (!product.value) return;
  addReview(product.value);
}

async function handleDeleteReview(id: number) {
  removeReview(id);
}

onBeforeUnmount(() => {
  reviewsStore.$reset();
});
</script>

<template>
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
          <ElTooltip content="Delete your review" placement="top">
            <ElButton
              v-show="userStore.user && review.user.id === userStore?.user.id"
              circle
              type="danger"
              icon="Delete"
              @click="handleDeleteReview(review.id)"
            />
          </ElTooltip>
        </div>
      </template>
      <p>{{ review.comment }}</p>
    </ElCard>
    <ElCard v-if="userStore.user" class="mt-5">
      <template #header> Craete you own review </template>
      <div class="flex flex-col gap-2">
        <ElInput v-model="comment" placeholder="Type comment" />
        <div class="flex items-center justify-end">
          <ElButton
            type="primary"
            :loading="isLoading"
            @click="handleAddComment"
          >
            Create
          </ElButton>
        </div>
      </div>
    </ElCard>
    <div v-else class="flex items-center gap-2">
      <ElTag type="warning"> If you wanna add review, you need login</ElTag>
      <NuxtLink to="/login">
        <ElLink>Go to login</ElLink>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
