export enum networkStationsTypes {
  FETCH_STATIONS_START = 'STATIONS/FETCH_STATIONS_START',
  FETCH_SUCCESS = 'STATIONS/FETCH_SUCCESS',
  TOGGLE_FAVORITES = 'STATIONS/TOGGLE_FAVORITES',
  FETCH_ERROR_SHOW = 'STATIONS/FETCH_ERROR_SHOW',
  FETCH_ERROR_HIDE = 'STATIONS/FETCH_ERROR_HIDE',
}

export type NetworkStationIds = string[] | StationId[]

export type StationNetworkData = {
  empty_slots?: null | number
  extra?: {
    address?: string
    altitude?: number
    status?: number
    uid?: number
  }
  free_bikes?: number
  id: string
  latitude?: number
  longitude?: number
  name?: string
  timestamp?: string
}

export type StationResponse = {
  network: {
    company?: string[]
    href?: string
    id: string
    location: {
      city?: string
      country?: string
      latitude?: number
      longitude?: number
    }
    name?: string
    stations: StationNetworkData[]
  }
}

export type StationId = {
  stationId: string
}

export type Station = {
  id: number
  stationId: string
  stationName?: string
}

export type Favorite = {
  name: string
  stationId: string
}

export type StationsErrors = string | null

export type NetworkStationsState = {
  readonly stations: Station[] | []
  readonly favorites: Favorite[] | []
  readonly loading: boolean
  readonly errors?: StationsErrors
}
