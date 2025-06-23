import { Routes } from '@angular/router';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent } from '@info/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./domains/products/pages/list/list.component'),
      },
      {
        path: 'category/:slug',
        loadComponent: () =>
          import('./domains/products/pages/list/list.component'),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./domains/info/pages/about/about.component'),
      },
      {
        path: 'product/:slug',
        loadComponent: () =>
          import(
            './domains/products/pages/product-detail/product-detail.component'
          ),
      },
      {
        path: 'carga',
        loadComponent: () =>
          import(
            './domains/products/components/carga-archivos/carga-archivos.component'
          ).then((m) => m.CargaArchivosComponent),
      },
      {
        path: 'modificar-eliminar',
        loadComponent: () =>
          import(
            './domains/products/components/edit-files/edit-files.component'
          ).then((m) => m.EditFilesComponent),
      },
      {
        path: 'carga-categorias',
        loadComponent: () =>
          import(
            './domains/products/components/carga-categorias/carga-categorias.component'
          ).then((m) => m.CargaCategoriasComponent),
      },
      {
        path: 'carga-departamentos',
        loadComponent: () =>
          import(
            './domains/products/components/department/department.component'
          ).then((m) => m.DepartmentComponent),
      },

    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
