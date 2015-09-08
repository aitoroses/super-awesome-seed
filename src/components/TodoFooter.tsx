import {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS} from 'constants/TodoFilters'

import * as React from 'react'
import cx = require("classnames")

import Utils from '../Utils'

export interface Props {
  onFilterTodos: Function
  onClearCompleted: Function
  count: number
  completedCount: number
  nowShowing: string
}

export default class TodoFooter extends React.Component<Props, {}> {

  handleFilterTodos(name) {
    this.props.onFilterTodos(name)
  }

  render() {
    let activeTodoWord = Utils.pluralize(this.props.count, 'item')
    let clearButton = null

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className='clear-completed'
          onClick={this.props.onClearCompleted.bind(this)}>
          Clear completed
        </button>
      )
    }

    // React idiom for shortcutting to `classSet` since it'll be used often
    let nowShowing = this.props.nowShowing
    return (
      <footer className='footer'>
        <span className='todo-count'>
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className='filters'>
          <li>
            <a
              onClick={this.handleFilterTodos.bind(this, ALL_TODOS)}
              className={cx({selected: nowShowing === ALL_TODOS})}>
                All
            </a>
          </li>
          {' '}
          <li>
            <a
              onClick={this.handleFilterTodos.bind(this, ACTIVE_TODOS)}
              className={cx({selected: nowShowing === ACTIVE_TODOS})}>
                Active
            </a>
          </li>
          {' '}
          <li>
            <a
              onClick={this.handleFilterTodos.bind(this, COMPLETED_TODOS)}
              className={cx({selected: nowShowing === COMPLETED_TODOS})}>
                Completed
            </a>
          </li>
        </ul>
        {clearButton}
      </footer>
    )
  }
}
