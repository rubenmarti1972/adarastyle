export interface Department {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: any;
  icon?: string;
  displayOrder: number;
  isActive: boolean;
  parentDepartment?: Department;
  subDepartments?: Department[];
  metaTitle?: string;
  metaDescription?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
