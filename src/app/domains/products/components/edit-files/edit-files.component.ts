// edit-files.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '@shared/models/product.model';
import { Department } from '@shared/models/department.model';
import { Category } from '@shared/models/category.model';
import { ProductService } from '@shared/services/product.service';
import { DepartmentService } from '@shared/services/department.service';
import { CategoryService } from '@shared/services/category.service';

@Component({
  selector: 'app-edit-files',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-files.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFilesComponent implements OnInit {
  // servicios inyectados
  private productService    = inject(ProductService);
  private departmentService = inject(DepartmentService);
  private categoryService   = inject(CategoryService);

  // señal central: el producto a crear/editar
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

  // controles de formulario
  searchSlugInput    = signal<string>('');
  featureInput       = signal<string>('');
  imagePreview       = signal<string|undefined>(undefined);

  // listas para selects
  departments        = signal<Department[]>([]);
  categories         = signal<Category[]>([]);
  filteredCategories: Category[] = [];

  // estado de selects
  selectedDepartmentId: number|null = null;
  selectedCategoryId:   number|null = null;

  // modo edición vs creación
  isEdit = signal(false);

  ngOnInit() {
    // carga inicial de departamentos y categorías
    this.departmentService.getDepartments()
      .subscribe(depts => this.departments.set(depts));
    this.categoryService.getCategories()
      .subscribe(cats => {
        this.categories.set(cats);
        this.filteredCategories = cats;
      });
  }

  // ——— BUSCAR EXISTENTE ———
  loadProduct() {
    const slug = this.searchSlugInput().trim().toLowerCase();
    if (!slug) return alert('Por favor ingresa un slug.');
    this.productService.getOneSlug(slug).subscribe({
      next: prod => {
        this.product.set(prod);
        this.isEdit.set(true);
        // sincroniza selects e imagen
        this.selectedDepartmentId = prod.category.departmentId;
        this.selectedCategoryId   = prod.category.id;
        this.imagePreview.set(prod.images[0] || undefined);
      },
      error:() => {
        alert(`Producto con slug "${slug}" no encontrado.`);
      }
    });
  }

  // ——— GUARDAR (crear o actualizar) ———
  save() {
    const now = new Date().toISOString();
    const p = { ...this.product() };

    if (this.isEdit()) {
      p.updatedAt = now;
      this.productService.updateProduct(p);
      alert('✔️ Producto actualizado');
    } else {
      p.slug       = p.title.toLowerCase().trim().replace(/\s+/g, '-');
      p.creationAt = now;
      p.updatedAt  = now;
      this.productService.addProduct(p);
      alert('✔️ Producto creado');
    }
    this.resetForm();
  }

  // ——— ELIMINAR CON CONFIRMACIÓN ———
  delete() {
    const p = this.product();
    if (!this.isEdit() || !p) return;
    if (confirm(`¿Eliminar "${p.title}"?`)) {
      this.productService.deleteProduct(p.id);
      alert('🗑️ Producto eliminado');
      this.resetForm();
    }
  }

  // ——— CARACTERÍSTICAS ———
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

  // ——— SELECTS e IMAGEN ———
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
    const reader = new FileReader();
    reader.onload = ev => this.imagePreview.set(ev.target?.result as string);
    reader.readAsDataURL(input.files[0]);
  }

  // ——— REINICIAR FORMULARIO ———
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
    this.selectedDepartmentId = null;
    this.selectedCategoryId   = null;
    this.isEdit.set(false);
  }

  // ——— HELPERS para ngModel ———
  updateTitle(v: string)       { this.product.set({ ...this.product(), title: v }); }
  updateDescription(v: string) { this.product.set({ ...this.product(), description: v }); }
  updatePrice(v: number)       { this.product.set({ ...this.product(), price: v }); }
}
