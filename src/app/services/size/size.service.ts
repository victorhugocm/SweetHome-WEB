import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
import { ErrorHandlerService } from './../error-handler/error-handler.service';
import { Observable } from 'rxjs';
import { Size } from './../../models/size/size';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private apiUrl = environment.apiUrl + `/tamanho`;

  constructor(private httpClient: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  getAll(): Observable<Size[]>{
    return this.httpClient.get<Size[]>(this.apiUrl + `/get`)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }

  getById(id): Observable<Size> {
    return this.httpClient.get<Size>(this.apiUrl + '/getbyid?id=' + id)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }
}