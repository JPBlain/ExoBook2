export class Item {
  description: string[];
  isAvailable: boolean;
  borrowerName: string;

  constructor(public name: string) {
    this.isAvailable = true;
    borrowerName = '';
  }
}
