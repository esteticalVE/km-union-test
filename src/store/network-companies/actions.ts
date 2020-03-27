import { networkCompaniesTypes, Companies } from './types'

export function fetchNetworkCompanies(): { type: networkCompaniesTypes } {
  return {
    type: networkCompaniesTypes.FETCH_COMPANIES_START,
  }
}

export function fetchNetworkCompaniesSuccess(
  data: Companies[]
): { type: networkCompaniesTypes; payload: Companies[] } {
  return {
    type: networkCompaniesTypes.FETCH_SUCCESS,
    payload: data,
  }
}

export function fetchNetworkCompaniesError(
  data: string
): {
  type: networkCompaniesTypes
  payload: string
} {
  return {
    type: networkCompaniesTypes.FETCH_ERROR_SHOW,
    payload: data,
  }
}

export function hideError() {
  return {
    type: networkCompaniesTypes.FETCH_ERROR_HIDE,
  }
}
