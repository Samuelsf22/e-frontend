import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '@environments/environment';
import { CartItem, CreateProduct, Product } from '@shared/model/product.model';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { MOCK_PRODUCTS } from '../mock-product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  getProducts = (): Observable<Product[]> => {
    return this.httpClient.get<Product[]>(`${environment.apiUrl}/product`);
  };

  getProductByPublicId = (publicId: string): Observable<Product> => {
    return this.httpClient.get<Product>(`${environment.apiUrl}/product`, {
      params: { public_id: publicId },
    });
  };

  getProductsByCategory = (categoryPublicId: string): Observable<Product[]> => {
    return this.httpClient.get<Product[]>(
      `${environment.apiUrl}/product/category`,
      { params: { category_public_id: categoryPublicId } }
    );
  };

  getFeaturedProducts = (): Observable<Product[]> => {
    return this.httpClient
      .get<Product[]>(`${environment.apiUrl}/product/featured`)
      // this is only for the purpose of the demo, in a real application you should remove this line
      .pipe(catchError(() => of(MOCK_PRODUCTS)));
  };

  getRelatedProducts = (publicId: string): Observable<Product[]> => {
    return this.httpClient.get<Product[]>(
      `${environment.apiUrl}/product/related`,
      { params: { public_id: publicId } }
    );
  };

  createProduct = (
    product: CreateProduct,
    image: File
  ): Observable<Product> => {
    const formData = new FormData();

    formData.append('image', image);
    formData.append('product', JSON.stringify(product));

    return this.httpClient.post<Product>(
      `${environment.apiUrl}/product`,
      formData,

      this.authService.getAuthHeaders()
    );
  };

  deleteProduct = (publicId: string): Observable<void> => {
    return this.httpClient.delete<void>(`${environment.apiUrl}/product`, {
      params: { public_id: publicId },
      ...this.authService.getAuthHeaders(),
    });
  };

  private platformId = inject(PLATFORM_ID);
  private keyCartStorage = 'cart';
  private addedToCart$ = new BehaviorSubject<Array<CartItem>>([]);
  addedToCart = this.addedToCart$.asObservable();

  getCartFromLocalStorage(): Array<CartItem> {
    if (isPlatformBrowser(this.platformId)) {
      const cartProducts = localStorage.getItem(this.keyCartStorage);
      if (cartProducts) {
        return JSON.parse(cartProducts) as CartItem[];
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  getCartDetails(): Observable<CartItem[]> {
    return new Observable((observer) => {
      observer.next(this.getCartFromLocalStorage());
      observer.complete();
    });
  }

  addToCart(cart: CartItem, command: 'add' | 'remove'): void {
    if (isPlatformBrowser(this.platformId)) {
      const itemToAdded = { ...cart, quantity: 1 };

      const cartFromLocalStorage = this.getCartFromLocalStorage();
      if (cartFromLocalStorage.length !== 0) {
        const productExist = cartFromLocalStorage.find(
          (item) => item.public_id === cart.public_id
        );
        if (productExist) {
          if (command === 'add') {
            productExist.quantity!++;
          } else if (command === 'remove') {
            productExist.quantity!--;
            if (productExist.quantity! <= 0) {
              this.removeFromCart(cart.public_id);
              return;
            }
          }
        } else {
          cartFromLocalStorage.push(itemToAdded);
        }
      } else {
        cartFromLocalStorage.push(itemToAdded);
      }
      localStorage.setItem(
        this.keyCartStorage,
        JSON.stringify(cartFromLocalStorage)
      );
      this.addedToCart$.next(cartFromLocalStorage);
    }
  }

  removeFromCart(publicId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const cartFromLocalStorage = this.getCartFromLocalStorage();
      const productExist = cartFromLocalStorage.find(
        (item) => item.public_id === publicId
      );
      if (productExist) {
        cartFromLocalStorage.splice(
          cartFromLocalStorage.indexOf(productExist),
          1
        );
        localStorage.setItem(
          this.keyCartStorage,
          JSON.stringify(cartFromLocalStorage)
        );
        this.addedToCart$.next(cartFromLocalStorage);
      }
    }
  }

  clearCart() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.keyCartStorage);
      this.addedToCart$.next([]);
    }
  }
}
