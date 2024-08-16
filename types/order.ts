export interface Order {
  id: number;
  /** Дата создания заявки */
  created_at: string;
  /** Имя заказчика */
  first_name: string;
  /** Фамилия заказчика */
  last_name: string;
  /** Общая сумма заказа */
  total_price: number;
}

export interface OrderCreateData {
  first_name: string;
  last_name: string;
  total_price: number;
}
