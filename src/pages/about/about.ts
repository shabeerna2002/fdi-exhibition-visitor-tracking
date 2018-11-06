import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ExhibitionProvider } from '../../providers/exhibition/exhibition';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  stands :any[];
  ExhibitionStandServiceSubcription:Subscription;
  constructor(private ExhibitionStandService:ExhibitionProvider,public navCtrl: NavController) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ExhibitionStandServiceSubcription=this.ExhibitionStandService.GetStandDetails().subscribe(
      (response)=>{
       this.stands =response["ExhibitionStands"]["Stands"];
       console.log(this.stands);
      }
    )

    if (localStorage.getItem("fdi-devicekey") == null || localStorage.getItem("fdi-devicekey") == undefined ){
      localStorage.setItem("fdi-devicekey",this.makeid()) 
    }

    console.log(localStorage.getItem("fdi-devicekey"));
  
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ExhibitionStandServiceSubcription.unsubscribe();
    this.stands=[];
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 12; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text + Date.now().toString();
  }
  
}
