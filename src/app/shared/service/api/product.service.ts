import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Product } from '@shared/model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpClient = inject(HttpClient);

  getProducts = (): Observable<Product[]> => {
    return this.httpClient.get<Product[]>(`${environment.apiUrl}/product`);
  };

  getProductByPublicId = (publicId: string): Observable<Product> => {
    return this.httpClient.get<Product>(
      `${environment.apiUrl}/product`, {
      params: { public_id: publicId },
    });
  };

  getProductsByCategory = (categoryPublicId: string): Observable<Product[]> => {
    return this.httpClient.get<Product[]>(
      `${environment.apiUrl}/product/category`,
      { params: { category_id: categoryPublicId } }
    );
  };

  getFeaturedProducts = (): Observable<Product[]> => {
    return this.httpClient.get<Product[]>(
      `${environment.apiUrl}/product/featured`
    );
  };
}
