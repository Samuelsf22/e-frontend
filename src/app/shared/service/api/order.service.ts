import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Order, OrderRequest } from '@shared/model/order.model';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

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

  getAllOrders = () => {
    return this.httpClient.get(`${environment.apiUrl}/order`, {
      ...this.authService.getAuthHeaders(),
    });
  };

  getOrderDetails = (orderPublicId: string) => {
    return this.httpClient.get(`${environment.apiUrl}/order`, {
      ...this.authService.getAuthHeaders(),
      params: { order_public_id: orderPublicId },
    });
  };

  getOrderByUser = (username: string) : Observable<Order[]> => {
    return this.httpClient.get<Order[]>(`${environment.apiUrl}/order/user`, {
      ...this.authService.getAuthHeaders(),
      params: { username },
    });
  };

  markOrderAsPaid = (orderPublicId: string) => {
    return this.httpClient.put(
      `${environment.apiUrl}/order/payment`,
      { order_public_id: orderPublicId },
      this.authService.getAuthHeaders()
    );
  };
}
