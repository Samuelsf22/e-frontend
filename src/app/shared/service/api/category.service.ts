import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Category } from '@shared/model/product.model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  getCategories = (): Observable<Category[]> => {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/category`);
  };

  getCategoryByPublicId = (publicId: string): Observable<Category> => {
    return this.httpClient.get<Category>(`${environment.apiUrl}/category`, {
      params: { public_id: publicId },
    });
  };

  create(name: string): Observable<Category> {
    return this.httpClient.post<Category>(
      `${environment.apiUrl}/category`,
      { name: name },
      this.authService.getAuthHeaders()
    );
  }

  delete(public_id: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/category`,
      {
        params: { public_id: public_id },
        ...this.authService.getAuthHeaders()
      }
    );
  }
}
