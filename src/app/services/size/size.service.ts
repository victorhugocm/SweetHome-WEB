import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private apiUrl = "https://localhost:44380/api/tamanho"

  constructor(private httpClient: HttpClient) { }
}
