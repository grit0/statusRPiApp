import { Injectable } from '@angular/core';

import { AngularFire, AuthMethods, AuthProviders, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
// import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Alert } from "../providers/alert"
/*
  Generated class for the Firebase provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Firebase {
  rpi;
  obRpi;

  statusFire;
  private database: FirebaseObjectObservable<any>;
  public uid: String = "11QyDZZsHTUmh0gKoBzW8OZjPB73";
  test = "Hello Test";
  public mac;
  private macloop
  private i;
  public send={eth0:""}
  public receive
  // public uid;
  constructor(private af: AngularFire, public alert: Alert) {
    console.log("Firebase uid : " + this.uid)
    this.database = af.database.object('users/' + this.uid + '/status');

    this.database.subscribe(item => {

      this.obRpi = item
      this.statusFire = item[this.mac]
      this.rpi = Object.keys(item).splice(0, 2)
      // console.log("subscribe in " + JSON.stringify(this.obRpi))
      console.log("subscribe in " + this.rpi)
      this.send["eth0"] = "aa"
      console.log(this.send["eth0"])
      // this.send["wlan0"] = this.obRpi.network.wlan0.tx_bytes
      // this.receive["eth0"] = this.obRpi.network.eth0.px_bytes
      // this.receive["wlan0"] = this.obRpi.network.wlan0.px_bytes
      // console.log(`${this.send["eth0"]}  ${this.send["wlan0"]} ${this.receive["eth0"]} ${this.receive["eth0"]}`)
      for (this.i = 0; this.i < this.rpi.length;this.i++) {
        console.log(this.rpi[this.i])
        this.alertFunc(this.obRpi[this.rpi[this.i]]["basic"]["temperature"], this.alert.settingAlert.temp, "Temperature")
        this.alertFunc(Math.floor(this.obRpi[this.rpi[this.i]]["physical"]["ram"]["used"]/this.obRpi[this.rpi[this.i]]["physical"]["ram"]["total"]*100), this.alert.settingAlert.ram, "RAM Usage")
        this.alertFunc(100 - Number(this.obRpi[this.rpi[this.i]]["physical"]["cpu"]["cpu_usage"]["id"]), this.alert.settingAlert.cpu, "CPU Usage")
        this.alertFunc(this.obRpi[this.rpi[this.i]]["physical"]["harddisk"]["use_percent"], this.alert.settingAlert.storage, "Storage Usage")
       
      }

      //   // return item;
    });
    //  this.obRpi=this.database 
    //  console.log(this.database);
    console.log('Hello Firebase Provider');

  }
  alertFunc(status, alertdata, textStatus) {
    //  console.log("list alert: "+JSON.stringify(this.alert.listAlert)+" status : "+status)
    // function checkDupStatus(list, temp_status,temp_value) {
    if (Number(status) > alertdata) {
      // console.log("add list alert")
      this.alert.listAlert.push({
        time: new Date().getTime(),
        // MAC: this.rpi[this.i]["network"]["eth0"]["mac"],
        MAC:this.rpi[this.i],
        status: textStatus,
        value: status
      })
console.log("alert in")

    }
  }


  // }
  // console.log("list alert: "+this.alert.listAlert+" ---> "+textStatus+status)
  // checkDupStatus(this.alert.listAlert,status,)
  // if (checkDupStatus(this.alert.listAlert,textStatus)) {
  //   console.log("alert dup : "+textStatus+" : "+status)
  // }



}
