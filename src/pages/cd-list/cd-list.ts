import { Component } from '@angular/core';
import { MenuController, ModalController } from 'ionic-angular';

import { Item } from '../../models/Item';
import { ItemsService } from '../../services/items.service';

import { Subscription } from 'rxjs/Subscription';

import { LendCdPage } from '../lend-cd/lend-cd';

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html'
})
export class CdListPage {
  diskList : Item[];
  disksSubscription: Subscription;

  constructor(
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private itemsService: ItemsService
  ){}

  ngOnInit() {
    this.disksSubscription = this.itemsService.disks$.subscribe(
      (disks: Item[]) => {
        this.diskList = disks.slice();
      }
    );
    this.itemsService.emitDisks();
  }

  ngOnDestroy() {
    this.disksSubscription.unsubscribe();
  }


  onToggleMenu() {
    this.menuCtrl.open();
  }

  onLend(index: number) {
    let modal = this.modalCtrl.create(LendCdPage,{index: index});
    modal.present();
  }


}

// Le menu latéral sera accessible depuis les pages
// de liste et la page de réglages.

// Dans les pages de liste, les éléments prêtés auront
// une couleur de fond différente afin de les rendre
// plus visibles.
