import { Theme } from './theme.model';

export interface StoreConfig {
  id: number;
  storeName: string;
  storeSlug: string;
  tagline: string;
  description: string;
  logo?: any;
  favicon?: any;
  activeTheme?: Theme;
  currency: string;
  currencySymbol: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  socialMedia: SocialMedia;
  paymentMethods: PaymentMethods;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
}

export interface PaymentMethods {
  wompi: WompiConfig;
  nequi: NequiConfig;
}

export interface WompiConfig {
  enabled: boolean;
  publicKey: string;
}

export interface NequiConfig {
  enabled: boolean;
  phone: string;
}
