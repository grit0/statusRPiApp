import { Injectable } from '@angular/core';

/*
  Generated class for the Alert provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Alert {
  listAlert: any = [{time:new Date().getTime() , MAC: "bb:bb:bb:bb:bb", status: "CPU", value: 30 }]
  settingAlert: any;
  count: any;
  constructor() {
    console.log('Hello Alert Provider');
    this.settingAlert = {
      temp:80,
      cpu: 90,
      ram: 80,
      storage: 80,
      rx: 80,
      tx:80
    }

   


  }
  // ionViewDidEnter() {
  //    this.count = this.listAlert.length;
  // }

}
