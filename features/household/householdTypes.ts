export type Household = {
  id: string;
  name: string;
  code: string;
}

export type HouseholdCreateDto = {
  name: string;
}

export type HouseholdEditDto = {
  name: string;
}