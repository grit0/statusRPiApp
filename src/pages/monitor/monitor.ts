import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
/*
  Generated class for the Monitor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-monitor',
  templateUrl: 'monitor.html'
})
export class MonitorPage {

  private ref: FirebaseObjectObservable<any>;
  private path: string;
  totalstatus: any;
  private status: any;
  public no_hdd_free: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {
    this.totalstatus = "all";
    this.path = this.navParams.get('path');
    console.log("path : " + this.path);
    this.ref = af.database.object(this.path);
    this.ref.subscribe(item => {
      // console.log(item);
      this.status = item;
      // this.rpi=Object.keys(item)
      console.log(JSON.stringify(item));
      // console.log(item
      // return item;
    });

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MonitorPage');
  }
  alertRam() {
    let alert = this.alertCtrl.create({
      title: 'Setting RAM Notification',
      // message: 'Do you want to buy this book?',
      inputs: [
        {
          label:"Free",
          name: 'alert_free',
          placeholder: 'Free',
          value:this.status.physical.harddisk.avail
        },
        {
          name: 'password',
          placeholder: 'Free'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: (data) => {
            console.log('Ok clicked settin ram free : ' + data.alert_free);
            this.no_hdd_free=data.alert_free
          }
        }
      ]
    });
    alert.present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Feature',
      buttons: [
        {
          text: 'Setting Alert',
          role: 'destructive',
          handler: () => {
            console.log('Setting Alert clicked');
            this.alertRam();
          }
        },
       {
          text: 'Parallel monitor',
          handler: () => {
            console.log('Parallel monitor clicked');
          }
        },
        {
          text: 'Graph monitor',
          handler: () => {
            console.log('Graph monitor clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }
  sto() {
    console.log("sto predds")
    // presentActionSheet() 


  }



}