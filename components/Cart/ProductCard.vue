<script setup lang="ts">
import type { CartItem } from "~/types/cart";

defineProps<{
  cartItem: CartItem;
}>();

const cartStore = useCartStore();

function handleGoToDetail(id: number) {
  navigateTo(`/${id}`);
}

function handleRemoveProductFromCart(productId: number) {
  cartStore.removeProductFromCart(productId);
}

function handleDicrimentProductQuantity(cartItemId: number) {
  cartStore.updateProductQuantity(cartItemId, -1);
}

function handleIncrementProductQuantity(cartItemId: number) {
  cartStore.updateProductQuantity(cartItemId, 1);
}
</script>

<template>
  <ElCard>
    <div class="flex-col flex md:flex-row gap-2">
      <ElCard
        class="w-full md:w-[30vw] h-[25vh] md:h-[40vh] cursor-pointer hover:scale-95"
        @click="handleGoToDetail(cartItem.product.id)"
      >
        <div
          class="bg-contain w-full h-full bg-center bg-no-repeat rounded-sm bg-white relative"
          :style="{ backgroundImage: `url(${cartItem.product.image_url})` }"
        />
      </ElCard>
      <div class="flex flex-col gap-4 md:gap-0 justify-between items-start">
        <h2>{{ cartItem.product.name }}</h2>

        <div class="flex flex-col gap-2">
          <div
            class="flex gap-4 items-center md:items-start md:justify-normal justify-between w-full"
          >
            <div class="flex items-center gap-2">
              <ElButton
                size="small"
                circle
                @click="handleDicrimentProductQuantity(cartItem.id)"
              >
                -
              </ElButton>
              <span>{{ cartItem.quantity }}</span>
              <ElButton
                size="small"
                circle
                @click="handleIncrementProductQuantity(cartItem.id)"
              >
                +
              </ElButton>
            </div>
            <ElTooltip content="Remove from cart" placement="top">
              <ElButton
                size="small"
                icon="Delete"
                type="danger"
                circle
                @click="handleRemoveProductFromCart(cartItem?.product.id)"
              />
            </ElTooltip>
          </div>
          <p>
            <b>{{ cartItem.product.price * cartItem.quantity }} Br</b>
          </p>
        </div>
      </div>
    </div>
  </ElCard>
</template>

<style scoped>
:deep(.el-card__body) {
  width: 100%;
  height: 100%;
}
</style>
