import { IBookPriceGet } from './interface';
import { WebClient } from './web-celint';
import { BookPriceInfo, StoreType } from '../models/book-price-domain';
import * as HTMLParser from 'fast-html-parser';

export class SurugayaRepository extends WebClient implements IBookPriceGet {
  private requestBaseUrl =
    'https://www.suruga-ya.jp/search?category=&search_word={0}&inStock=On';
  private productBaseUrl = 'https://www.suruga-ya.jp';

  public async getBookPriceInfo(isbn13: string): Promise<BookPriceInfo> {
    let bookPrice = {
      isError: false,
      isSoldOut: true,
      isbn13: isbn13,
      price: -1,
      shipping: 0,
      storeType: StoreType.Surugaya,
      linkUrl: ''
    };
    const url = this.requestBaseUrl.replace('{0}', isbn13);
    try {
      const htmlstr = await this.getHtmlDocument(url);
      const doc = HTMLParser.parse(htmlstr);
      // console.log('doc', doc);
      const price = doc.querySelector(
        'div.item_price p.price_teika span.text-red strong'
      );
      if (price) {
        const trimPrice = price.text
          .replace('￥', '')
          .replace(',', '')
          .trim();

        bookPrice.price = Number(trimPrice);
        bookPrice.isSoldOut = false;

        const link = doc.querySelector('p.title a');
        if (link) {
          bookPrice.linkUrl = this.productBaseUrl + link.attributes['href'];
        }
      }
    } catch (err) {
      bookPrice.isError = true;
      console.error('getBookPriceInfo error:', err);
    }
    console.log('bookPrice:', bookPrice);
    return bookPrice;
  }
}
