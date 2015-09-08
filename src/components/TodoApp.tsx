import * as React from 'react'

import {ENTER_KEY} from 'constants/KeyboardKeys'
import {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS} from 'constants/TodoFilters'

import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'

import * as TodoActions from 'actions/todos'
import {Todo} from 'reducers/todos'

import Utils from 'Utils'

export interface Props {
  actions: typeof TodoActions
  visibilityFilter: string
  todos: Todo[]
}

export interface State {
  nowShowing?: string
  editing?: Todo
}

export default class TodoApp extends React.Component<Props, State> {

  state = {
    nowShowing: ALL_TODOS,
    editing: null
  }

  handleNewTodoKeyDown(event) {

    if (event.keyCode !== ENTER_KEY) {
      return
    }

    event.preventDefault()

    let val = (React.findDOMNode((this.refs as any).newField) as any).value.trim()

    if (val) {
      this.props.actions.addTodo(val)
      var node: any = React.findDOMNode((this.refs as any).newField)
      node.value = ''
    }
  }

  handleFilterTodos(name: string) {
    this.setState({nowShowing: name})
  }

  handleToggleAll(event) {
    let checked = event.target.checked
    this.props.actions.completeAll()
  }

  toggle(todoToToggle: Todo) {
    this.props.actions.completeTodo(todoToToggle)
  }

  destroy(todo: Todo) {
    this.props.actions.deleteTodo(todo)
  }

  edit(todo: Todo) {
    this.setState({editing: todo})
  }

  save(todoToSave: Todo, text) {
    this.props.actions.editTodo(todoToSave, text)
    this.setState({editing: null})
  }

  cancel() {
    this.setState({editing: null})
  }

  handleClearCompleted() {
    this.props.actions.clearCompleted()
  }

  renderFooter() {
    let footer
    let todos = this.props.todos
    let activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1
    }, 0)

    let completedCount = todos.length - activeTodoCount

    if (activeTodoCount || completedCount) {
      footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={this.handleClearCompleted.bind(this)}
          onFilterTodos={this.handleFilterTodos.bind(this)}
        />
    }

    return footer
  }

  renderMain() {
    let main
    let todos = this.props.todos

    let activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1
    }, 0)

    let shownTodos = todos.filter((todo) => {
      switch (this.state.nowShowing) {
      case ACTIVE_TODOS:
        return !todo.completed
      case COMPLETED_TODOS:
        return todo.completed
      default:
        return true
      }
    })

    let todoItems = shownTodos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo}
          onSave={this.save.bind(this, todo)}
          onCancel={this.cancel.bind(this)}
        />
      )
    })

    if (todos.length) {
      main = (
        <section className='main'>
          <input
            className='toggle-all'
            type='checkbox'
            onChange={this.handleToggleAll.bind(this)}
            checked={activeTodoCount === 0}
          />
          <ul className='todo-list'>
            {todoItems}
          </ul>
        </section>
      )
    } else {
      main = <span></span>
    }

    return main
  }

  render() {
    return (
      <div>
        <header className='header'>
          <h1>todos</h1>
          <input
            ref='newField'
            className='new-todo'
            placeholder='What needs to be done?'
            onKeyDown={this.handleNewTodoKeyDown.bind(this)}
            autoFocus={true}
          />
        </header>
        {this.renderMain()}
        {this.renderFooter()}
      </div>
    )
  }
}
