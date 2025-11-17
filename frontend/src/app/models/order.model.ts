import { Product } from './product.model';
import { Invoice } from './invoice.model';

export interface Order {
  id: number;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentDetails?: any;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  notes?: string;
  invoice?: Invoice;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  product?: Product;
  productName: string;
  productSku?: string;
  quantity: number;
  price: number;
  subtotal: number;
  productSnapshot?: any;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus = 'pending' | 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'authorized' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'wompi' | 'nequi' | 'cash' | 'transfer';
