import { Favorite } from '../store/network-stations/types'

export function toggleFavorites(
  state: Favorite[],
  favorite: Favorite
): Favorite[] {
  if (findMatch(state, favorite)) {
    return [
      ...state.filter(
        item =>
          item.name !== favorite.name && item.stationId !== favorite.stationId
      ),
    ]
  } else {
    return [...state, favorite]
  }
}

export function findMatch(state: Favorite[], finding: Favorite): boolean {
  const isMatch = state.find(
    item => item.name === finding.name && item.stationId === finding.stationId
  )
  return !!isMatch
}
