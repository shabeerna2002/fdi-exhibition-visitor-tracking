import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/*
  Generated class for the ExhibitionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExhibitionProvider {


  ApiEndPoint:string ="http://api.standvisit.sharjahfdiforum.ae/api"
  StandID:string;

  constructor(public http: HttpClient) {
    console.log('Hello ExhibitionProvider Provider');
  }


   public GetStandDetails(){
    return this.http.get<string>(this.ApiEndPoint + "/values/stands/AB657GF1510HGK/1",{responseType:"json"});
  }

  public AddVisitorEntry(StandID:string, QRCode:string, DeviceKey:string){
   // return "Mr. ABDUL SHABBEER visited your stand"
    //return this.http.get<string>(this.ApiEndPoint + "/values/standvisitor/AB657GF1510HGK/1/" + QRCode + "/" + StandID + "/" + DeviceKey,{responseType:"json"});
    return this.http.get<string>(this.ApiEndPoint + "/values/standvisitor/AB657GF1510HGK/1/"+ QRCode + "/"+ StandID + "/" + DeviceKey,{responseType:"json"});
  }


  



  public GetExhibitionStandNameFromStandID(StandID:string){
    return this.http.get<string>(this.ApiEndPoint + "/values/stand/standname/AB657GF1510HGK/"+StandID,{responseType:"json"});
  }

  private SelectedStand = new BehaviorSubject<string>(this.StandID);
  castSelectedStand = this.SelectedStand.asObservable();

  UpdateStand(StandID:string){
   
    this.SelectedStand.next(StandID);
    //("***changed");
  }



}
