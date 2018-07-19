export interface BaseModel {

}

/**
 * Response data and model for what a centre at a station looks like
 */
export interface Centre extends BaseModel {
  owner: Company;
}

export interface Company extends BaseModel {
  name: string;
  slug: string;
}
