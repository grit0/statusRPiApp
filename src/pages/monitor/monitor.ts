import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { ChartstatusPage } from '../chartstatus/chartstatus'
import { SettingnotificationPage } from '../settingnotification/settingnotification'
import { $WebSocket } from 'angular2-websocket/angular2-websocket'
import { Alert } from '../../providers/alert'
import { Firebase } from '../../providers/firebase'
/*
  Generated class for the Monitor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  // styleUrls: ['./circle.css'],
  selector: 'page-monitor',
  templateUrl: 'monitor.html'
})
export class MonitorPage {

  private ref: FirebaseObjectObservable<any>;
  private path: string;
  totalstatus: any;
  private status: any;
  public a = 5;
  public no_hdd_free: any;
  modeOffline: boolean;
  g3: boolean = true
  public mac = "b8:27:eb:49:e3:4a";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    public alert: Alert,
    public dataFire : Firebase
  ) {
console.log("come in home")
    this.totalstatus = "all";
    this.modeOffline = this.navParams.get("modeOffline")
   
    if (this.modeOffline) {
      console.log("Is mode Offline")
      let ip = this.navParams.get("ip")
      this.status = this.navParams.get("status")
      const ws = new $WebSocket(`ws://${ip}:33333`)
      ws.onMessage(
        (msg: MessageEvent) => {
          console.log("onMessage : ", JSON.parse(msg.data)["b8:27:eb:49:e3:4a"]["basic"]['date']);
          this.status=JSON.parse(msg.data)["b8:27:eb:49:e3:4a"]
        },
        { autoApply: false }
      );
    } else {
      console.log("Is mode Online")
      this.path = this.navParams.get('path');
      console.log("path : " + this.path);
      this.dataFire.mac=this.mac
      console.log("fire mac "+this.dataFire.mac)
      // this.status=this.dataFire.obRpi
      // console.log("555+" + JSON.stringify(this.dataFire.obRpi))
      // this.ref=this.dataFire.obRpi.ch
      this.ref = af.database.object(this.path);
      this.ref.subscribe(item => {
        // console.log(item);
        this.status = item;
        // if (Number(this.status["physical"]["ram"]["used"]) > this.alert.settingAlert.ram) {
        //   this.alert.listAlert.push({
        //     time:new Date().getTime() ,
        //     MAC: this.status["network"]["eth0"]["mac"],
        //     status: "RAM",
        //     value: this.status["physical"]["ram"]["used"]
        //   })
        // }
        // this.rpi=Object.keys(item)
        // this.alertFunc(this.status["basic"]["temperature"], this.alert.settingAlert.temp, "Temperature")
        // this.alertFunc(this.status["physical"]["ram"]["used"], this.alert.settingAlert.ram, "RAM Usage")
        // this.alertFunc(100 - Number(this.status["physical"]["cpu"]["cpu_usage"]["id"]), this.alert.settingAlert.cpu, "CPU Usage")
        // this.alertFunc(this.status["physical"]["harddisk"]["use_percent"], this.alert.settingAlert.storage, "Storage Usage")
        // this.alertFunc(this.status["physical"]["ram"]["used"],this.status["physical"]["ram"]["used"],"RAM")
        // console.log(JSON.stringify(item));
      });

    }

  }
  booleanFirebase(value) {
    if (value == "1")
      return true
    return false
  }
  changeGpioValue(pin) {

    console.log(`value : ${this.path}/peripheral/gpio/${pin}/value : ${this.status.peripheral.gpio[pin].value}`)
    this.af.database.object(`${this.path}/peripheral/gpio/${pin}/value`).set(this.status.peripheral.gpio[pin].value);
  }
  changeGpiomodeIN($event, pin) {
    console.log($event._checked + " : " + pin)
    // console.log(`modeIN : ${this.path}/peripheral/gpio/${pin}/modeIN : ${this.status.peripheral.gpio[pin].modeIN}`)
    this.af.database.object(`${this.path}/peripheral/gpio/${pin}/modeIN`).set($event._checked);
  }
  alertFunc(status, alertdata, textStatus) {
    //  console.log("list alert: "+JSON.stringify(this.alert.listAlert)+" status : "+status)
    // function checkDupStatus(list, temp_status,temp_value) {
    if (Number(status) > alertdata) {
      // console.log("add list alert")
      let i;
      for (i = 0; i < this.alert.listAlert.length; i++) {
        if (this.alert.listAlert[i].status == textStatus && this.alert.listAlert[i].value == status) {
          console.log("dup" + this.alert.listAlert[i].status + textStatus + this.alert.listAlert[i].value + status)
        }
        else {
           console.log("hey")
          this.alert.listAlert.push({
            time: new Date().getTime(),
            MAC: this.status["network"]["eth0"]["mac"],
            status: textStatus,
            value: status
          })
        }
       
      }
    }
    //   // return true
    // }
    // console.log(i)

    // return false
  
  console.log("-------------")
  // }
  // console.log("list alert: "+this.alert.listAlert+" ---> "+textStatus+status)
  // checkDupStatus(this.alert.listAlert,status,)
  // if (checkDupStatus(this.alert.listAlert,textStatus)) {
  //   console.log("alert dup : "+textStatus+" : "+status)
  // }

}

syncOffline() {
  let ip = this.navParams.get("ip")

  const ws = new $WebSocket(`ws://${ip}:33333`)
  ws.onMessage(
    (msg: MessageEvent) => {
      console.log("onMessage : ", JSON.parse(msg.data)["b8:27:eb:49:e3:4a"]["basic"]['date']);
      this.status = JSON.parse(msg.data)["b8:27:eb:49:e3:4a"]
    },
    { autoApply: false }
  );
}
ionViewDidLoad() {
  console.log('ionViewDidLoad MonitorPage');
}
gotoSettingnotification() {
  this.navCtrl.push(SettingnotificationPage);
}
gotoChart() {
  this.navCtrl.push(ChartstatusPage, { path: this.path });
}
alertRam() {
  let alert = this.alertCtrl.create({
    title: 'Setting RAM Notification',
    // message: 'Do you want to buy this book?',
    inputs: [
      {
        label: "Free",
        name: 'alert_free',
        placeholder: 'Free',
        value: this.status.physical.harddisk.avail
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
          this.no_hdd_free = data.alert_free
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
          this.navCtrl.push(ChartstatusPage);
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
// export const a ;