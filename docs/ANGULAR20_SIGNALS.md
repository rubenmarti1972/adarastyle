# 🎯 Angular 20 con Signals - Guía Técnica

## ¿Por qué Angular 20 con Signals?

Angular 20 introduce mejoras significativas con el sistema de **Signals**, haciendo el código más reactivo, eficiente y fácil de mantener.

## 🚀 Ventajas de Signals

### 1. **Mejor Rendimiento**
- Change detection más eficiente
- Solo actualiza lo que cambió
- Sin necesidad de Zone.js en muchos casos

### 2. **Código Más Limpio**
```typescript
// ❌ Antes (Observable + Subscription)
export class Component {
  count$ = new BehaviorSubject(0);

  ngOnInit() {
    this.count$.subscribe(value => {
      console.log(value);
    });
  }
}

// ✅ Ahora (Signals)
export class Component {
  count = signal(0);

  // No necesitas ngOnInit para suscripciones
  // Los signals se actualizan automáticamente
}
```

### 3. **Computed Values Automáticos**
```typescript
// Signals permiten valores derivados que se actualizan automáticamente
export class CartService {
  private cartSignal = signal<Cart | null>(null);

  // Computed signals se recalculan solo cuando cambia cartSignal
  public itemCount = computed(() => {
    const cart = this.cartSignal();
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  });

  public total = computed(() => this.cartSignal()?.total ?? 0);
  public isEmpty = computed(() => this.itemCount() === 0);
}
```

## 📦 Servicios Actualizados con Signals

### ThemeService
```typescript
export class ThemeService {
  // Signal privado
  private currentThemeSignal = signal<Theme | null>(null);

  // Computed signal público (read-only)
  public currentTheme = computed(() => this.currentThemeSignal());
  public hasTheme = computed(() => this.currentThemeSignal() !== null);

  // Actualizar el signal
  applyTheme(theme: Theme): void {
    this.currentThemeSignal.set(theme);
    // ... aplicar CSS
  }
}
```

### CartService
```typescript
export class CartService {
  private cartSignal = signal<Cart | null>(null);

  // Computed signals para datos derivados
  public cart = computed(() => this.cartSignal());
  public itemCount = computed(() => {
    const cart = this.cartSignal();
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  });
  public total = computed(() => this.cartSignal()?.total ?? 0);
  public isEmpty = computed(() => this.itemCount() === 0);

  // Actualizar cuando llega nueva data
  addItem(productId: number, quantity: number): Observable<Cart> {
    return this.apiService.post<Cart>('cart/add', {...}).pipe(
      tap(cart => this.cartSignal.set(cart))
    );
  }
}
```

### StoreConfigService
```typescript
export class StoreConfigService {
  private configSignal = signal<StoreConfig | null>(null);

  public config = computed(() => this.configSignal());
  public storeName = computed(() => this.configSignal()?.storeName ?? '');
  public logo = computed(() => this.configSignal()?.logo);

  loadConfig(): Observable<StoreConfig> {
    return this.apiService.get<StoreConfig>('store-config', {...}).pipe(
      tap(config => this.configSignal.set(config))
    );
  }
}
```

## 🎨 Componentes con Signals

### HeaderComponent
```typescript
export class HeaderComponent implements OnInit {
  // Usar signals directamente desde los servicios
  config = this.storeConfigService.config;
  cartItemCount = this.cartService.itemCount;

  constructor(
    private storeConfigService: StoreConfigService,
    public cartService: CartService
  ) {}

  // No necesitas suscripciones en ngOnInit
  // Los signals se actualizan automáticamente en el template
}
```

**Template:**
```html
<!-- Los signals se usan directamente con () -->
<span class="logo-text">{{ config()?.storeName }}</span>
<span *ngIf="cartItemCount() > 0" class="cart-badge">
  {{ cartItemCount() }}
</span>
```

## 🔄 Patrón: Signals + Observables

En este proyecto combinamos Signals con Observables para mejor rendimiento:

```typescript
export class Service {
  // 1. Signal para el estado
  private dataSignal = signal<Data | null>(null);

  // 2. Computed signals para valores derivados
  public data = computed(() => this.dataSignal());
  public isReady = computed(() => this.dataSignal() !== null);

  // 3. Observables para operaciones async (HTTP)
  loadData(): Observable<Data> {
    return this.http.get<Data>('/api/data').pipe(
      // 4. Actualizar signal cuando llega la data
      tap(data => this.dataSignal.set(data))
    );
  }
}
```

## ⚡ Mejores Prácticas

### ✅ DO (Hacer)

1. **Usar signals para estado local**
```typescript
count = signal(0);
increment() {
  this.count.update(n => n + 1);
}
```

2. **Usar computed para valores derivados**
```typescript
doubleCount = computed(() => this.count() * 2);
```

3. **Combinar signals en templates**
```html
<div>{{ count() }} x 2 = {{ doubleCount() }}</div>
```

4. **Usar effect() para side effects**
```typescript
constructor() {
  effect(() => {
    console.log('Count changed:', this.count());
  });
}
```

### ❌ DON'T (No hacer)

1. **No mutar signals directamente**
```typescript
// ❌ Mal
this.count = this.count + 1;

// ✅ Bien
this.count.set(this.count() + 1);
// o mejor
this.count.update(n => n + 1);
```

2. **No crear signals en templates**
```html
<!-- ❌ Mal -->
<div>{{ signal(value) }}</div>

<!-- ✅ Bien - crear en la clase -->
<div>{{ mySignal() }}</div>
```

3. **No olvidar los paréntesis al leer signals**
```typescript
// ❌ Mal - devuelve el Signal, no el valor
const value = this.count;

// ✅ Bien - devuelve el valor
const value = this.count();
```

## 🎯 Migrando de Observables a Signals

### Antes (Observable)
```typescript
export class Component {
  private dataSubject = new BehaviorSubject<Data | null>(null);
  public data$ = this.dataSubject.asObservable();

  ngOnInit() {
    this.data$.subscribe(data => {
      // hacer algo
    });
  }

  updateData(data: Data) {
    this.dataSubject.next(data);
  }
}
```

### Después (Signal)
```typescript
export class Component {
  private dataSignal = signal<Data | null>(null);
  public data = computed(() => this.dataSignal());

  // No necesitas ngOnInit para suscripciones

  updateData(data: Data) {
    this.dataSignal.set(data);
  }
}
```

## 📚 Recursos

- [Angular Signals Documentation](https://angular.dev/guide/signals)
- [Angular 20 Release Notes](https://github.com/angular/angular/releases)
- [Signals vs Observables](https://angular.dev/guide/signals/rxjs-interop)

## 🚀 Próximos Pasos

1. **Experimenta con signals** en tus propios componentes
2. **Migra servicios existentes** de BehaviorSubject a signals
3. **Usa computed** para valores derivados
4. **Aprovecha effect()** para side effects

---

**Última actualización**: 2025-01-17 | Angular 20 | Node 20.19.5
