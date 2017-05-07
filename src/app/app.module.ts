import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NotificationPage } from '../pages/notification/notification';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SettingnotificationPage } from '../pages/settingnotification/settingnotification';
import { OfflinePage } from '../pages/offline/offline';
import { SignupPage } from '../pages/signup/signup';
import { MonitorPage } from '../pages/monitor/monitor'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { Network } from '@ionic-native/network';
  export const config = {
    apiKey: "AIzaSyCMuM1Toy1upqRY1czF0YpkhxrAo2fzR4Q",
    authDomain: "pi-grit.firebaseapp.com",
    databaseURL: "https://pi-grit.firebaseio.com",
    storageBucket: "pi-grit.appspot.com",
    messagingSenderId: "1091509710648"
  };
@NgModule({
  declarations: [
    MyApp,
    NotificationPage,
    SettingnotificationPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    OfflinePage,
    SignupPage,
    MonitorPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationPage,
SettingnotificationPage, 
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    OfflinePage,
    SignupPage,MonitorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Network

  ]
})
export class AppModule {}
