import isEmpty from "../../utils/modules/isEmpty";
enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Options {
  retries?: number;
  data?: { [key: string]: unknown };
  headers?: { [key: string]: string };
}

function queryStringify(data: { [key: string]: string }): string {
  let query = '';
  for (const key in data) {
    if (query) {
      query += '&';
    } else {
      query += '?';
    }
    query += `${key}=${data[key]}`;
  }
  return query;
}

function setHeaders(xhr: XMLHttpRequest, headers: { [key: string]: string }) {
  for (const key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }
  return xhr;
}

class HTTPTransport {
  public url: string;
  public options: { [key: string]: unknown };
  public method: string;
  constructor(
    url: string,
    options: { [key: string]: unknown },
    method: string
  ) {
    (this.url = url), (this.options = options), (this.method = method);
  }
  init = () => this.request(this.url, this.options, this.method);
  request(url: string, options: Options, method: string){
     return new Promise((resolve, reject) =>{
       if(options && !isEmpty(options) && method==='GET'){
         url+=queryStringify(options.data)
       }
       let xhr = new XMLHttpRequest();
       xhr.open(method, url);
      if(options && options.headers) xhr = setHeaders(xhr, options.headers)
      xhr.addEventListener('load', () => {
        resolve(xhr);
      });
      const handleError = (error: unknown) => error;
      xhr.addEventListener('abort', reject);
      xhr.addEventListener('error', handleError);
      xhr.ontimeout = reject;
      if (method === METHODS.GET || method === METHODS.DELETE)
        xhr.send();
       if (method === METHODS.POST || method === METHODS.PUT) {
        if(options && options.data) xhr.send(JSON.stringify(options.data));
      }
    }
  }
}

export const fetchHTTP: { [key: string]: (url: string, options: Options) => Promise<unknown> } = {
  get: (url: string, options: Options) =>
    new HTTPTransport(url, options, 'GET').init(),
  post: (url: string, options: Options) =>
  new HTTPTransport(url, options, 'POST').init(),
  delite: (url: string, options: Options) =>
  new HTTPTransport(url, options, 'DELETE').init(),
  put: (url: string, options: Options) =>  new HTTPTransport(url, options, 'DELETE').init(),
};
