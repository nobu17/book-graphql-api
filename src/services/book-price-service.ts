import { BookPriceRepositoryFactory } from './book-price-repository-factory';
import {
  BookPriceInfo,
  BookPriceGetRequest
} from '../models/book-price-domain';

export class BookPriceService {
  private factory = new BookPriceRepositoryFactory();

  public async getBookPriceInfo(
    request: BookPriceGetRequest
  ): Promise<BookPriceInfo> {
    console.log('BookPriceService.getBookPriceInfo start', request);
    const repository = this.factory.getRepository(request.storeType);
    return await repository.getBookPriceInfo(request.isbn13);
  }
}
