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
 StandID:string;
 DeviceID:string;

  constructor(public navCtrl: NavController, public scanner:BarcodeScanner) {
     
  }

 ngOnInit(): void {
   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   //Add 'implements OnInit' to the class.

 
   

  if ( window.localStorage.getItem("DeviceID") ==null || window.localStorage.getItem("DeviceID") ==undefined){
      window.localStorage.setItem("DeviceID",this.makeid());
  }
 

 }

  scan(){


    try {
      this.scanner.scan(this.optons).then(
        (data)=>{
        
      if(data.cancelled== true){
        alert('cancelled');
      } 
      else{
        this.ScannedData=data;
        // alert("Thank You");
        alert(window.localStorage.getItem("DeviceID"));
      }
       
        },
        (err)=>{
          console.log(err);
        }
      )
  }
  catch(err) {
      document.getElementById("demo").innerHTML = err.message;
  }


  

  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 12; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  

}
