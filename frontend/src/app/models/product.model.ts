import { Department } from './department.model';

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription?: string;
  price: number;
  salePrice?: number;
  cost?: number;
  images: any[];
  department?: Department;
  inStock: boolean;
  stockQuantity: number;
  trackInventory: boolean;
  specifications: ProductSpecifications;
  tags: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestseller: boolean;
  rating: number;
  reviewCount: number;
  metaTitle?: string;
  metaDescription?: string;
  relatedProducts?: Product[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSpecifications {
  material?: string;
  dimensions?: string;
  weight?: string;
  color?: string;
  brand?: string;
  madeIn?: string;
  [key: string]: any;
}
