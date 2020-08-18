import { Order } from './../../models/order/order';
import { ErrorHandlerService } from './../error-handler/error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl + `/venda`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  getAll(): Observable<Order[]>{
    return this.httpClient.get<Order[]>(this.apiUrl + `/get`)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }

  getById(id): Observable<Order> {
    return this.httpClient.get<Order>(this.apiUrl + '/getbyid?id=' + id)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }

  create(order): Observable<Order> {
    return this.httpClient.post<Order>(this.apiUrl + '/post', JSON.stringify(order), this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }
}