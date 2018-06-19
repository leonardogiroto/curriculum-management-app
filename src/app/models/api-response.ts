import { Curriculum } from './curriculum';

export interface ApiResponse {
  count: number;
  data: Curriculum[];
  page: number;
  per_page: number;
}
