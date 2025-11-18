export interface HeroBanner {
  id: number;
  documentId: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  image: any;
  mobileImage?: any;
  overlayOpacity: number;
  textPosition: 'left' | 'center' | 'right';
  textColor: 'light' | 'dark';
  order: number;
  isActive: boolean;
  animationType: 'fade' | 'slide' | 'zoom' | 'none';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
