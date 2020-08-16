import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderService {
  private apiUrl = "https://localhost:44380/api/vendaproduto"

  constructor(private httpClient: HttpClient) { }
}
