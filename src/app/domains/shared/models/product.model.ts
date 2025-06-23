import { Category } from './category.model';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
  slug: string;
  features: string[];
}


