import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

/*
  Generated class for the ExhibitionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExhibitionProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ExhibitionProvider Provider');
  }


   public GetStandDetails(){
    return this.http.get<any>("http://localhost:61214/api/values/stands/AB657GF1510HGK/1",{responseType:"json"});
  }

}
