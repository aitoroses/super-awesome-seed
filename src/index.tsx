import * as React from 'react'
import * as Router from 'react-router'
import { Provider } from 'react-redux'

const {Route, RouteHandler, DefaultRoute, NotFoundRoute} = Router

// Import application handlers
import MainHandler from 'components/MainHandler';
import NotFound from 'components/NotFound'

// Import Todo Container
import TodoApp from 'containers/App'
import configureStore from 'store/configureStore';

const store = configureStore()

// Define Routes
const routes = (
  <Route handler={MainHandler} path='/'>
    <DefaultRoute handler={TodoApp}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
)

// Run the app
Router.run(routes, Router.HashLocation, (Handler, state) => {
  React.render(
    <Provider store={store}>
      {() => <Handler/>}
    </Provider>,
    document.getElementById('root')
  )
})
