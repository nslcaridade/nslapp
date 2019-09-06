import { NgModule, Component, Injectable } from "@angular/core";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { SERVER_URL } from "../../../environments/environment";


const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'})
};

@Injectable({
  providedIn: 'root'
})
export class DoacaoService {

  constructor(private http: HttpClient) { }

  getDoacoesPorPeriodo(codInstituicao, startDate, endDate): Observable<any> {
    const url = `${SERVER_URL}/doacao/Periodo/`;

    let body = {
      codInstituicao: codInstituicao,
      startDate: startDate,
      endDate: endDate
    };
    console.log("*****BEGIN BODY***");
    console.log(body);
    console.log(body.codInstituicao);
    console.log("END BODY");

    return this.http.post(url, JSON.stringify(body), httpOptions)
      .pipe(
        tap(_ => console.log(`Doacoes encontradas`)),
        catchError(this.handleError<any>('getDoacoesPorPeriodo'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
