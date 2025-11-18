import { Product } from './product.model';
import { Department } from './department.model';

export interface FeaturedCollection {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  image: any;
  hoverImage?: any;
  backgroundColor: string;
  textColor: string;
  ctaText: string;
  ctaLink?: string;
  products?: Product[];
  department?: Department;
  size: 'small' | 'medium' | 'large' | 'full';
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
