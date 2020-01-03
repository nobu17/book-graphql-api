import { graphql, buildSchema } from 'graphql';
import { Resolver } from '../graphqls/resolver';
import { TypeDefs } from '../graphqls/typedef';

export class BookPriceController {
  async getBookPriceInfo(query: any): Promise<any> {
    console.log('BookPriceController.getBookPriceInfo start', query);
    return await graphql(buildSchema(TypeDefs), query, Resolver);
  }
}
