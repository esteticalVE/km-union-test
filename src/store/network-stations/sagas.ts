import { all, call, put, fork, takeEvery, delay } from 'redux-saga/effects'
import {
  networkStationsTypes,
  StationNetworkData,
  StationId,
  StationResponse,
  Station,
} from './types'
import {
  fetchNetworkStationsError,
  fetchNetworkStationsSuccess,
  hideError,
} from './actions'

function* watcher() {
  yield takeEvery(networkStationsTypes.FETCH_STATIONS_START, worker)
}

function* worker({
  payload,
}: {
  payload: Station[]
  type: typeof networkStationsTypes
}) {
  try {
    const responses = yield call(fetchNetworkStations, payload)
    const nonFilteredStationsData = yield call(mapStations, responses)
    const preparedData = yield call(prepareStations, nonFilteredStationsData)
    yield put(fetchNetworkStationsSuccess(preparedData))
  } catch (e) {
    console.error(e)
    yield put(fetchNetworkStationsError('Что-то пошло не так...'))
    yield delay(4000)
    yield put(hideError())
  }
}

export default function* stations() {
  yield all([fork(watcher)])
}

async function prepareStations(arr: StationNetworkData[]) {
  return arr.map((item, id) => {
    return {
      id,
      stationId: item.id,
      stationName: item.name,
    }
  })
}

async function mapStations(arr: { status: string; value: Response }[]) {
  const responses = arr.map(item => item.value)
  const stations: StationNetworkData[] = []

  const mappedPromises = Promise.all(
    responses.map((res: Response) => res.json())
  )

  await mappedPromises.then(response =>
    response.forEach((item: StationResponse) => {
      item.network.stations &&
        item.network.stations.forEach(item => {
          stations.push(item)
        })
    })
  )
  return stations
}

async function fetchNetworkStations(arr: StationId[]): Promise<Response> {
  //@ts-ignore
  return await Promise.allSettled(
    arr.map(async ({ stationId }) => {
      return await fetch(`https://api.citybik.es/v2/networks/${stationId}`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
        },
      })
    })
  )
}
