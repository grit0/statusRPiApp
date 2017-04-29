import { Component ,ViewChild} from '@angular/core';
import { Nav,Platform ,MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { MonitorPage } from '../pages/monitor/monitor';

 
import { AngularFire } from 'angularfire2';
import { LoginPage } from '../pages/login/login';
import {Network} from '@ionic-native/network'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage : any=TabsPage;
pages: Array<{title: string, component: any}>;

 
constructor(platform: Platform, private network: Network,
  private menu:MenuController,  
    statusBar: StatusBar, splashScreen: SplashScreen,
    private af: AngularFire,
    // private navCtrl:NavController
) {
  
    this.af.auth.subscribe(auth => {
      if(!auth)
        this.rootPage = LoginPage;
      // else
        // this.rootPage = TabsPage;

 
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
          this.pages = [//+++
            {title: 'Login', component: LoginPage},
            {title: 'Moniter', component :MonitorPage}
            // {title: 'Logout'},

    ];
  }
      openPage(page) {//+++
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
        this.menu.toggle();    
  }
    logout() { 
    this.af.auth.logout(); 
    console.log("Log out");
  }
}


