export interface CategoryData {
  id: number;
  name: string;
  status: string | number;
  id_department: number;
  created_at: number;
  update_at: number;
  department?: string;
}
