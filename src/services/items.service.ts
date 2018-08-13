import { Item } from '../models/Item';

export class ItemsService {

  bookList : Item[] = [
    {
      name: 'Malte week-end',
      description: [
        'ISBN: 978-2-06-722734-7',
        'Collection: LeGuide Vert'
      ],
      isAvailable: false,
      borrowerName: 'Thomas Sue'
    },
    {
      name: 'Les montagnes hallucinées',
      description: [
        'ISBN: 2-290-31905-8',
        'Auteur: HP Lovecraft'
      ],
      isAvailable: true,
      borrowerName: ''
    },
    {
      name: '365 jours de fête',
      description: [
        'ISBN: 978-2-01-231249-4',
        'Auteur: Pippa Middleton'
      ],
      isAvailable: true,
      borrowerName: ''
    },
    {
      name: 'Union Européenne et Droit International',
      description: [
        'ISBN: 978-2-233-00665-3',
        'Auteurs: Myriam Benlolo-Carabot, Ulas Candas, Eglantine Cujo'
      ],
      isAvailable: true,
      borrowerName: ''
    }
  ];

  diskList : Item[] = [
    {
      name: 'SteamBoy',
      description: [
        'Durée: 2h11',
        'Scénariste: Katsuhiro Ôtomo'
      ],
      isAvailable: true,
      borrowerName: ''
    },
    {
      name: 'Origine',
      description: [
        'Durée: 2h30',
        'Réalisateur: Keiichi Sugiyama'
      ],
      isAvailable: false,
      borrowerName: 'Elodie Dupuy'
    }
  ];


  borrowBook(index: number, borrowerName: string) {
    this.bookList[index].isAvailable = false;
    this.bookList[index].borrowerName = borrowerName;
  }

  borrowDisk(index: number, borrowerName: string) {
    this.diskList[index].isAvailable = false;
    this.diskList[index].borrowerName = borrowerName;
  }

  returnBook(index: number) {
    this.bookList[index].isAvailable = true;
    this.bookList[index].borrowerName = '';
  }

  returnDisk(index: number) {
    this.diskList[index].isAvailable = true;
    this.diskList[index].borrowerName = '';
  }

}

// Vous aurez un service qui centralise les données des livres
// et des CD (créez deux array séparés, codés en dur, contenant
// plusieurs éléments), ainsi qu'une seule méthode pour prêter
// et rendre un élément.
