import * as React from 'react'
import * as Router from 'react-router'

const {Route, RouteHandler, DefaultRoute, NotFoundRoute} = Router

// Import application handlers
import MainHandler from 'components/MainHandler';
import NotFound from 'components/NotFound'
import TodoApp from 'components/TodoWrap'

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
    <Handler/>,
    document.getElementById('main')
  )
})
