export interface ListNecoCompaniesVariables {
  filter?: TableNecoCompanyFilterInput;
  limit?: number;
  nextToken?: string;
}

export interface ListNecoCompaniesResponse {

    items: NecoCompany[];
    nextToken?: string;
}

export interface NecoCompany {
  futureDays?: number;
  futureReleaseTime?: string;
  compName?: string;
  env?: string;
  description?: string;
  id: string;
  compLogoUrl?: string;
  compImageUrl?: string;
  liffID?: string;
  theme?: string;
  __typename?: string;
}

export interface TableNecoCompanyFilterInput {
  // Define filter input fields based on your GraphQL schema
  // For example:
  compName?: { eq?: string };
  // Add other filter fields as needed
}