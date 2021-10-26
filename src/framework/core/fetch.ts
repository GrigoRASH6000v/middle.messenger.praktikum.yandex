import {utils} from "@/utils/index.ts";
enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Options {
  retries?: number;
  body?: { [key: string]: unknown };
  headers?: { [key: string]: string };
  mode?: string,
  credentials:boolean
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
    url: string ,
    options: { [key: string]: unknown },
    method: string
  ) {
    (this.url = url), (this.options = options), (this.method = method);
  }
  init = () => this.request(this.url, this.options, this.method);
  request(url: string, options: Options, method: string){
    
     return new Promise((resolve, reject) =>{
       if(options && !utils.isEmpty(options) && method==='GET'){
         url+=queryStringify(options.body)
       }
       let xhr = new XMLHttpRequest();
       xhr.open(method, url);
       
      if(options && options.headers){
        xhr = setHeaders(xhr, options.headers)
      }else{
        xhr.setRequestHeader('Content-Type', 'application/json')
      }
      xhr.withCredentials = true
      xhr.addEventListener('load', () => {
        const response = {
          status: xhr.status,
          url: xhr.responseURL,
          data: xhr.response === "OK" ? xhr.response : JSON.parse(xhr.response)
        }
        resolve(response);
      })
      xhr.addEventListener('abort', ()=>{
        console.log('abort')
      });
      xhr.addEventListener('error', ()=>{
        console.log('error')
      });
      xhr.ontimeout = reject;
      if (method === METHODS.GET)
        xhr.send();
       if (method === METHODS.POST || method === METHODS.PUT || method === METHODS.DELETE) {
        if(options && options.body){
          xhr.send(JSON.stringify(options.body));
        }else{
          xhr.send()
        }
      }
    }
  }
}
 const fetchHTTP: { [key: string]: (url: string, options: Options) => Promise<unknown> } = {
  get: (url: string, options?: Options) =>
    new HTTPTransport(url, options, 'GET').init(),
  post: (url: string, options?: Options) =>
  new HTTPTransport(url, options, 'POST').init(),
  delete: (url: string, options?: Options) =>
  new HTTPTransport(url, options, 'DELETE').init(),
  put: (url: string, options?: Options) =>  new HTTPTransport(url, options, 'PUT').init(),
};
export default fetchHTTP
