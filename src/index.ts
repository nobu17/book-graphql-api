import * as lambda from 'aws-lambda';
import { BookPriceController } from './controllers/book-price-controller';

const controller = new BookPriceController();

export const handler = async (
  event: any,
  context: lambda.Context,
  callback: lambda.Callback
) => {
  const response = await controller.getBookPriceInfo(event.query);
  console.log('response', response);
  callback(null, response);
};
