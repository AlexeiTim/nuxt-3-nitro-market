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
}
