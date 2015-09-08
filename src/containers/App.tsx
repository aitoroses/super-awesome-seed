import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TodoApp from 'components/TodoApp'

import {Todo} from '../reducers/todos'
import * as TodoActions from '../actions/todos'

export interface Props {
  todos: Array<any>
  visibilityFilter: string
  dispatch: Redux.Dispatch
}

function mapStateToProps(state: Props) {
  return {
    todos: state.todos,
    visibilyFilter: state.visibilityFilter
  }
}

@connect(mapStateToProps)
export class TodoContainer extends React.Component<Props, any> {

  render() {

    const {todos, visibilityFilter, dispatch} = this.props
    const actions = bindActionCreators(TodoActions, dispatch)

    return (
      <div className='todoapp'>
        <TodoApp
          todos={todos}
          actions={actions}
          visibilityFilter={visibilityFilter}
        />
      </div>
    )
  }
}

export default TodoContainer
