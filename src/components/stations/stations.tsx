import React from 'react'
import { Favorite, Station } from '../../store/network-stations/types'
import { findMatch } from '../../utils'
import Loader from '../loader'

type Props = {
  currentCompany: string
  stationsLoading: boolean
  stationsData: Station[]
  favoriteStationsData: Favorite[]
  toggleFavoriteStations: (arg0: Favorite) => void
}

const StationsComponent: React.FC<Props> = props => {
  const {
    stationsLoading,
    stationsData,
    currentCompany,
    favoriteStationsData,
    toggleFavoriteStations,
  } = props

  function checkIsFavorite(name: string, stationId: string): boolean {
    return findMatch(favoriteStationsData, { name, stationId })
  }

  return (
    <div>
      <div className='container__wrapper'>
        {stationsLoading ? (
          <Loader />
        ) : (
          <div className='card-header'>
            <div>
              {stationsData.length ? (
                <>
                  <p className='card__paragraph'>{currentCompany}</p>
                  <p className='card__paragraph'>
                    Всего станций: {stationsData.length}
                  </p>
                </>
              ) : (
                <>
                  <p>{currentCompany}</p>
                  <p>Станций пока нет</p>
                </>
              )}
            </div>
            {stationsData.map(item => {
              return renderCard(item)
            })}
          </div>
        )}
      </div>
    </div>
  )

  function renderCard(item: Station) {
    return (
      <div className='card' key={item.id + item.stationId}>
        <div
          className='card-body'
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <span>{item.stationName}</span>
          <span style={{ color: 'red' }}>
            <i
              className={`${
                checkIsFavorite(item.stationName!, item.stationId)
                  ? 'fas fa-heart'
                  : 'far fa-heart'
              }`}
              onClick={() =>
                toggleFavoriteStations({
                  name: item.stationName || 'Unknown name',
                  stationId: item.stationId,
                })
              }
            />
          </span>
        </div>
      </div>
    )
  }
}

export default StationsComponent
