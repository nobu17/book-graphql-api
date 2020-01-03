export interface BookPriceGetRequest {
  isbn13: string;
  storeType: StoreType;
}

export interface BookPriceInfo {
  isbn13: string;
  storeType: StoreType;
  price: number;
  shipping: number;
  linkUrl: string;
  isSoldOut: boolean;
  isError: boolean;
}

export enum StoreType {
  Surugaya = 'Surugaya',
  BookOff = 'BookOff',
  AmazonMarket = 'AmazonMarket'
}
