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
  image_url: string;
}

export interface CreateProduct {
  name: string;
  description: string;
  brand: string;
  color: string;
  price: number;
  featured: boolean;
  stock: number;
  category_public_id: string;
}

export interface CartItem {
  public_id: string;
  name: string;
  brand: string;
  price: number;
  image_url: string;
  quantity?: number;
}