import {createStore} from 'redux'
import rootReducer from 'reducers/index'

export default function configureStore(initialState?: any): Redux.Store {
  const store: Redux.Store = createStore(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
