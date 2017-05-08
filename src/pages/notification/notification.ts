import { Component } from '@angular/core';
import { NavController, NavParams,ModalController} from 'ionic-angular';
import { SettingnotificationPage } from '../settingnotification/settingnotification';

/*
  Generated class for the Notification page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  a: string = "50%";
  constructor(public navCtrl: NavController, public navParams: NavParams,public modal:ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }
  setting() {
    // this.navCtrl.push(SettingNotificationPage);

    this.navCtrl.push(SettingnotificationPage);
  }
  createModal() {
    let myModel = this.modal.create(SettingnotificationPage);
    myModel.present();
}
}
