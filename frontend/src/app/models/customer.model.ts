export interface Customer {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  documentType: DocumentType;
  documentNumber?: string;
  address?: any;
  shippingAddresses?: any[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type DocumentType = 'CC' | 'CE' | 'NIT' | 'Passport';
