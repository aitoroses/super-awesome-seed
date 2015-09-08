import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from 'constants/ActionTypes';
import Utils from 'Utils'

export interface Action {
  type: string
  todo: Todo
  text: string
}

export interface Todo {
  completed: boolean
  id: string
  title: string
}

const initialState: Todo[] = [{
  title: 'Use Redux',
  completed: false,
  id: Utils.uuid()
}]

export default function todos(todos = initialState, action?: Action): Todo[] {

  switch(action.type) {
  case ADD_TODO:
    return [{
      id: Utils.uuid(),
      completed: false,
      title: action.text
    }, ...todos]

  case DELETE_TODO:
    var i = todos.indexOf(action.todo)
    return [
      ...todos.slice(0, i),
      ...todos.slice(i + 1)
    ]

  case EDIT_TODO:
    var i = todos.indexOf(action.todo)
    return [
      ...todos.slice(0, i),
      Utils.extend({}, action.todo, {title: action.text}),
      ...todos.slice(i + 1)
    ]

  case COMPLETE_TODO:
    var i = todos.indexOf(action.todo)
    return [
      ...todos.slice(0, i),
      Utils.extend({}, action.todo, {completed: !action.todo.completed}),
      ...todos.slice(i + 1)
    ]

  case COMPLETE_ALL:
    const areAllMarked: boolean = todos.every(todo => todo.completed)
    return todos.map(todo =>
      Utils.extend({}, todo, {completed: !areAllMarked})
    )

  case CLEAR_COMPLETED:
    return todos.filter(todo => todo.completed === false)

  default:
    return todos
  }
}
