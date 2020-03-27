import { Reducer } from 'redux'
import { NetworkStationsState, networkStationsTypes } from './types'
import { toggleFavorites } from '../../utils'

const initialState: NetworkStationsState = {
  stations: [],
  favorites: [],
  loading: false,
  errors: null,
}

const networkStationsReducer: Reducer<NetworkStationsState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case networkStationsTypes.FETCH_STATIONS_START: {
      return { ...state, loading: true }
    }
    case networkStationsTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, stations: [...action.payload] }
    }
    case networkStationsTypes.TOGGLE_FAVORITES: {
      return {
        ...state,
        favorites: toggleFavorites(state.favorites, action.payload),
      }
    }
    case networkStationsTypes.FETCH_ERROR_SHOW: {
      return {
        ...state,
        loading: false,
        errors: action.payload,
      }
    }
    case networkStationsTypes.FETCH_ERROR_HIDE: {
      return { ...state, errors: null }
    }

    default:
      return state
  }
}

export default networkStationsReducer
