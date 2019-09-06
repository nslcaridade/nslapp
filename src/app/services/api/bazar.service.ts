import { NgModule, Component, Injectable } from "@angular/core";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { SERVER_URL } from "../../../environments/environment";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BazarService {
  constructor(private http: HttpClient) { }

  getAllBazares(): Observable<any> {
    const url = `${SERVER_URL}/Bazar/Todos`;
    return this.http.get(url)
      .pipe(
        tap(_ => console.log(`Recebido Lista de Bazares`)),
        catchError(this.handleError<any>(`getAllBazares`))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
