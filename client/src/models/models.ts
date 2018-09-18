export interface BaseModel {

}

/**
 * Response data and model for what a centre at a station looks like
 */
export class Company implements BaseModel {
  constructor(public name: string,
              public slug: string,
              public description: string,
              public centres: URL[],
              public documents: URL[]) {
  }
}

export class Centre implements BaseModel {

  constructor(public name: string,
              public slug: string,
              public description: string,
              public status: number,
              public owner: Company | null) {
  }
}

export interface CompanyResponse {
  name: string;
  slug: string;
  description: string;
  centres: URL[];
  documents: URL[];
}

export interface CentreResponse {
  name: string;
  slug: string;
  description: string;
  status: number;
  owner: CompanyResponse;
  documents: string[];
}

export const createCompany = (companyResponse: CompanyResponse | null) => {
  if (!companyResponse) {
    return null;
  }

  return new Company(
    companyResponse.name,
    companyResponse.slug,
    companyResponse.description,
    companyResponse.centres,
    companyResponse.documents
  );
};

export const createCentre = (centreResponse: CentreResponse): Centre => {

  const company = createCompany(centreResponse.owner);
  return new Centre(
    centreResponse.name,
    centreResponse.slug,
    centreResponse.description,
    centreResponse.status,
    company
  );
};
