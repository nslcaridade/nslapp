import { NgModule, Component, Injectable } from "@angular/core";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { SERVER_URL } from "../../../environments/environment";
import { Util } from '../../commons/util';
import { RelativeInjectorLocationFlags } from '@angular/core/src/render3/interfaces/injector';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { utils } from 'protractor';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  trustedVideoUrl: any;

  constructor(
    private http: HttpClient,
    private util: Util) { }

  getAllVideos(): Observable<any> {
    const url = `${SERVER_URL}/ListVideos/Todos`;
    this.trustedVideoUrl = this.http.get(url)
    .pipe(
      tap(_ => console.log(`Recebido Lista de videos`)),
      catchError(this.handleError<any>(`getAllVideos`))
    );
    return this.trustedVideoUrl;
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
