import * as request from 'request-promise';

export class WebClient {
  protected async getHtmlDocument(
    url: string,
    encoding: string = 'utf-8'
  ): Promise<string> {
    const htmlstr = await this.getHtmlAsync(url, encoding);
    return htmlstr;
  }

  private async getHtmlAsync(url: string, encoding: string): Promise<string> {
    console.log('getHtmlDocument start', url);
    let enc = encoding;
    if (enc !== 'utf-8') {
      enc = null;
    }
    const option = {
      url: url,
      headers: {
        'content-type': 'text/html'
      },
      encoding: enc
    };
    let res = await request.get(option);
    console.log('getHtmlDocument end');
    return res;
  }
}
