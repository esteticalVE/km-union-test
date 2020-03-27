import { Store, createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './rootReducer'
import rootSaga from './rootSagas'

type ReturningStore = Store

export default function storeConfig(): ReturningStore {
  const saga = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(saga)
      // // @ts-ignore
      // window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //   // @ts-ignore
      //   window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
  saga.run(rootSaga)
  return store
}
