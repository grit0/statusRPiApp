import { Injectable } from '@angular/core';

import { AngularFire, AuthMethods, AuthProviders, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
// import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

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
  // public uid;
  constructor(private af: AngularFire ) {
 console.log("Firebase uid : "+this.uid) 
    this.database = af.database.object('users/' + this.uid + '/status');

    this.database.subscribe(item => {
     
      this.obRpi = item
      this.statusFire = item[this.mac]
      this.rpi = Object.keys(item).splice(0,2)
       console.log("subscribe in " + JSON.stringify(this.obRpi))
      console.log("subscribe in " + this.rpi)

    

    //   // return item;
    });
//  this.obRpi=this.database 
    //  console.log(this.database);
    console.log('Hello Firebase Provider');
  
  }
}
