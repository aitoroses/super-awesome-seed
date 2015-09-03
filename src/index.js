import React from 'react'
import Router from 'react-router'

const {Route, RouteHandler, DefaultRoute, NotFoundRoute} = Router

// MainHandler is the main handler of the router
class MainHandler extends React.Component {
  render() {
    return (
      <RouteHandler/>
    )
  }
}

// NoRoute is the notFound handler
class NoRoute extends React.Component {
  render() {
    return (
      <main>
        <h3>Route not found.</h3>
        <a href='#/'>Go to main</a>
      </main>
    )
  }
}

// Import application
import App from 'components/App'

// Define Routes
const routes = (
  <Route handler={MainHandler} path='/'>
    <DefaultRoute handler={App}/>
    <NotFoundRoute handler={NoRoute}/>
  </Route>
)

// Run the app
Router.run(routes, Router.HashLocation, (Handler, state) => {
  React.render(
    <Handler/>,
    document.getElementById('main')
  )
})
