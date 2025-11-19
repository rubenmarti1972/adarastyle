import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { DepartmentService } from '../../services/department.service';
import { StoreConfigService } from '../../services/store-config.service';
import { HeroBannerService } from '../../services/hero-banner.service';
import { LookbookService } from '../../services/lookbook.service';
import { FeaturedCollectionService } from '../../services/featured-collection.service';
import { BrandStoryService } from '../../services/brand-story.service';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';
import { Department } from '../../models/department.model';
import { HeroBanner } from '../../models/hero-banner.model';
import { Lookbook } from '../../models/lookbook.model';
import { FeaturedCollection } from '../../models/featured-collection.model';
import { BrandStory } from '../../models/brand-story.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  config = this.storeConfigService.config;
  Math = Math; // Expose Math to template

  // Hero Banners
  heroBanners = signal<HeroBanner[]>([]);
  currentBannerIndex = signal(0);

  // Collections & Lookbooks
  featuredCollections = signal<FeaturedCollection[]>([]);
  lookbooks = signal<Lookbook[]>([]);

  // Products
  featuredProducts: Product[] = [];
  newArrivals: Product[] = [];
  bestsellers: Product[] = [];
  departments: Department[] = [];

  // Brand Stories
  brandStories = signal<BrandStory[]>([]);

  // Estado para mostrar notificaciones
  addingToCart = signal<number | null>(null);
  addedToCart = signal<number | null>(null);

  constructor(
    private productService: ProductService,
    private departmentService: DepartmentService,
    private storeConfigService: StoreConfigService,
    private heroBannerService: HeroBannerService,
    private lookbookService: LookbookService,
    private featuredCollectionService: FeaturedCollectionService,
    private brandStoryService: BrandStoryService,
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Load hero banners
    this.heroBannerService.getActiveBanners().subscribe(banners => {
      this.heroBanners.set(banners);
      if (banners.length > 0) {
        this.startBannerRotation();
      }
    });

    // Load featured collections
    this.featuredCollectionService.getActiveCollections(6).subscribe(collections => {
      this.featuredCollections.set(collections);
    });

    // Load lookbooks
    this.lookbookService.getActiveLookbooks(2).subscribe(lookbooks => {
      this.lookbooks.set(lookbooks);
    });

    // Load brand stories
    this.brandStoryService.getHomeStories(2).subscribe(stories => {
      this.brandStories.set(stories);
    });

    // Load products
    this.productService.getFeaturedProducts(8).subscribe(products => {
      this.featuredProducts = products;
    });

    this.productService.getNewArrivals(8).subscribe(products => {
      this.newArrivals = products;
    });

    this.productService.getBestsellers(4).subscribe(products => {
      this.bestsellers = products;
    });

    // Load departments
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  addToCart(product: Product, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.addingToCart.set(product.id);

    this.cartService.addItem(product.id, 1).subscribe({
      next: () => {
        this.addingToCart.set(null);
        this.addedToCart.set(product.id);

        // Ocultar notificación después de 2 segundos
        setTimeout(() => {
          this.addedToCart.set(null);
        }, 2000);
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        this.addingToCart.set(null);
        alert('Error al agregar al carrito. Por favor intenta de nuevo.');
      }
    });
  }

  isAddingToCart(productId: number): boolean {
    return this.addingToCart() === productId;
  }

  wasAddedToCart(productId: number): boolean {
    return this.addedToCart() === productId;
  }

  startBannerRotation(): void {
    setInterval(() => {
      const banners = this.heroBanners();
      if (banners.length > 1) {
        this.currentBannerIndex.set((this.currentBannerIndex() + 1) % banners.length);
      }
    }, 5000);
  }

  nextBanner(): void {
    const banners = this.heroBanners();
    if (banners.length > 1) {
      this.currentBannerIndex.set((this.currentBannerIndex() + 1) % banners.length);
    }
  }

  prevBanner(): void {
    const banners = this.heroBanners();
    if (banners.length > 1) {
      this.currentBannerIndex.set(
        (this.currentBannerIndex() - 1 + banners.length) % banners.length
      );
    }
  }

  goToBanner(index: number): void {
    this.currentBannerIndex.set(index);
  }

  getImageUrl(image: any): string {
    const url = this.apiService.getImageUrl(image);
    // Si no hay imagen, devolver placeholder
    if (!url) {
      return 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&h=800&fit=crop';
    }
    return url;
  }

  getProductImage(product: Product): string {
    if (product.images && product.images.length > 0) {
      return this.getImageUrl(product.images[0]);
    }
    // Placeholder si no hay imagen
    return 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }
}
