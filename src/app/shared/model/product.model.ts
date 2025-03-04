export interface Category {
  public_id: string;
  name: string;
}

export interface Product {
  public_id: string;
  name: string;
  description: string;
  brand: string;
  color: string;
  price: number;
  featured: boolean;
  stock: number;
  picture_url: string;
}

export interface CartItemAdd {
  publicId: string;
  quantity: number;
}