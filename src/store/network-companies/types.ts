export enum networkCompaniesTypes {
  FETCH_COMPANIES_START = 'COMPANIES/FETCH_COMPANIES_START',
  FETCH_SUCCESS = 'COMPANIES/FETCH_SUCCESS',
  FETCH_ERROR_SHOW = 'COMPANIES/FETCH_ERROR',
  FETCH_ERROR_HIDE = 'FETCH_ERROR_HIDE',
}

type Location = {
  city: string
  country: string
  latitude: number
  longitude: number
}

export type CompaniesNetworkData = {
  company: string[]
  href?: string
  id: string
  location?: Location
  name?: string
}

export type ResponseCompanies = {
  networks: CompaniesNetworkData[]
}

export type Stations = { stationId: string }

export type Companies = {
  id: number
  name: string
  stations: Stations[]
}

export type CompaniesErrors = string | null

export type NetworkCompaniesState = {
  readonly companies: Companies[] | []
  readonly loading: boolean
  readonly errors?: CompaniesErrors
}
