import { Component } from '@angular/core';
import{BarcodeScanner,BarcodeScannerOptions} from '@ionic-native/barcode-scanner'
import { NavController, Platform, AlertController  } from 'ionic-angular';
import { platformBrowser } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ExhibitionProvider } from '../../providers/exhibition/exhibition';
import { Subscription } from 'rxjs';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 optons:BarcodeScannerOptions;
 encodeText:string="";
 encodedData:any={};
 ScannedData:any={};
 DeviceID:string;
 platform:Platform;
 barcodeScannerIsOpen:boolean;
 SelectedStand: string ="No stand selected";
 isStandIDExist:boolean=false;

 ExhibitionCurrentStandSubscription:Subscription;
 ExhibitionVisitorEntrySubscription:Subscription;

  constructor(public navCtrl: NavController, public scanner:BarcodeScanner,
    platform: Platform, private ExhibitionStandService:ExhibitionProvider, private alertCtrl: AlertController
  ) {
    
    platform.ready().then(() => {
      document.addEventListener('backbutton', () => {
      if (this.barcodeScannerIsOpen)
        this.barcodeScannerIsOpen=false
      else
        this.platform.exitApp()
      })
      })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.ExhibitionCurrentStandSubscription !=undefined || this.ExhibitionCurrentStandSubscription !=null){
      this.ExhibitionCurrentStandSubscription.unsubscribe();
    }
    if (this.ExhibitionVisitorEntrySubscription !=undefined || this.ExhibitionVisitorEntrySubscription !=null){
      this.ExhibitionVisitorEntrySubscription.unsubscribe();
    }
  }

 ngOnInit(): void {
   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   //Add 'implements OnInit' to the class.  
  

   this.ExhibitionStandService.CreateRegistartion().subscribe(
    (response)=>{
     console.log(response);
    }
   )
   

  if ( window.localStorage.getItem("DeviceID") ==null || window.localStorage.getItem("DeviceID") ==undefined){
      window.localStorage.setItem("DeviceID",this.makeid());
  }
 
  
  if ( window.localStorage.getItem("fdi-standid") ==null || window.localStorage.getItem("fdi-standid") ==undefined){
     this.SettingsAlert();
     this.navCtrl.parent.select(1);
   
   
   
    }  else{
    this.SelectedStand=window.localStorage.getItem("fdi-standid")
   this.ExhibitionCurrentStandSubscription= this.ExhibitionStandService.GetExhibitionStandNameFromStandID(this.SelectedStand).subscribe(
      (response)=>{
        this.ExhibitionStandService.UpdateStand(response);
      }
     )
    }

    try {
      this.GetSelectedStandID();
    } catch (error) {
      
    }
 }

 SettingsAlert() {
  let alert = this.alertCtrl.create({
    title: 'Welcome to Sharjah FDI 2018 Visitor Tracker',
    subTitle: 'Please select the stand and Save.',
    buttons: ['Ok']
  });
  alert.present();
}

  scan(){


    try {
      this.scanner.scan(this.optons).then(
        (data)=>{
          this.barcodeScannerIsOpen=true;
          if(data.cancelled== true){
           // alert('cancelled');
          } 
          else{
            this.ScannedData=data;
            // alert("Thank You");
            let standID=window.localStorage.getItem("fdi-standid")
            let DeviceID=window.localStorage.getItem("DeviceID")
            this.AddVisitorEntry(standID,this.ScannedData.text, DeviceID);
          
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

  AddVisitorEntry(StandID:string, QRCode:string, DeviceKey:string){
 
   this.ExhibitionVisitorEntrySubscription= this.ExhibitionStandService.AddVisitorEntry(StandID, QRCode,DeviceKey).subscribe(
      (response)=>{
        
    
          

      }
     ),
     (error)=>{
   
     
     }

     let alert = this.alertCtrl.create({
      title: 'Sharjah FDI 2018',
      subTitle: "Thank you",
      buttons: ['Ok']
    });
    alert.present();

    
  }

  

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 12; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }


  GetSelectedStandID(){
    this.ExhibitionStandService.castSelectedStand.subscribe(StandID=>
      {
        this.SelectedStand=StandID;
        if (this.SelectedStand !=undefined) {
          this.isStandIDExist=true;
        } else{
          this.isStandIDExist=false;
          
          
        }
     
      
      });
  }

  

}
