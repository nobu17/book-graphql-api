import { IBookPriceGet } from '../repositories/interface';
import { StoreType } from '../models/book-price-domain';
import { SurugayaRepository } from '../repositories/surugaya-repository';
import { BookOffRepository } from '../repositories/bookoff-repository';
import { AmazonMarketRepository } from '../repositories/amazonmarket-repository';

export class BookPriceRepositoryFactory {
  public getRepository(storeType: StoreType): IBookPriceGet {
    switch (storeType) {
      case StoreType.Surugaya:
        return new SurugayaRepository();
      case StoreType.BookOff:
        return new BookOffRepository();
      case StoreType.AmazonMarket:
        return new AmazonMarketRepository();
      default:
        throw Error('not supported type:' + storeType);
    }
  }
}
