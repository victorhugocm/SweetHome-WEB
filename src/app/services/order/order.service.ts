import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = "https://localhost:44380/api/venda"

  constructor(private httpClient: HttpClient) { }
}
