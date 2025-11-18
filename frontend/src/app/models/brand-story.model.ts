export interface BrandStory {
  id: number;
  documentId: string;
  title: string;
  headline?: string;
  content: string;
  emoji?: string;
  image?: any;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  layout: 'image-left' | 'image-right' | 'image-top' | 'image-background' | 'text-only';
  ctaText?: string;
  ctaLink?: string;
  order: number;
  isActive: boolean;
  showOnHome: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
