import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Firebase} from '../../providers/firebase'
/*
  Generated class for the Parallel page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-parallel',
  templateUrl: 'parallel.html'
})
export class ParallelPage {
a=40;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataFire:Firebase) {
    console.log(this.dataFire.obRpi)
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParallelPage');
    
  }

}
