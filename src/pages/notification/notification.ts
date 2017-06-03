import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SettingnotificationPage } from '../settingnotification/settingnotification';
import { Alert } from '../../providers/alert'
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
  listAlert: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modal: ModalController, public alert: Alert) {
    // console.log(this.alert.listAlert[0].time)
    // this.alert.listAlert[i].timeago
    //   this.alert.listAlert.forEash((value) => {
    //     console.log(value)

    // })


  }
  removeAlert(item) {
    for (let i = 0; i < this.alert.listAlert.length; i++) {

      if (this.alert.listAlert[i] == item) {
        this.alert.listAlert.splice(i, 1);
      }

    }

  }
  ionViewWillEnter() {
    for (var value of this.alert.listAlert) {
      // console.log(value.time);
      // this.alert.listAlert.push(value.timeago)
      value["timeago"] = this.timeAgo(value.time)
    }
    console.log(this.alert.listAlert)
  }
  timeAgo(time) {
    var secs = (new Date()).getTime() - time;
    secs = secs / 1000
    Math.floor(secs);
    var minutes = secs / 60;
    secs = Math.floor(secs % 60);
    if (minutes < 1) {
      return secs + (secs > 1 ? ' seconds ago' : ' second ago');
    }
    var hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
    if (hours < 1) {
      return minutes + (minutes > 1 ? ' minutes ago' : ' minute ago');
    }
    var days = hours / 24;
    hours = Math.floor(hours % 24);
    if (days < 1) {
      return hours + (hours > 1 ? ' hours ago' : ' hour ago');
    }
    var weeks = days / 7;
    days = Math.floor(days % 7);
    if (weeks < 1) {
      return days + (days > 1 ? ' days ago' : ' day ago');
    }
  }
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
