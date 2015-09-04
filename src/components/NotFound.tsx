import * as React from 'react'

class NoRouteFound extends React.Component<any, any> {
  render() {
    return (
      <main>
        <h3>Route not found.</h3>
        <a href='#/'>Go to main</a>
      </main>
    )
  }
}

export default NoRouteFound
