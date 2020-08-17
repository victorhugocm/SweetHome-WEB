import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private apiUrl = environment.apiUrl + `/tamanho`;

  constructor(private httpClient: HttpClient) { }
}