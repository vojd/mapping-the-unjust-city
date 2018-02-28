import { CentreInformation } from '../models/models';

const mockData: CentreInformation = {
  'owner': 'Corporation Corp',
};

const getData: any = () => mockData;

export class HttpService {

  public get<T>(param: string): Promise<T> {
    console.log(param);

    return new Promise<T>((resolve, reject) => {
      resolve(<T> getData());
    });
  }
}
