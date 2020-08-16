import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private apiUrl = "https://localhost:44380/api/vendedor"

  constructor(private httpClient: HttpClient) { }
}
