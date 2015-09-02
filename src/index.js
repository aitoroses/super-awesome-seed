import React from 'react'
import Router from 'react-router'

const {Route, NotFound} = Router

import App from 'components/App'

const routes = (
  <Route handler={App}></Route>
)

Router.run(routes, (Handler, state) => {
  React.render(
    <Handler/>,
    document.getElementById('main')
  )
})
