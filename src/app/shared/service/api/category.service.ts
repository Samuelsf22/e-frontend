import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Category } from '@shared/model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  httpClient = inject(HttpClient);

  getCategories = (): Observable<Category[]> => {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/category`);
  };

  getCategoryByPublicId = (publicId: string): Observable<Category> => {
    return this.httpClient.get<Category>(`${environment.apiUrl}/category`, {
      params: { public_id: publicId },
    });
  };
  
}
