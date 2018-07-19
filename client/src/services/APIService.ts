import { HttpService } from './HttpService';

export class APIService extends HttpService {

  httpService: HttpService = new HttpService();

  public getCompanyBySlug<CompanyInformation>(slug: string): Promise<CompanyInformation> {
    return this.httpService.get(`/company/${slug}`);
  }

  public getCentreBySlug<Centre>(slug: string): Promise<Centre> {
    return this.httpService.get(`/centre/${this.sluggify(slug)}`);
  }

  public sluggify = (slug: string): string => {
    return slug
      .toLocaleLowerCase()
      .trim()
      .replace(/å/g, 'a')
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/ /g, '-')
      .replace(/[^\w_-]+/g, '');
  }
}
