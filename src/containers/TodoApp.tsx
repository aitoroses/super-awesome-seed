import * as React from 'react'

import TodoApp from 'components/TodoApp'
import TodoModel from 'model/TodoModel'

var model = new TodoModel('react-todos')

class TodoWrap extends React.Component<any, any> {

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
