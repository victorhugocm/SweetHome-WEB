import { Product } from './../../models/product/product';
import { ErrorHandlerService } from './../error-handler/error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl + `/produto`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  getAll(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.apiUrl + `/get`)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }

  getById(id): Observable<Product> {
    return this.httpClient.get<Product>(this.apiUrl + '/getbyid?id=' + id)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }

  update(product): Observable<Product> {
    return this.httpClient.put<Product>(this.apiUrl + '/put', JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }

  create(product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl + '/post', JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.delete<Product>(this.apiUrl + '/delete?id=' + id)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }
}