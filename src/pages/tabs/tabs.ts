import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { NotificationPage } from '../notification/notification';
import { ContactPage } from '../contact/contact';
// import * as myGlobals from '../monitor/monitor';
import {MonitorPage } from '../monitor/monitor'
import {Alert} from '../../providers/alert'
@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  //numberAlert = MonitorPage.a;
  countAlert: number;  
  tab1Root: any = HomePage;
  tab2Root: any = NotificationPage;
  tab3Root: any = ContactPage;
  constructor(public alert:Alert) {
    this.countAlert=alert.listAlert.length

  }
  // ionDidWillEnter() {

  //   this.countAlert=this.alert.listAlert.length
  //   console.log("count: "+this.countAlert)
  // }
  // ionViewDidEnter() { 
  //   console.log("tab DidEnter")
  // }
}
