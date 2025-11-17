import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./components/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'products/:slug',
    loadComponent: () => import('./components/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: 'departments/:slug',
    loadComponent: () => import('./components/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'checkout/success',
    loadComponent: () => import('./components/checkout-success/checkout-success.component').then(m => m.CheckoutSuccessComponent)
  },
  {
    path: 'order/:orderNumber',
    loadComponent: () => import('./components/order-detail/order-detail.component').then(m => m.OrderDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
