export interface TableData<T> {
  count: number;
  prev_page: number | null;
  next_page: number | null;
  results: T[];
}
