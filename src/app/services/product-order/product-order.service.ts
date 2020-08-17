import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderService {
  private apiUrl = environment.apiUrl + `/vendaproduto`;

  constructor(private httpClient: HttpClient) { }
}