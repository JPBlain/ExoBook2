import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, ModalController } from 'ionic-angular';

import { Item } from '../../models/Item';
import { ItemsService } from '../../services/items.service';

import { Subscription } from 'rxjs/Subscription';

import { LendBookPage } from '../lend-book/lend-book';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html'
})
export class BookListPage implements OnInit, OnDestroy {
  bookList : Item[];
  booksSubscription: Subscription;

  constructor(
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private itemsService: ItemsService
  ){}

  ngOnInit() {
    this.booksSubscription = this.itemsService.books$.subscribe(
      (books: Item[]) => {
        this.bookList = books.slice();
      }
    );
    this.itemsService.emitBooks();
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  onLend(index: number) {
    let modal = this.modalCtrl.create(LendBookPage,{index: index});
    modal.present();
  }

}

// Le menu latéral sera accessible depuis les pages
// de liste et la page de réglages.

// Dans les pages de liste, les éléments prêtés auront
// une couleur de fond différente afin de les rendre
// plus visibles.
