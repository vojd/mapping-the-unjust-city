export class HttpService {

  APIBase: string = 'http://localhost:8000/api';

  public resolve = (data: any) => {
    console.log('resolved::', data);

    return data;
  }

  public get<T>(url: string): Promise<T> {

    const promise = new Promise<T>(this.resolve);

    fetch(`${this.APIBase}${url}?format=json`)
      .then((response) => {
        this.resolve(response.json());
      });

    return promise;
  }
}
