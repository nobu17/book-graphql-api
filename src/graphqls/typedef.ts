export const TypeDefs = `
type Query {
    book(isbn13: String! storeType: StoreType!): BookPriceInfo
}
type BookPriceInfo {
    isbn13: String
    storeType: StoreType
    price: Int
    shipping: Int
    linkUrl: String
    isSoldOut: Boolean
    isError: Boolean
  }
  enum StoreType {
    Surugaya
    BookOff
    AmazonMarket
  }
`;
