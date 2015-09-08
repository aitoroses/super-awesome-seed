declare var global

import * as axios from 'axios'
import * as React from 'react'

import Utils from '../Utils'

export interface Todo {
  completed: boolean
  id: string
  title: string
}

export default class TodoModel {

  key: string
  todos: Todo[]
  onChanges: Function[]

  constructor(key: string) {
    this.key = key
    this.todos = []
    this.onChanges = []
    this.getAllTodosFromDB()
  }

  getAllTodosFromDB() {
    axios.get<Todo[]>(global.__config__.apiUrl + '/todos')
      .then(({data: body}) => {
        this.todos = body
        this.onChanges.forEach(cb => cb())
      })
  }

  sendAllTodosDB() {
    axios.post(global.__config__.apiUrl + '/todos', this.todos)
  }

  subscribe(onChange: Function) {
    this.onChanges.push(onChange)
  }

  inform() {
    this.sendAllTodosDB()
    this.onChanges.forEach(cb => cb())
  }

  addTodo(title: string) {
    this.todos = this.todos.concat({
      id: Utils.uuid(),
      title: title,
      completed: false
    })

    this.inform()
  }

  toggleAll(checked: boolean) {
    // Note: it's usually better to use immutable data structures since they're
    // easier to reason about and React works very well with them. That's why
    // we use map() and filter() everywhere instead of mutating the array or
    // todo items themselves.
    this.todos = this.todos.map(todo => {
      return Utils.extend({}, todo, {completed: checked})
    })

    this.inform()
  }

  toggle(todoToToggle: Todo) {
    this.todos = this.todos.map(todo => {
      return todo !== todoToToggle ?
        todo :
        Utils.extend({}, todo, {completed: !todo.completed})
    })

    this.inform()
  }

  destroy(todo) {
    this.todos = this.todos.filter(candidate => {
      return candidate !== todo
    })

    this.inform()
  }

  save(todoToSave, text) {
    this.todos = this.todos.map(todo => {
      return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text})
    })

    this.inform()
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => {
      return !todo.completed
    })

    this.inform()
  }
}
