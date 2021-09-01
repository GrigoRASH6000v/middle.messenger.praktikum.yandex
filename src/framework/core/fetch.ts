enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Options {
  retries?: number;
  method?: METHODS;
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
  get = (url: string, options: Options) =>
    this.request(url, { ...options, method: METHODS.GET });

  post = (url: string, options: Options) => {
    options = options.headers
      ? options
      : {
          data: options,
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        };
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put = (url: string, options: Options) => {
    options = options.headers
      ? options
      : {
          data: options,
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        };
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete = (url: string, options: Options) => {
    options = options.headers
      ? options
      : {
          data: options,
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        };
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (url: string, options: Options) =>
    new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      url =
        options.method === METHODS.GET
          ? options.data
            ? (url += queryStringify(options.data))
            : url
          : url;
      xhr.open(options.method, url);
      xhr = setHeaders(xhr, options.headers);
      xhr.addEventListener('load', () => {
        resolve(xhr);
      });
      const handleError = (error: object) => {
        console.error(error);
      };
      xhr.addEventListener('abort', reject);
      xhr.addEventListener('error', handleError);
      xhr.ontimeout = reject;
      if (options.method === METHODS.GET || options.method === METHODS.DELETE)
        xhr.send();
      if (options.method === METHODS.POST || options.method === METHODS.PUT) {
        xhr.send(JSON.stringify(options.data));
      }
    });
}

export const fetchHTTP: { [key: string]: () => unknown } = {
  get: (url: string, options: Options) =>
    new HTTPTransport().get(url, options).then((res) => res),
  post: (url: string, options: Options) =>
    new HTTPTransport().post(url, options).then((res) => res),
  delite: (url: string, options: Options) =>
    new HTTPTransport().delete(url, options).then((res) => res),
  put: (url: string, options: Options) =>
    new HTTPTransport().put(url, options).then((res) => res),
};
