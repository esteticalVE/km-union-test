import { combineReducers } from 'redux'
import networkCompaniesReducer from './network-companies/reducer'
import networkStationsReducer from './network-stations/reducer'

export const rootReducer = combineReducers({
  networkCompanies: networkCompaniesReducer,
  networkStations: networkStationsReducer,
})
