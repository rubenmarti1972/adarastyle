/* import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Department } from '@shared/models/department.model';
import { Category } from '@shared/models/category.model';
import { DepartmentService } from '@shared/services/department.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carga-archivos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './carga-archivos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargaArchivosComponent {
  product = signal<Product>({
    id: 0,
    title: '',
    description: '',
    price: 0,
    images: [],
    creationAt: '',
    updatedAt: '',
    slug: '',
    category: {
      id: 0,
      name: '',
      image: '',
      slug: '',
      departmentId: 0,
      icon: '',
    },
    features: [],
  });

  // Señales para la imagen
  selectedFile = signal<File | undefined>(undefined);
  imagePreview = signal<string | undefined>(undefined);
  featureInput = signal<string>('');

  // Datos y selecciones
  departments = signal<Department[]>([]);
  categories = signal<Category[]>([]);
  filteredCategories: Category[] = [];
  selectedDepartmentId: number | null = null;
  selectedCategoryId: number | null = null;

  constructor(
    private productService: ProductService,
    private departmentService: DepartmentService,
    private categoryService: CategoryService
  ) {
    this.departmentService.getDepartments().subscribe(depts => {
      this.departments.set(depts);
    });
    this.categoryService.getCategories().subscribe(cats => {
      this.categories.set(cats);
      this.filteredCategories = cats;
    });
  }

  onDepartmentChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const val = target.value ? parseInt(target.value, 10) : null;
    this.selectedDepartmentId = val;
    if (val !== null) {
      this.filteredCategories = this.categories().filter(cat => cat.departmentId === val);
    } else {
      this.filteredCategories = this.categories();
    }
    // Resetear selección de categoría al cambiar de departamento
    //this.selectedCategoryId = null;
  }

  updateTitle(newTitle: string): void {
    this.product.set({ ...this.product(), title: newTitle });
  }

  updateDescription(newDescription: string): void {
    this.product.set({ ...this.product(), description: newDescription });
  }

  updatePrice(newPrice: number): void {
    this.product.set({ ...this.product(), price: newPrice });
  }

  addProduct(): void {
    const currentImage = this.imagePreview();
    if (!currentImage) return;

    const currentProduct = { ...this.product() };
    currentProduct.images.push(currentImage);
    currentProduct.slug = currentProduct.title.toLowerCase().trim().replace(/\s+/g, '-');
    const now = new Date().toISOString();
    currentProduct.creationAt = now;
    currentProduct.updatedAt = now;

    // Busca la categoría seleccionada y asigna el objeto completo
    if (this.selectedCategoryId !== null) {
      const selectedCategory = this.categories().find(cat => cat.id === this.selectedCategoryId);
      if (selectedCategory) {
        currentProduct.category = selectedCategory;
      }
    }

    this.productService.addProduct(currentProduct);

    // Reset formulario y señales
    this.product.set({
      id: 0,
      title: '',
      description: '',
      price: 0,
      images: [],
      creationAt: '',
      updatedAt: '',
      slug: '',
      category: { id: 0, name: '', image: '', slug: '', departmentId: 0, icon: '' },
      features: [],
    });
    this.imagePreview.set(undefined);
    this.selectedFile.set(undefined);
    this.selectedDepartmentId = null;
    this.selectedCategoryId = null;
    this.featureInput.set('');
  }

     addFeature() {
      const feat = this.featureInput().trim();
      if (!feat) return;
      const p = { ...this.product() };
      p.features = [...p.features, feat];
      this.product.set(p);
      console.log('➕ Después de addFeature, features =', this.product().features);
      this.featureInput.set('');
    }


    // Para eliminar una característica concreta
    removeFeature(feat: string) {
      const p = { ...this.product() };
      p.features = p.features.filter(f => f !== feat);
      this.product.set(p);
    }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) return;
    const file = target.files[0];
    this.selectedFile.set(file);
    const reader = new FileReader();
    reader.onload = (e) => this.imagePreview.set(e.target?.result as string);
    reader.readAsDataURL(file);
  }
}
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/models/product.model';
import { Department } from '@shared/models/department.model';
import { Category } from '@shared/models/category.model';
import { ProductService } from '@shared/services/product.service';
import { DepartmentService } from '@shared/services/department.service';
import { CategoryService } from '@shared/services/category.service';


@Component({
  selector: 'app-carga-archivos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './carga-archivos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargaArchivosComponent implements OnInit {
  // inyectamos los servicios
  private productService    = inject(ProductService);
  private departmentService = inject(DepartmentService);
  private categoryService   = inject(CategoryService);

  // Señal principal: producto en edición/creación
  product = signal<Product>({
    id: 0,
    title: '',
    description: '',
    price: 0,
    images: [],
    creationAt: '',
    updatedAt: '',
    slug: '',
    category: { id: 0, name: '', image: '', slug: '', departmentId: 0, icon: '' },
    features: []
  });

  // Form controls
  searchSlugInput    = signal<string>('');
  featureInput       = signal<string>('');
  selectedFile       = signal<File|undefined>(undefined);
  imagePreview       = signal<string|undefined>(undefined);

  // Dropdown data
  departments        = signal<Department[]>([]);
  categories         = signal<Category[]>([]);
  filteredCategories: Category[] = [];

  // Select state
  selectedDepartmentId: number|null = null;
  selectedCategoryId:   number|null = null;

  // Modo: crear vs editar
  isEdit = signal(false);

  ngOnInit() {
    // cargar departamentos
    this.departmentService.getDepartments()
      .subscribe(depts => this.departments.set(depts));
    // cargar categorías
    this.categoryService.getCategories()
      .subscribe(cats => {
        this.categories.set(cats);
        this.filteredCategories = cats;
      });
  }

  // —— Búsqueda y carga de un producto existente ——
  loadProduct() {
    const slug = this.searchSlugInput().trim();
    if (!slug) {
      return alert('Ingresa un slug para buscar');
    }
    this.productService.getOneSlug(slug).subscribe({
      next: prod => {
        this.product.set(prod);
        this.isEdit.set(true);
        // sync selects e imagen
        this.selectedDepartmentId = prod.category.departmentId;
        this.selectedCategoryId   = prod.category.id;
        if (prod.images.length) {
          this.imagePreview.set(prod.images[0]);
        } else {
          this.imagePreview.set(undefined);
        }
      },
      error: () => alert(`Producto con slug "${slug}" no encontrado.`)
    });
  }

  // —— Creación / edición ——
  save() {
    const now = new Date().toISOString();
    const p = { ...this.product() };

    if (this.isEdit()) {
      p.updatedAt = now;
      this.productService.updateProduct(p);
      alert('✔️ Producto actualizado');
    } else {
      p.slug = p.title.toLowerCase().trim().replace(/\s+/g, '-');
      p.creationAt = now;
      p.updatedAt  = now;
      this.productService.addProduct(p);
      alert('✔️ Producto creado');
    }
    this.resetForm();
  }

  // —— Eliminación con confirmación ——
  delete() {
    const p = this.product();
    if (!p || !this.isEdit()) return;
    if (confirm(`¿Seguro que quieres eliminar "${p.title}"?`)) {
      this.productService.deleteProduct(p.id);
      alert('🗑️ Producto eliminado');
      this.resetForm();
    }
  }

  // —— Manejo de características ——
  addFeature() {
    const feat = this.featureInput().trim();
    if (!feat) return;
    const p = { ...this.product() };
    p.features = [...p.features, feat];
    this.product.set(p);
    this.featureInput.set('');
  }

  removeFeature(feat: string) {
    const p = { ...this.product() };
    p.features = p.features.filter(f => f !== feat);
    this.product.set(p);
  }

  // —— Manejo de selects e imágenes ——
  onDepartmentChange(e: Event) {
    const val = +(e.target as HTMLSelectElement).value || null;
    this.selectedDepartmentId = val;
    this.filteredCategories = val !== null
      ? this.categories().filter(c => c.departmentId === val)
      : this.categories();
  }

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    this.selectedFile.set(file);
    const reader = new FileReader();
    reader.onload = ev => this.imagePreview.set(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  // —— Limpia todo para volver al modo "crear" ——
  resetForm() {
    this.product.set({
      id: 0,
      title: '',
      description: '',
      price: 0,
      images: [],
      creationAt: '',
      updatedAt: '',
      slug: '',
      category: { id: 0, name: '', image: '', slug: '', departmentId: 0, icon: '' },
      features: []
    });
    this.searchSlugInput.set('');
    this.featureInput.set('');
    this.imagePreview.set(undefined);
    this.selectedFile.set(undefined);
    this.selectedDepartmentId = null;
    this.selectedCategoryId   = null;
    this.isEdit.set(false);
  }

  // —— Helpers para enlazar al template ——
  updateTitle(v: string)       { this.product.set({ ...this.product(), title: v }); }
  updateDescription(v: string) { this.product.set({ ...this.product(), description: v }); }
  updatePrice(v: number)       { this.product.set({ ...this.product(), price: v }); }

  addProduct(): void {
    const currentImage = this.imagePreview();
    if (!currentImage) return;

    const currentProduct = { ...this.product() };
    currentProduct.images.push(currentImage);
    currentProduct.slug = currentProduct.title.toLowerCase().trim().replace(/\s+/g, '-');
    const now = new Date().toISOString();
    currentProduct.creationAt = now;
    currentProduct.updatedAt = now;

    // Busca la categoría seleccionada y asigna el objeto completo
    if (this.selectedCategoryId !== null) {
      const selectedCategory = this.categories().find(cat => cat.id === this.selectedCategoryId);
      if (selectedCategory) {
        currentProduct.category = selectedCategory;
      }
    }

    this.productService.addProduct(currentProduct);

    // Reset formulario y señales
    this.product.set({
      id: 0,
      title: '',
      description: '',
      price: 0,
      images: [],
      creationAt: '',
      updatedAt: '',
      slug: '',
      category: { id: 0, name: '', image: '', slug: '', departmentId: 0, icon: '' },
      features: [],
    });
    this.imagePreview.set(undefined);
    this.selectedFile.set(undefined);
    this.selectedDepartmentId = null;
    this.selectedCategoryId = null;
    this.featureInput.set('');
  }
}


