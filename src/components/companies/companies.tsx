import React, { useEffect } from 'react'
import { Companies, Stations } from '../../store/network-companies/types'
import Loader from '../loader'

type Props = {
  companiesData: Companies[]
  fetchStations: (arg0: Stations[]) => void
  setCurrentCompany: (arg0: string) => void
  companiesLoading: boolean
}

const CompaniesComponent: React.FC<Props> = props => {
  const {
    companiesData,
    fetchStations,
    companiesLoading,
    setCurrentCompany,
  } = props

  useEffect(() => {
    if (companiesData.length) {
      setCurrentCompany(companiesData[0].name)
    }
  }, [companiesData, setCurrentCompany])

  function handleStations(name: string, stations: Stations[]): void {
    fetchStations(stations)
    setCurrentCompany(name)
  }

  return (
    <div className='container__wrapper'>
      {companiesLoading ? (
        <Loader />
      ) : (
        companiesData.map((company, index) => {
          const { id, name, stations } = company
          return (
            <div className='card' key={`${index} + (${id})`}>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link'
                  type='button'
                  onClick={(): void => handleStations(name, stations)}
                >
                  {name}
                </button>
              </h2>
            </div>
          )
        })
      )}
    </div>
  )
}

export default CompaniesComponent
