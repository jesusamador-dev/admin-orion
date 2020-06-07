export interface ProductData {
  id: number;
  code: string;
  id_department: number;
  id_category: number;
  name: string;
  description: string;
  id_brand: number;
  unit_price: number;
  purchase_price: number;
  quantity_small_size: number;
  quantity_medium_size: number;
  quantity_big_size: number;
  status: string | number;
  discount_price: number;
  create_at: string;
  update_at: string;
}
