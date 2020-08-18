import { ProductOrder } from './../../models/product-order/product-order';
import { ErrorHandlerService } from './../error-handler/error-handler.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderService {
  private apiUrl = environment.apiUrl + `/vendaproduto`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  getAll(): Observable<ProductOrder[]>{
    return this.httpClient.get<ProductOrder[]>(this.apiUrl + `/get`)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }

  getById(id): Observable<ProductOrder> {
    return this.httpClient.get<ProductOrder>(this.apiUrl + '/getbyid?id=' + id)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }

  create(productOrder): Observable<ProductOrder> {
    return this.httpClient.post<ProductOrder>(this.apiUrl + '/post', JSON.stringify(productOrder), this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }
}