export class HttpService {

  APIBase: string = 'http://localhost:8000/api';

  public resolve = ( data: any ) => {
    console.log('resolved::', data);
    return data;
  }

  public get<T>( url: string ): Promise<T> {

    return new Promise<T>(( resolve, reject ) => {
      fetch(`${this.APIBase}${url}?format=json`)
        .then(( response ) => {
          if (response.ok) {
            resolve(response.json());
          } else {
            reject(response.json());
          }
        });
    });
  }

  /**
   * Same as `get` but doesn't prefix the URL with anything
   * @param {string} url
   * @returns {Promise<T>}
   */
  public getRaw<T>( url: string ): Promise<T> {
    return new Promise<T>(( resolve, reject ) => {
      fetch(url).then(( response ) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject(response.json());
        }
      });
    });
  }
}
