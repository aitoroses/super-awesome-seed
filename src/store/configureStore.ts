// Redux utility functions
import { compose, createStore, applyMiddleware } from 'redux'
import { devTools, persistState } from 'redux-devtools'

import rootReducer from 'reducers/index'

let finalCreateStore

if (__DEV__) { // DEBUG enabled
  finalCreateStore = compose(

    // Provides support for DevTools:
    devTools(),

    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = createStore
}

export default function configureStore(initialState?: any): Redux.Store {
  const store: Redux.Store = finalCreateStore(rootReducer, initialState)

  if (__DEV__ && module.hot) { // React hot development
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
