import { Seller } from './../../models/seller/seller';
import { ErrorHandlerService } from './../error-handler/error-handler.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private apiUrl = environment.apiUrl + `/vendedor`;

  constructor(private httpClient: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  getAll(): Observable<Seller[]>{
    return this.httpClient.get<Seller[]>(this.apiUrl + `/get`)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }

  getById(id): Observable<Seller> {
    return this.httpClient.get<Seller>(this.apiUrl + '/getbyid?id=' + id)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }
}