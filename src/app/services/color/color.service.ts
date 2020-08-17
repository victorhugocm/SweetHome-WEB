import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './../error-handler/error-handler.service';
import { Color } from './../../models/color/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl = environment.apiUrl + `/cor`;
  
  constructor(private httpClient: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  getAll(): Observable<Color[]>{
    return this.httpClient.get<Color[]>(this.apiUrl + `/get`)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }

  getById(id): Observable<Color> {
    return this.httpClient.get<Color>(this.apiUrl + '/getbyid?id=' + id)
    .pipe(
      catchError(this.errorHandlerService.errorHandler)
    )
  }
}