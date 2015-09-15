import * as React from 'react'

import {ENTER_KEY} from 'constants/KeyboardKeys'
import {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS} from 'constants/TodoFilters'

import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'

import * as TodoActions from 'actions/todos'
import {Todo, TodoID} from 'reducers/todos'

import * as FilterActions from 'actions/visibilityFilters'


import Utils from 'Utils'

export interface Props {
  actions: typeof TodoActions
  filterActions: typeof FilterActions
  visibilityFilter: string
  todos: Todo[]
}

export interface State {
  nowShowing?: string
  editing?: TodoID
}

export default class TodoApp extends React.Component<Props, State> {

  state = {
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

  handleFilterTodos(filter: string) {
    this.props.filterActions.setFilter(filter)
  }

  handleToggleAll(event) {
    let checked = event.target.checked
    this.props.actions.completeAll()
  }

  toggle(todoToToggle: TodoID) {
    this.props.actions.completeTodo(todoToToggle)
  }

  destroy(todo: TodoID) {
    this.props.actions.deleteTodo(todo)
  }

  edit(todo: TodoID) {
    this.setState({editing: todo})
  }

  save(todoToSave: TodoID, text) {
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
          nowShowing={this.props.visibilityFilter}
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
      switch (this.props.visibilityFilter) {
      case ACTIVE_TODOS:
        return !todo.completed
      case COMPLETED_TODOS:
        return todo.completed
      default:
        return true
      }
    })

    let todoItems = shownTodos.map(todo => {
      let id: TodoID = todo.id
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, id)}
          onDestroy={this.destroy.bind(this, id)}
          onEdit={this.edit.bind(this, id)}
          editing={this.state.editing === id}
          onSave={this.save.bind(this, id)}
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
