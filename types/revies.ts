export interface Review {
  id: number;
  comment: string;
  created_at: string;
  user: {
    id: number;
    username: string;
  };
  product: number;
}
