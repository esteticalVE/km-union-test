import { takeEvery, all, fork, put, delay, call } from 'redux-saga/effects'
import {
  Companies,
  CompaniesNetworkData,
  networkCompaniesTypes,
  ResponseCompanies,
} from './types'
import {
  fetchNetworkCompaniesError,
  fetchNetworkCompaniesSuccess,
  hideError,
} from './actions'

function* watcher() {
  yield takeEvery(networkCompaniesTypes.FETCH_COMPANIES_START, worker)
}

function* worker() {
  try {
    const payload = yield call(fetchNetworkCompanies)
    const uniqueData = new Set(
      payload.networks.map((network: CompaniesNetworkData) => {
        return network.company?.toString()
      })
    )

    const filteredArray = Array.from(uniqueData).map(item => {
      return payload.networks.filter(
        (value: CompaniesNetworkData) => item === value.company?.toString()
      )
    })

    const preparedData = filteredArray.map(
      (item: CompaniesNetworkData[], index): Companies => {
        const name = item[0].company?.toString()
        const stations = item.map((station: CompaniesNetworkData): {
          stationId: string
        } => {
          return {
            stationId: station.id,
          }
        })
        return {
          id: index,
          name: name?.length ? name : 'Unknown company',
          stations,
        }
      }
    )
    yield put(fetchNetworkCompaniesSuccess(preparedData))
  } catch (e) {
    console.error(e)
    yield put(fetchNetworkCompaniesError('Что-то пошло не так...'))
    yield delay(4000)
    yield put(hideError())
  }
}

export default function* companies() {
  yield all([fork(watcher)])
}

// При одном и том же запросе, api возвращает разные поля
async function fetchNetworkCompanies(): Promise<ResponseCompanies> {
  const response = await fetch(
    'https://api.citybik.es/v2/networks?fields=id,company',
    {
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
    }
  )
  return await response.json()
}
