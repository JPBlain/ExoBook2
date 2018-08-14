import { Subject } from 'rxjs/Subject';

import { Item } from '../models/Item';

import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

export class ItemsService {

  books$ = new Subject<Item[]>();
  disks$ = new Subject<Item[]>();

  bookList : Item[] = [];
  diskList : Item[] = [];

  emitBooks() {
    this.books$.next(this.bookList.slice());
  }

  emitDisks() {
    this.disks$.next(this.diskList.slice());
  }

  borrowBook(index: number, borrowerName: string) {
    this.bookList[index].isAvailable = false;
    this.bookList[index].borrowerName = borrowerName;
    this.emitBooks();
  }

  borrowDisk(index: number, borrowerName: string) {
    this.diskList[index].isAvailable = false;
    this.diskList[index].borrowerName = borrowerName;
    this.emitDisks();
  }

  returnBook(index: number) {
    this.bookList[index].isAvailable = true;
    this.bookList[index].borrowerName = '';
    this.emitBooks();
  }

  returnDisk(index: number) {
    this.diskList[index].isAvailable = true;
    this.diskList[index].borrowerName = '';
    this.emitDisks();
  }

  saveBookData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('books').set(this.bookList).then(
        (data: DataSnapshot) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  saveDiskData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('disks').set(this.diskList).then(
        (data: DataSnapshot) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  retrieveBookData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('books').once('value').then(
        (data: DataSnapshot) => {
          this.bookList = data.val();
          this.emitBooks();
          resolve('Liste des livres récupérée avec succès !');
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  retrieveDiskData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('disks').once('value').then(
        (data: DataSnapshot) => {
          this.diskList = data.val();
          this.emitDisks();
          resolve('Liste des disques récupérée avec succès !');
        }, (error) => {
          reject(error);
        }
      );
    });
  }



}

// Vous aurez un service qui centralise les données des livres
// et des CD (créez deux array séparés, codés en dur, contenant
// plusieurs éléments), ainsi qu'une seule méthode pour prêter
// et rendre un élément.
