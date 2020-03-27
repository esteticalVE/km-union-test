import { Reducer } from 'redux'
import { NetworkCompaniesState, networkCompaniesTypes } from './types'

const initialState: NetworkCompaniesState = {
  companies: [],
  loading: false,
  errors: null,
}

const networkCompaniesReducer: Reducer<NetworkCompaniesState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case networkCompaniesTypes.FETCH_COMPANIES_START: {
      return { ...state, loading: true }
    }
    case networkCompaniesTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, companies: [...action.payload] }
    }
    case networkCompaniesTypes.FETCH_ERROR_SHOW: {
      return { ...state, loading: false, errors: action.payload }
    }
    case networkCompaniesTypes.FETCH_ERROR_HIDE: {
      return { ...state, errors: null }
    }
    default:
      return state
  }
}

export default networkCompaniesReducer
