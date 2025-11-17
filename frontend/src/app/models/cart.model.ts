import { Product } from './product.model';

export interface Cart {
  id: number;
  sessionId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode?: string;
  expiresAt?: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
  subtotal: number;
}
