export interface Invoice {
  id: number;
  invoiceNumber: string;
  issueDate: string;
  dueDate?: string;
  customerInfo: any;
  items: any[];
  subtotal: number;
  tax: number;
  taxRate: number;
  shipping: number;
  discount: number;
  total: number;
  status: InvoiceStatus;
  pdfUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
