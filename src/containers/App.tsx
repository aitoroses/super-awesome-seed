import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TodoApp from 'components/TodoApp'

import {Todo} from '../reducers/todos'
import * as TodoActions from '../actions/todos'
import * as FilterActions from 'actions/visibilityFilters'


export interface Props {
  todos: Array<Todo>
  visibilityFilter: string
  dispatch: Redux.Dispatch
}

function mapStateToProps(state: Props) {
  return {
    todos: state.todos,
    visibilityFilter: state.visibilityFilter
  }
}

@connect(mapStateToProps)
export class TodoContainer extends React.Component<Props, any> {

  render() {
    const {todos, visibilityFilter, dispatch} = this.props
    const actions = bindActionCreators(TodoActions, dispatch)
    const filterActions = bindActionCreators(FilterActions, dispatch)

    return (
      <div className='todoapp'>
        <TodoApp
          todos={todos}
          actions={actions}
          filterActions={filterActions}
          visibilityFilter={visibilityFilter}
        />
      </div>
    )
  }
}

export default TodoContainer
