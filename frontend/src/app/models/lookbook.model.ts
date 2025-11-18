import { Product } from './product.model';

export interface Lookbook {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  season?: string;
  year?: number;
  coverImage: any;
  images: any[];
  products?: Product[];
  layoutType: 'grid' | 'masonry' | 'carousel' | 'split';
  isActive: boolean;
  order: number;
  publishDate?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
