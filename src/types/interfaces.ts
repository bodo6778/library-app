export interface book {
  id: number;
  author?: string;
  title: string;
  isbn: string;
  price: number;
  dateOfRent?: Date;
  renter?: string;
}
