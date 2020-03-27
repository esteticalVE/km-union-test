import {
  Favorite,
  Station,
  networkStationsTypes,
  NetworkStationIds,
} from './types'

export function fetchNetworkStations(
  ids: NetworkStationIds
): {
  type: networkStationsTypes
  payload: NetworkStationIds
} {
  return {
    type: networkStationsTypes.FETCH_STATIONS_START,
    payload: ids,
  }
}

export function fetchNetworkStationsSuccess(
  data: Station[]
): { type: networkStationsTypes; payload: Station[] } {
  return {
    type: networkStationsTypes.FETCH_SUCCESS,
    payload: data,
  }
}

export function toggleFavorites(
  favorite: Favorite
): { type: networkStationsTypes; payload: Favorite } {
  return {
    type: networkStationsTypes.TOGGLE_FAVORITES,
    payload: favorite,
  }
}

export function fetchNetworkStationsError(
  data: string
): {
  type: networkStationsTypes
  payload: string
} {
  return {
    type: networkStationsTypes.FETCH_ERROR_SHOW,
    payload: data,
  }
}

export function hideError() {
  return {
    type: networkStationsTypes.FETCH_ERROR_HIDE,
  }
}
