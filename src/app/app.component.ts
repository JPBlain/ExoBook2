import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AuthPage } from '../pages/auth/auth';
import { HomePage } from '../pages/home/home';

import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  tabsPage: any = TabsPage;
  settingsPage: any = SettingsPage;
  authPage: any = AuthPage;
  homePage: any = HomePage;

  isAuth: boolean = false;

  @ViewChild("content") content: NavController;

  constructor(
      platform: Platform,
      statusBar: StatusBar,
      splashScreen: SplashScreen,
      private menuCtrl: MenuController) {

    platform.ready().then(() => {

      let config = {
        apiKey: "AIzaSyAh6Mc0iVSM8RjLOet4ITwOxOwlsdyE1lo",
        authDomain: "exobook2.firebaseapp.com",
        databaseURL: "https://exobook2.firebaseio.com",
        projectId: "exobook2",
        storageBucket: "exobook2.appspot.com",
        messagingSenderId: "929610874983"
      };

      firebase.initializeApp(config);

      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
            this.content.setRoot(TabsPage);
          } else {
            this.isAuth = false;
            this.content.setRoot(AuthPage, {mode: 'connect'});
          }
        }
      );

      statusBar.styleDefault();
      splashScreen.hide();
    });


  }

  onNavigate(page: any, data?: {}) {
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }

  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }

}

// Vous intégrerez également un menu latéral permettant d'accéder
// à une page de réglages (qui comportera simplement un titre et
// un texte placeholder).


// L'authentification et la base de données seront intégrées avec Firebase
