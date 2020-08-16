import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = "https://localhost:44380/api/produto"

  constructor(private httpClient: HttpClient) { }
}
