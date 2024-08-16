import type { Review } from "~/types/revies";

export const useReviewsStore = defineStore("reviewsStore", () => {
  const reviews = ref<Review[]>([]);
  const error = ref<any>(null);

  async function getProductReviews(productId: number) {
    error.value = null;
    try {
      const reviewsResoinse = await $fetch<Review[]>("/api/reviews", {
        params: {
          product_id: productId,
        },
      });
      reviews.value = reviewsResoinse;
    } catch (e) {
      error.value = e;
    }
  }

  async function createComment(body: { comment: string; product: number }) {
    error.value = null;
    try {
      const res = await $fetch("/api/reviews/add-comment", {
        method: "POST",
        body,
      });
      reviews.value.push(res);
    } catch (e) {
      error.value = e;
    }
  }

  function $reset() {
    reviews.value = [];
    error.value = null;
  }
  return {
    reviews,
    error,
    getProductReviews,
    createComment,
    $reset,
  };
});
