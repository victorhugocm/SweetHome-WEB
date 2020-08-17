import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private apiUrl = environment.apiUrl + `/vendedor`;

  constructor(private httpClient: HttpClient) { }
}