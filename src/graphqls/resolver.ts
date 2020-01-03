import { BookPriceService } from '../services/book-price-service';

const service = new BookPriceService();

export const Resolver = {
  book: args =>
    service.getBookPriceInfo({ isbn13: args.isbn13, storeType: args.storeType })
};
