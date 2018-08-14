import { Component } from '@angular/core';
import { MenuController, ToastController, LoadingController } from 'ionic-angular';

import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

    constructor(private menuCtrl: MenuController,
                private loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private itemsService: ItemsService){}

    onToggleMenu() {
      this.menuCtrl.open();
    }



    onSaveBookList() {
      let loader = this.loadingCtrl.create({
        content: 'Sauvegarde de la liste des livres en cours…'
      });
      loader.present();
      this.itemsService.saveBookData().then(
        () => {
          loader.dismiss();
          this.toastCtrl.create({
            message: 'Données sauvegardées !',
            duration: 3000,
            position: 'bottom'
          }).present();
        },
        (error) => {
          loader.dismiss();
          this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: 'bottom'
          }).present();
        }
      );
    }

    onSaveDiskList() {
      let loader = this.loadingCtrl.create({
        content: 'Sauvegarde de la liste des disques en cours…'
      });
      loader.present();

      this.itemsService.saveDiskData().then(
        () => {
          loader.dismiss();
          this.toastCtrl.create({
            message: 'Données sauvegardées !',
            duration: 3000,
            position: 'bottom'
          }).present();
        },
        (error) => {
          loader.dismiss();
          this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: 'bottom'
          }).present();
        }
      );
    }



    onFetchBookList() {
      let loader = this.loadingCtrl.create({
        content: 'Récupération de la liste des livres en cours…'
      });
      loader.present();
      this.itemsService.retrieveBookData().then(
        () => {
          loader.dismiss();
          this.toastCtrl.create({
            message: 'Données récupérées !',
            duration: 3000,
            position: 'bottom'
          }).present();
        },
        (error) => {
          loader.dismiss();
          this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: 'bottom'
          }).present();
        }
      );
    }

    onFetchDiskList() {
      let loader = this.loadingCtrl.create({
        content: 'Récupération de la liste des disques en cours…'
      });
      loader.present();
      this.itemsService.retrieveDiskData().then(
        () => {
          loader.dismiss();
          this.toastCtrl.create({
            message: 'Données récupérées !',
            duration: 3000,
            position: 'bottom'
          }).present();
        },
        (error) => {
          loader.dismiss();
          this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: 'bottom'
          }).present();
        }
      );
    }


}

// Le menu latéral sera accessible depuis les pages
// de liste et la page de réglages.
