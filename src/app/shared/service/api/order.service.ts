import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { OrderRequest } from '@shared/model/order.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  createOrder = (orderRequest: OrderRequest) => {
    return this.httpClient.post(
      `${environment.apiUrl}/order`, 
      orderRequest, 
      this.authService.getAuthHeaders()
    );
  };

  getAllOrders = (username: string) => {
    return this.httpClient.get(
      `${environment.apiUrl}/order`,
      {
        ...this.authService.getAuthHeaders(),
        params: { username }
      }
    );
  };

  getOrderDetails = (orderPublicId: string) => {
    return this.httpClient.get(
      `${environment.apiUrl}/order`,
      {
        ...this.authService.getAuthHeaders(),
        params: { public_id: orderPublicId }
      }
    );
  };

  getOrderByUser = (userPublicId: string) => {
    return this.httpClient.get(
      `${environment.apiUrl}/order`,
      {
        ...this.authService.getAuthHeaders(),
        params: { user_public_id: userPublicId }
      }
    );
  };
}
