import { HttpService } from './HttpService';

export class APIService extends HttpService {

  httpService: HttpService = new HttpService();

  public getCompanyBySlug<CompanyInformation>( slug: string ): Promise<CompanyInformation> {
    return this.httpService.get(`/company/${slug}`);
  }

  public getCentreBySlug<Centre>( slug: string ): Promise<Centre> {
    return this.httpService.get(`/centre/${this.slugify(slug)}`);
  }

  /**
   * Fetch all the centre information with its related owners and tags
   * @returns {Promise<Centre[]>}
   */
  public getMapData<Centre>(): Promise<Centre[]> {
    return this.httpService.get(`/centre/`);
  }

  public slugify = ( slug: string ): string => {
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
