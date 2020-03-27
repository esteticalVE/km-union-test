import { all, fork } from 'redux-saga/effects'
import companies from './network-companies/sagas'
import stations from './network-stations/sagas'

export default function* rootSaga() {
  yield all([fork(companies), fork(stations)])
}
