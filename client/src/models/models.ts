export interface BaseModel {

}

export class MapData implements BaseModel {

}

/**
 * Response data and model for what a centre at a station looks like
 */
export class Company implements BaseModel {
  constructor( public name: string,
               public slug: string,
               public description: string,
               public centres: URL[],
               public documents: URL[] ) {
  }
}

export class HistoricalOwner {
  name: string;
  year: string;
  price: string;
  currency: string;
}

/*
* Response data, converted into a MapNodeTag in react
 */
export class Tag implements BaseModel {
  name: string;
  isActive: boolean;
}

export interface ImageURL {
  image: string;
}

export class Centre implements BaseModel {

  constructor( public name: string,
               public slug: string,
               public description: string,
               public status: number,
               public owner: Company | null,
               public historicalOwners: HistoricalOwner[],
               public tags: Tag[],
               public images: ImageURL[] ) {
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
  historicalOwners: HistoricalOwner[];
}

export const createCompany = ( companyResponse: CompanyResponse | null ) => {
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
