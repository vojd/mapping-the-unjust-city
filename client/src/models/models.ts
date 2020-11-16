export interface BaseModel {

}

/**
 * Response data and model for what a centre at a station looks like
 */
export class Company implements BaseModel {
  constructor( public name: string,
               public slug: string,
               public description: string,
               public descriptionEn: string,
               public ownershipDescription: string,
               public ownershipDescriptionEn: string,
               public centres: URL[],
               public documents: URL[] ) {
  }
}

export class HistoricalOwner {
  company: Company;
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

export interface CentreDocument {

}

export interface Centre {

  name: string;
  slug: string;
  description: string;
  descriptionEn: string;
  ownershipDescription: string;
  ownershipDescriptionEn: string;
  status: number;
  owner: Company | null;
  historicalOwners: HistoricalOwner[];
  tags: Tag[];
  images: ImageURL[];
  documents: string[]; // array of URLs
  sold: string;
  private: boolean;
  ownershipType: string;
}

export interface CompanyResponse {
  name: string;
  slug: string;
  description: string;
  descriptionEn: string;
  centres: URL[];
  documents: URL[];
  ownershipDescription: string;
  ownershipDescriptionEn: string;
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
    companyResponse.descriptionEn,
    companyResponse.ownershipDescription,
    companyResponse.ownershipDescriptionEn,
    companyResponse.centres,
    companyResponse.documents,

  );
};
