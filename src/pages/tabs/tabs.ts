import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../../services/items.service';

import { BookListPage } from '../book-list/book-list';
import { CdListPage } from '../cd-list/cd-list';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage implements OnInit {
  bookListPage = BookListPage;
  cdListPage = CdListPage;

  constructor(private itemsService: ItemsService){}

  ngOnInit() {
    this.itemsService.fetchLocal();
  }
}


// Vous utiliserez des tabs pour passer de la page Livres à la page CD.
