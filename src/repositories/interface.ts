import { BookPriceInfo } from '../models/book-price-domain';

export interface IBookPriceGet {
  getBookPriceInfo(isbn13: string): Promise<BookPriceInfo>;
}
