<script setup lang="ts">
import ModalCreateOrder from "~/components/Modal/CreateOrder.vue";
import { ElButton, ElTooltip } from "element-plus";
import { useModal } from "vue-final-modal";
import { useCartStore } from "~/stores/cart-store";

const cartStore = useCartStore();

function handleRemoveProductFromCart(productId: number) {
  cartStore.removeProductFromCart(productId);
}

function handleDicrimentProductQuantity(cartItemId: number) {
  cartStore.updateProductQuantity(cartItemId, -1);
}

function handleGoToDetail(id: number) {
  navigateTo(`/${id}`);
}

function handleIncrementProductQuantity(cartItemId: number) {
  cartStore.updateProductQuantity(cartItemId, 1);
}

const { open, close } = useModal({
  component: ModalCreateOrder,
  attrs: {
    onClose() {
      close();
    },
  },
});
</script>

<template>
  <div v-if="!cartStore.cart.length">Пусто</div>
  <div v-else class="flex flex-col gap-4 w-full">
    <ElButton type="info" @click="open">Create order</ElButton>
    <div class="grid grid-cols-2 gap-5">
      <ElCard v-for="cartItem in cartStore.cart" :key="cartItem.id">
        <div class="flex gap-2">
          <ElCard
            class="w-[30vw] h-[40vh] cursor-pointer hover:scale-95"
            @click="handleGoToDetail(cartItem.product.id)"
          >
            <div
              class="bg-contain w-full h-full bg-center bg-no-repeat rounded-sm bg-white relative"
              :style="{ backgroundImage: `url(${cartItem.product.image_url})` }"
            />
          </ElCard>
          <div class="flex flex-col justify-between items-start">
            <div class="flex items-start gap-4 justify-start">
              <ElTooltip content="Remove from cart" placement="top">
                <ElButton
                  icon="Delete"
                  type="danger"
                  circle
                  @click="handleRemoveProductFromCart(cartItem?.product.id)"
                />
              </ElTooltip>

              <div class="flex items-center gap-2">
                <ElButton
                  circle
                  @click="handleDicrimentProductQuantity(cartItem.id)"
                >
                  -
                </ElButton>
                <span>{{ cartItem.quantity }}</span>
                <ElButton
                  circle
                  @click="handleIncrementProductQuantity(cartItem.id)"
                >
                  +
                </ElButton>
              </div>
            </div>

            <div>
              <p>
                Brand: <ElTag>{{ cartItem.product.brand.name }}</ElTag>
              </p>
              <p>
                <b>{{ cartItem.product.price * cartItem.quantity }} Br</b>
              </p>
            </div>
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
