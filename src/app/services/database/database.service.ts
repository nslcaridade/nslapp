import { Injectable } from '@angular/core';
//import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { Storage } from '@ionic/storage';

/*
const keyTables {
  user, steps, provider, content, log
}
*/

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor( private storage: Storage) { }

  public setKeyValue(key, value){
    this.storage.set(key, value)
    .then(
      data => {
        console.log(data);
        return data;
    },
      error => console.log(error)
    );

  }

  getValue(key): Promise<any> {
    return this.storage.get(key)
      .then(
        data => {
          console.log(data);
          return data;
      });
  }

  public removeKey(key) {
    this.storage.remove(key)
      .then(
        data => {
          console.log(data);
      },
        error => console.log(error)
    );
  }

  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  /*private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS max_user(id INTEGER PRIMARY KEY AUTOINCREMENT, externalUserId INTEGER, cpf TEXT, name TEXT, email TEXT, ddd INTEGER, phone TEXT, birthDate TEXT, motherName TEXT, bank TEXT, uuid TEXT, status TEXT)'],
      ['CREATE TABLE IF NOT EXISTS access_adm (id integer primary key AUTOINCREMENT NOT NULL, product TEXT, login TEXT, password TEXT, maxuser_id integer, FOREIGN KEY(maxuser_id) REFERENCES max_user(id))']
      /* TODO: Tabela para guardar dados de negativacao - Dados ainda nao definidos
       ['CREATE TABLE IF NOT EXISTS bureau (id integer primary key AUTOINCREMENT NOT NULL, pefin TEXT, refin TEXT, negativacao TEXT, accessadm_id integer, FOREIGN KEY(accessadm_id) REFERENCES access_adm(id))'],
       TODO: Tabela para guardar SCR/CCS - Dados ainda nao definidos
       ['CREATE TABLE IF NOT EXISTS bacen (id integer primary key AUTOINCREMENT NOT NULL, scr TEXT, ccs TEXT, maxuser_id integer, FOREIGN KEY(maxuser_id) REFERENCES max_user(id))'],
       TODO: Tabela para guardar SCORE gerado pelo Kikuti - Dados ainda nao definidos
       ['CREATE TABLE IF NOT EXISTS score (id integer primary key AUTOINCREMENT NOT NULL, score TEXT, scr TEXT, negativacao TEXT, shared TEXT, maxuser_id integer, FOREIGN KEY(maxuser_id) REFERENCES max_user(id))']
       TODO: Tabela que contempla as configuracoes
       ['CREATE TABLE IF NOT EXISTS setting (id integer primary key AUTOINCREMENT NOT NULL, expire TEXT, backup TEXT, forgetme TEXT, othersetting TEXT, maxuser_id integer, FOREIGN KEY(maxuser_id) REFERENCES max_user(id))'],
      */
    /*])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }*/


}
