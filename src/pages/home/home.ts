import { Component } from '@angular/core';

import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MonitorPage } from '../monitor/monitor'
import { ParallelPage} from '../parallel/parallel'
import { AngularFire, AuthMethods, AuthProviders , FirebaseObjectObservable } from 'angularfire2';
// import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { Network } from '@ionic-native/network';
import {Firebase} from '../../providers/firebase'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rpi;
  rpiBookmark;
  obRpi;
  aboutPage = AboutPage;
  items: string[];
  modeListPi: any
  bo = true;
  check_timeout: boolean = false;
  private Rooms: FirebaseObjectObservable<any>;
  //  private mail:FirebaseObjectObservable<any[]>;
  private uid: String;
  // private uid: String = "11QyDZZsHTUmh0gKoBzW8OZjPB73";
  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private toast: ToastController,
    private network: Network,
    // private af: AngularFire,
    public af : AngularFire,
    public navParams: NavParams,
    public dataFire: Firebase
    // public mo: MonitorPage
  ) {
    this.modeListPi = "all";
    this.rpiBookmark = [];

    console.log("..."+this.dataFire.rpi)

    // this.Rooms=this.dataFire.databse
    // this.dataFire.uid= this.navParams.get('uid');
    // console.log(`uid is home : ${this.navParams.get('uid')}`);
    // console.log(`uid is home : ${this.dataFire.uid}`);
    // this.Rooms = af.database.object('users/' + this.dataFire.uid + '/status');
    
    // this.Rooms.subscribe(item => {
    //   // console.log(item);
 
    //   this.rpi = Object.keys(item)
    //   // return item;
    // });
    

    // this.items.push(this.dataFire.rpi)
    // console.log(`rpi : ${this.dataFire.rpi}`);
    // console.log(`Items : ${this.items}`)
    // console.log("uid home: "+this.uid)
    // console.log("dd"+JSON.stringify(this.Rooms));
    // console.log(Object.keys(this.Rooms));
    // console.log(this.Rooms)
    // this.Rooms=af.database.object('/Rooms');
    // this.Rooms.push({"a":"b"}).then((room) => { console.log(room.key); });
    // this.mail=af.database.object('/name').set({ name: 'Test' });;
    // .set({ name: 'Test' });
    // this.mail.push({});
    // this.mail.push({name:'new item'}).then((room) => { console.log(room.key); });;
    // af.database.object().put()
    // if (mo.no_hdd_free == 700) {
    //   console.log("hdd : 700");
    // }

  }
  // displayNetwork(connectStatus:string) {
  //      this.toast.create({

  //     message: `Hello : ${connectStatus}`,
  //     duration: 3000
  //   }).present();
  // }

  // ionViewDidEnter() {
  //   console.log('ionView didEnter========'+this.network.downlinkMax)

  //   this.network.onConnect().subscribe(data => {
  //     console.log("onconnect : "+data);
  //     // this.displayNetwork('ddd');
  //   }, error => console.error(error));
  //     this.network.onDisconnect().subscribe(data => console.log(`check network : ${data}`),error => console.error(error));
  // }
  // }
  parallel(){
    this.navCtrl.push(ParallelPage)
  }
  timeout(time){
    // var secs = (new Date()).getTime() - time;
    // secs = secs / 1000
    // var minutes = secs / 60;
    // return Math.floor(minutes)<10?false:true

}
  shutdown(thisRpi) {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: `Do you want to shutdown ${thisRpi} ?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            this.af.database.object('users/' + this.dataFire.uid + '/status/' + thisRpi).update({ 'shutdown': 1 });
            console.log('shutdowned');
          }
        }
      ]
    });
    alert.present();
  }

  prompt(thisRpi) {
    let alert = this.alertCtrl.create({
      title: 'Prompt',
      inputs: [
        {
          name: 'command',
          placeholder: 'Command'
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
          text: 'Run',
          handler: data => {
            this.af.database.object('users/' + this.dataFire.uid + '/status/' + thisRpi).update(data);

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

  bookmark(rpi) {
    if (this.rpiBookmark.indexOf(rpi) < 0) {
      console.log("aaa : " + this.rpiBookmark.indexOf(rpi))
      this.rpiBookmark.push(rpi);
      console.log(rpi + " --> add bookmark : " + this.rpiBookmark);
    }
  }
  delBookmark(rpi) {
    this.rpiBookmark.pop(rpi)
  }
  logout() {
    this.af.auth.logout();
    console.log("Log out");
  }

  monitor(mac) {
  
    console.log("HomePage will go to MonotorPage : " + mac)
    this.navCtrl.push(MonitorPage, { path: 'users/' + this.dataFire.uid + '/status/' + mac });
    
  }

  getItems(ev: any) {
    //  this.items.push(this.dataFire.rpi);
    // Reset rpi back to all of the items
    // this.initializeItems();
    // set val to the value of the ev target
    this.dataFire.rpi = Object.keys(this.dataFire.obRpi)
    var val = ev.target.value;
    console.log("clicked search bar , key : " + val)
    if (val && val.trim() != '') {
      console.log("in val")
      this.dataFire.rpi = this.dataFire.rpi.filter((item) => {
        console.log("in filter")
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }
  getItemsBook(ev: any) {
    let rpiBookmarkSearch = this.rpiBookmark;
    console.log(rpiBookmarkSearch)
    var val = ev.target.value;
    console.log("clicked search bar boomarks , key : " + val)
    if (val && val.trim() != '') {
      console.log("in val"+val)
      this.rpiBookmark = this.rpiBookmark.filter((item) => {
        console.log("in filter")
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
   
      // if("undefined" === typeof val) {
    else {
      
      this.rpiBookmark = rpiBookmarkSearch
      console.log("exit"+this.bookmark)
        // this.rpiBookmark=rpiBookmarkSearch
      }
  }
}