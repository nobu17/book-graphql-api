import { IBookPriceGet } from './interface';
import { WebClient } from './web-celint';
import { BookPriceInfo, StoreType } from '../models/book-price-domain';
import * as HTMLParser from 'fast-html-parser'

export class BookOffRepository extends WebClient implements IBookPriceGet {
  private requestBaseUrl =
    'https://www.bookoffonline.co.jp/display/L001,st=u,bg=12,q={0}';
  private productBaseUrl = 'https://www.bookoffonline.co.jp';

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
      const htmlstr = await this.getHtmlDocument(url, 'Shift_JIS');
      // console.log('doc', doc);
      const doc = HTMLParser.parse(htmlstr);
      const price = doc.querySelector('td.mainprice');

      if (price) {
        const trimPrice = price.text
          .replace('￥', '')
          .replace(',', '')
          .split('（税込）')[0]
          .trim();

        bookPrice.price = Number(trimPrice);
        bookPrice.isSoldOut = false;

        const link = doc.querySelector('div.list_l a');
        if (link) {
          // bookPrice.linkUrl = this.productBaseUrl + link.getAttribute('href');
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
