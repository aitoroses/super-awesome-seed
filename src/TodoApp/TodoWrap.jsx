import * as React from 'react'

import TodoApp from './TodoApp'
import TodoModel from './TodoModel'

var model = new TodoModel('react-todos')

class TodoWrap extends React.Component {

  componentDidMount() {
    model.subscribe(this.forceUpdate.bind(this))
  }

  render() {
    return (
      <div className='todoapp'>
        <TodoApp model={model}/>

      </div>
    )
  }
}

export default TodoWrap
