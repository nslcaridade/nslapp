import { NgModule, Component, Injectable } from "@angular/core";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { SERVER_URL } from "../../../environments/environment";
import { LoadingController, AlertController } from '@ionic/angular';
//import { User } from '../database/localuser.service'

const httpOptions = {
  headers: new HttpHeaders(

    {'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET,POST,OPTIONS,DELETE,PUT',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'})
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, public alertController: AlertController) { }

  addUser(email, fullName, platform, uuid, pushToken): Observable<any> {
    const url = `${SERVER_URL}/User/`;

    let body = {
      email: email,
      nome: fullName,
      platform: platform,
      uuid: uuid,
      pushReceiverId: pushToken
    };
    console.log(JSON.stringify(body));

    return this.http.post(url, JSON.stringify(body), httpOptions)
      .pipe(
        tap(_ => console.log(`Novo usuario registrado`)),
        catchError(this.handleError<any>('addUser'))
      );
  }
  
  findUser(email): Observable<any>{
    //this.showAlertServ('DEBUG','find user. http://nslcaridade.com.br/nsl-0.0.1-SNAPSHOT/User/Localiza/'+email);
    const url = `${SERVER_URL}/User/Localiza/${email}`

    return this.http.get(url)
      .pipe(
        tap(_=> console.log(`Usuario Localizado`)),
        catchError(this.handleError<any>('findUser'))
      );
  }

  showAlertServ(header, message) {
    const alert: any = this.alertController.create({
    header: header,
    message: message,
    buttons: ['OK']
});
alert.then((_alert: any)=> {
  _alert.present();
})
}

  /*setUser(user): Observable<any> {
    const url = `${SERVER_URL}/User/`;

    let body = {
      cpf: user.documentId,
      ddd: user.ddd,
      telefone: user.phone,
      email: user.email,
      password: user.password,
      platform: user.platform,
      uuid: user.uuid,
      pushReceiverId: user.pushToken
    };
    console.log(JSON.stringify(body));

    return this.http.post(url, JSON.stringify(body), httpOptions)
      .pipe(
        tap(_ => console.log(`Novo usuario cadastrado`)),
        catchError(this.handleError<any>('addUser'))
      );
  }*/

  updateUser(idCadastro, telefone, dataNascimento, diaAcolhida, semanaEscala ): Observable<any> {
    const url = `${SERVER_URL}/User/Atualiza`;

    let body = {
      idUsuario: idCadastro,
      telefone: telefone,
      dataNacimento: dataNascimento,
      diaAcolhida: diaAcolhida,
      semanaEscala: semanaEscala
    };
    console.log(JSON.stringify(body));
    console.log(url);

    return this.http.put(url, JSON.stringify(body), httpOptions)
      .pipe(
        tap(_ => console.log(`Atualizado usuario com sucesso`)),
        catchError(this.handleError<any>('updateUser'))
      );
  }


  updateUserPhone(externalUserId, phase, ddd, phone): Observable<any> {
    const url = `${SERVER_URL}/Cadastro/`;

    let body = {
      idUsuario: externalUserId,
      etapa: phase,
      ddd: ddd,
      telefone: phone
    };
    //console.log('body: ', body);
    return this.http.put(url, JSON.stringify(body), httpOptions)
    .pipe(
      tap(_ => console.log(`Atualizado numero de telefone do usuario=${externalUserId}`)),
      catchError(this.handleError<any>('updateUserPhone'))
    );
  }

  updateUserDocument(externalUserId, stage, documentId, motherName, birthDate): Observable<any> {
    const url = `${SERVER_URL}/User/`;

    let body = {
      idUsuario: externalUserId,
      etapa: stage,
      cpf: documentId,
      nomeMae: motherName,
      dataNascimento: birthDate
    };

    return this.http.put(url, JSON.stringify(body), httpOptions)
    .pipe(
      tap(_ => console.log(`Atualizado dados básicos do usuario=${externalUserId}`)),
      catchError(this.handleError<any>('updateUserDocument'))
    );
  }

  updateUserInstitution(externalUserId, institutions): Observable<any> {
    const url = `${SERVER_URL}/User/`;

    let body = {
      idUsuario: externalUserId,
      institutions: institutions
    };

    return this.http.put(url, JSON.stringify(body), httpOptions)
    .pipe(
      tap(_ => console.log(`Atualizado numero de telefone do usuario=${externalUserId}`)),
      catchError(this.handleError<any>('updateUserPhone'))
    );
  }

  deleteUser(externalUserId): Observable<any> {
    console.log("No deleteUser :"+externalUserId);
    const url = `${SERVER_URL}/User/Delete/${externalUserId}`;

    return this.http.delete(url, httpOptions)
      .pipe(
        tap(_ => console.log(`Usuario=${externalUserId} deletado`)),
        catchError(this.handleError<any>('deleteUser'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.showAlertServ('DEBUG','error'+JSON.stringify(error));
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
