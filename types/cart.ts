import type { Product } from "./product";

export interface CartItem {
  id: number;
  /** Товар */
  product: Product;
  /** Кол-во товара в корзине */
  quantity: number;
}
