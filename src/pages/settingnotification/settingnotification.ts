import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,Events } from 'ionic-angular';
import { Alert } from '../../providers/alert'
/*
  Generated class for the Settingnotification page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settingnotification',
  templateUrl: 'settingnotification.html'
})
export class SettingnotificationPage {
  alertdata: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public events: Events,public alert:Alert) { 


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingnotificationPage');
  }

  confirm() {
     this.events.publish("alret",this.alertdata) 
    this.viewCtrl.dismiss();
}
  cancel() {
    this.viewCtrl.dismiss();
  }
}
