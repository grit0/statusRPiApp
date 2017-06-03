import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

import { HomePage } from '../home/home';
import { OfflinePage } from '../offline/offline';
import { MonitorPage } from '../monitor/monitor'
import { $WebSocket } from 'angular2-websocket/angular2-websocket'
import {Firebase } from '../../providers/firebase'
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginData = {
    email: '',
    password: ''
  }
  constructor(private navCtrl: NavController, private af: AngularFire,
    private toastCtrl: ToastController, private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public dataFire:Firebase
  
  ) { }

  login() {
    // Login Code her
    this.af.auth.login({
      email: this.loginData.email,
      password: this.loginData.password
    }, {
        method: AuthMethods.Password,
        provider: AuthProviders.Password
      })
      .then(auth => {
        // Do custom things with auth
        // console.log(`uidddddd : ${auth.uid}`)
        this.dataFire.uid=auth.uid
        console.log(this.loginData.email + " " + this.loginData.password+" : "+this.dataFire.uid);
        // this.navCtrl.push(HomePage, { uid: auth.uid, modeOffline: false });
      })
      .catch(err => {
        // Handle error
        let toast = this.toastCtrl.create({
          message: err.message,
          duration: 1000
        });
        toast.present();
      });
  }
  offline() {
    console.log("offline clicked");
    // this.navCtrl.push(OfflinePage);
    let alert = this.alertCtrl.create({
      title: 'Connect By IP Address',
      inputs: [
        {
          name: 'ip',
          placeholder: 'IP Address'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            const ws = new $WebSocket(`ws://${data.ip}:33333`)
            ws.onMessage(
              (msg: MessageEvent) => {
                console.log("onMessage : ", JSON.parse(msg.data)["b8:27:eb:49:e3:4a"]["basic"]['date']);
                // this.status = JSON.parse(msg.data)["b8:27:eb:49:e3:4a"]
                this.navCtrl.push(MonitorPage, { modeOffline: true, ip: data.ip, status: JSON.parse(msg.data)["b8:27:eb:49:e3:4a"] });
              },
              { autoApply: false }
            );
            console.log("pre monitor")
            let loading = this.loadingCtrl.create({
              spinner: 'hide',
              content: 'Loading Please Wait...',
              duration: 5000
            });

            loading.onDidDismiss(() => {
              console.log('Dismissed loading');
            });

            loading.present();
          
          // this.navCtrl.push(MonitorPage, { modeOffline: true, ip: data.ip });

          // this.af.database.object('users/' + this.uid + '/status/' + thisRpi).update(data);

          // if (User.isValid(data.username, data.password)) {
          //   // logged in!
          // } else {
          //   // invalid login
          //   return false;
          // }
        }
        }
      ]
  });
  alert.present();
}
signup() {
  this.navCtrl.push(SignupPage, { email: this.loginData.email });
}
}