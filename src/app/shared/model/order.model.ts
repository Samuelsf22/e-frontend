export interface OrderDetails {
  product_public_id: string;
  price: number;
  quantity: number;
  product_name: string;
}

export interface Order {
  public_id: string;
  status: string;
}

export interface OrderedProduct {
  product_public_id: string;
  price: number;
  quantity: number;
  product_name: string;
}

export interface OrderRequest {
  username: string;
  products: OrderedProduct[];
}
