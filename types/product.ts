import type { Brand } from "./brand";
import type { Category } from "./category";

export interface Product {
  id: number;
  /** Название товара */
  name: string;
  /** Ссылка на изображение товара */
  image_url: string;
  /** Цена товара */
  price: number;
  /** Краткое описание товара */
  description: string;

  rating: number;

  brand: Brand;

  category: Category;
}

export interface ProductParams {
  rating?: number | null;
}
