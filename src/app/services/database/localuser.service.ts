import { Injectable } from '@angular/core';
// import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class LocaluserService {

  constructor(private secureStorage: DatabaseService) { }

  // Não expor a chave, apenas o proprio serviço conhece

  // Serve apenas para as Etapas de Registro do Usuario
  public insertOrUpdateUser(user: User) {

    let restore = new User();

    if ( user.externalUserId.toString() === "" ) {
      console.log('insert');
      // UUID, externalUserId, name, email
    } else {
      console.log('update');
      //
      restore = this.getUser();

      if ( restore.getDDD().toString() === "" ) {
        restore.setDDD(user.getDDD());
        restore.setPhone(user.getPhone());
      }

      if ( restore.getDocument() === "" ) {
        restore.setDocument(user.getDocument());
        restore.setBirthDate(user.getBirthDate());
      }

      // Override
      user = restore;
    }

    return this.secureStorage.setKeyValue("user", this.packJSON(user));
  }

  public updateUUID(externalUserId, uuid) {
    console.log('substituindo o UUID');
    let restore = new User();
    restore = this.getUser();

    if ( restore.externalUserId === externalUserId && restore.uuid !== "" ) {
      console.log('Novo UUID:', uuid);
      restore.uuid = uuid;
    } else {
      console.log('Substituição não pode ser concluida');
    }

    return this.secureStorage.setKeyValue("user", this.packJSON(restore));
  }

  /* Usar apenas depois do Cadastro efetuado, se ele alterou email ou telefone
  Chamar o getUser() e montar um Buffer para alterar apenas o que ele precisa.*/
  public updateUser(user: User){
    return this.secureStorage.setKeyValue("user", this.packJSON(user));
  }

  // returns @params: User (obj)
  public getUser() {
    return this.unpackJSON(this.secureStorage.getValue("user"));
  }

  public removeUser() {
    return this.secureStorage.removeKey("user");
  }

  // returns @params: data (obj->JSON)
  private packJSON(user: User) {
      let data = JSON.stringify({
        externalUserId: user.externalUserId,
        document: user.getDocument(),
        name: user.getName(),
        email: user.getEmail(),
        ddd: user.getDDD(),
        phone: user.getPhone(),
        birthDate: user.getBirthDate(),
        uuid: user.uuid
      });

      return data;
  }

  // returns @params: User (obj)
  private unpackJSON(data) {
    let user = new User();

    let { externalUserId, cpf,
      name, email, ddd, phone,
      birthDate, motherName,
      bank, uuid
    } = JSON.parse(data);
          user.externalUserId = externalUserId;
          user.setDocument(cpf);
          user.setName(name);
          user.setEmail(email);
          user.setDDD(ddd);
          user.setPhone(phone);
          user.setBirthDate(birthDate);
          user.uuid = uuid;

    return user;
  }
}

/* TODO: Pensar se o Endereço vai aqui ou cria uma Novo
  Address: CountryCode, State, City, Neighbourdhood, Street, Number, PostalCode
 */
export class User {
  public  externalUserId: number;
  private document: string;
  private name: string;
  private email: string;
  private ddd: number;
  private phone: string;
  private birthDate: string;
  public uuid: string;
  public platform: string;
  public pushToken: string;

  public getName(){
    return this.name;
  }

  public setName(name){
    this.name = name;
  }

  public getEmail(){
    return this.email;
  }

  public setEmail(email){
    this.email = email;
  }

  public getDDD() {
    return this.ddd;
  }

  public setDDD(ddd) {
    this.ddd = ddd;
  }

  public getPhone() {
    return this.phone;
  }

  public setPhone(phone) {
    this.phone = phone;
  }

  public getDocument() {
    return this.document;
  }

  public setDocument(cpf) {
    this.document = cpf;
  }

  public getBirthDate() {
    return this.birthDate;
  }

  public setBirthDate(birthDate) {
    this.birthDate = birthDate;
  }

}
