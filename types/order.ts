export interface Order {
  id: number;
  /** Дата создания заявки */
  created_at: string;
  /** Имя заказчика */
  first_name: string;
  /** Фамилия заказчика */
  last_name: string;
}
