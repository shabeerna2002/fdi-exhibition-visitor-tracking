import { Component } from '@angular/core';
import{BarcodeScanner,BarcodeScannerOptions} from '@ionic-native/barcode-scanner'
import { NavController, Platform } from 'ionic-angular';
import { platformBrowser } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 optons:BarcodeScannerOptions;
 encodeText:string="";
 encodedData:any={};
 ScannedData:any={};

  constructor(public navCtrl: NavController, public scanner:BarcodeScanner) {
     
  }

 ngOnInit(): void {
   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   //Add 'implements OnInit' to the class.

 
   localStorage.setItem("StandID","1");
   let StandID= localStorage.getItem("StandID");
  // alert(StandID);

 }

  scan(){
   this.optons={
     prompt:'Scan Barcode'
   }
    this.scanner.scan(this.optons).then(
      (data)=>{
      this.ScannedData=data;

      },
      (err)=>{
        console.log(err);
      }
    )

  }

}
