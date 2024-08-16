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
  /** Рейтинг */
  rating: number;
  /** Бренд */
  brand: Brand;
  /** Категори */
  category: Category;
}

export interface ProductParams {
  page?: number;
  category?: string;
  brand?: string;
  search?: string;
  rating?: number | string;
  ordering?: string;
}
