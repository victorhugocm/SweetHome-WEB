import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl = "https://localhost:44380/api/cor";

  constructor(private httpClient: HttpClient) { }
}
