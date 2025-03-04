import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '@environments/environment';
import { CartItemAdd, Product } from '@shared/model/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpClient = inject(HttpClient);

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
    return this.httpClient.get<Product[]>(
      `${environment.apiUrl}/product/featured`
    );
  };

  getRelatedProducts = (publicId: string): Observable<Product[]> => {
    return this.httpClient.get<Product[]>(
      `${environment.apiUrl}/product/related`,
      { params: { public_id: publicId } }
    );
  };

  private platformId = inject(PLATFORM_ID);
  private keyCartStorage = 'cart';
  private addedToCart$ = new BehaviorSubject<Array<CartItemAdd>>([]);
  addedToCart = this.addedToCart$.asObservable();

  private getCartFromLocalStorage(): Array<CartItemAdd> {
    if (isPlatformBrowser(this.platformId)) {
      const cartProducts = localStorage.getItem(this.keyCartStorage);
      if (cartProducts) {
        return JSON.parse(cartProducts) as CartItemAdd[];
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  addToCart(publicId: string, command: 'add' | 'remove'): void {
    if (isPlatformBrowser(this.platformId)) {
      const itemToAdd: CartItemAdd = { publicId, quantity: 1 };
      const cartFromLocalStorage = this.getCartFromLocalStorage();
      if (cartFromLocalStorage.length !== 0) {
        const productExist = cartFromLocalStorage.find(
          (item) => item.publicId === publicId
        );
        if (productExist) {
          if (command === 'add') {
            productExist.quantity++;
          } else if (command === 'remove') {
            productExist.quantity--;
          }
        } else {
          cartFromLocalStorage.push(itemToAdd);
        }
      } else {
        cartFromLocalStorage.push(itemToAdd);
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
        (item) => item.publicId === publicId
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
}
