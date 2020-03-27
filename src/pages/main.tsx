import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNetworkCompanies } from '../store/network-companies/actions'
import {
  fetchNetworkStations,
  toggleFavorites,
} from '../store/network-stations/actions'
import { NetworkCompaniesState } from '../store/network-companies/types'
import {
  Favorite,
  NetworkStationsState,
  NetworkStationIds,
} from '../store/network-stations/types'
import CompaniesComponent from '../components/companies'
import StationsComponent from '../components/stations'
import AlertComponent from '../components/alert'

const MainPage: React.FC = () => {
  const dispatch = useDispatch()
  const [currentCompany, setCurrentCompany] = useState<string>('')

  const {
    companies: companiesData,
    loading: companiesLoading,
    errors: companiesErrors,
  } = useSelector(
    (state: { networkCompanies: NetworkCompaniesState }) =>
      state.networkCompanies
  )

  const {
    stations: stationsData,
    favorites: favoriteStationsData,
    loading: stationsLoading,
    errors: stationsErrors,
  } = useSelector(
    (state: { networkStations: NetworkStationsState }) => state.networkStations
  )

  const fetchCompanies = useCallback((): void => {
    dispatch(fetchNetworkCompanies())
  }, [dispatch])

  const fetchStations = useCallback(
    (arg0: NetworkStationIds): void => {
      dispatch(fetchNetworkStations(arg0))
    },
    [dispatch]
  )

  const toggleFavoriteStations = useCallback(
    (arg0: Favorite): void => {
      dispatch(toggleFavorites(arg0))
    },
    [dispatch]
  )

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])

  useEffect(() => {
    companiesData.length && fetchStations(companiesData[0].stations)
  }, [companiesData, fetchStations])

  return (
    <div className='container pt-3'>
      <div className='row'>
        <div className='col'>
          <h2>Компании</h2>
          {companiesErrors && <AlertComponent text={companiesErrors} />}
          <CompaniesComponent
            companiesData={companiesData}
            fetchStations={fetchStations}
            companiesLoading={companiesLoading}
            setCurrentCompany={setCurrentCompany}
          />
        </div>
        <div className='col'>
          <h2>Станции</h2>
          {stationsErrors && <AlertComponent text={stationsErrors} />}
          <StationsComponent
            stationsData={stationsData}
            favoriteStationsData={favoriteStationsData}
            stationsLoading={stationsLoading}
            currentCompany={currentCompany}
            toggleFavoriteStations={toggleFavoriteStations}
          />
        </div>
      </div>
    </div>
  )
}

export default MainPage
