import { notifyService } from "~/services/notify.service";
import type { Product } from "~/types/product";

export function useReview() {
  const isLoading = ref(false);
  const reviewsStore = useReviewsStore();
  const comment = ref("");

  async function addReview(product: Product) {
    if (!product) return;

    isLoading.value = true;
    await reviewsStore.createComment({
      comment: comment.value,
      product: product.id,
    });
    isLoading.value = false;

    if (reviewsStore.error) return;

    comment.value = "";
    notifyService.success("Review added");
  }

  async function removeReview(id: number) {
    isLoading.value = true;
    await reviewsStore.removeReview(id);
    isLoading.value = false;

    if (reviewsStore.error) notifyService.error(reviewsStore.error);
  }

  return {
    addReview,
    removeReview,
    comment,
    isLoading,
  };
}
