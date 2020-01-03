import { IBookPriceGet } from './interface';
import { WebClient } from './web-celint';
import { BookPriceInfo, StoreType } from '../models/book-price-domain';
import { IsbnConverter } from '../util/isbn-converter';
import * as HTMLParser from 'fast-html-parser'

export class AmazonMarketRepository extends WebClient implements IBookPriceGet {
  private requestBaseUrl = 'https://www.amazon.co.jp/gp/offer-listing/{0}';

  public async getBookPriceInfo(isbn13: string): Promise<BookPriceInfo> {
    let bookPrice = {
      isError: false,
      isSoldOut: true,
      isbn13: isbn13,
      price: -1,
      shipping: 0,
      storeType: StoreType.AmazonMarket,
      linkUrl: ''
    };
    const url = this.requestBaseUrl.replace(
      '{0}',
      IsbnConverter.getIsbn10(isbn13)
    );
    try {
      const htmlstr = await this.getHtmlDocument(url);
      // console.log('doc', doc);
      const doc = HTMLParser.parse(htmlstr);
      const price = doc.querySelector('span.olpOfferPrice');
      if (price) {
        const trimPrice = price.text
          .replace('￥', '')
          .replace(',', '')
          .trim();

        bookPrice.price = Number(trimPrice);
        bookPrice.isSoldOut = false;
        bookPrice.linkUrl = url;

        const shipRoot = doc.querySelector('p.olpShippingInfo');
        if (shipRoot) {
          const shipping = shipRoot.querySelector('span.olpShippingPrice');
          if (shipping) {
            bookPrice.shipping = Number(
              shipping.text
                .replace('￥', '')
                .replace(',', '')
                .trim()
            );
          }
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
