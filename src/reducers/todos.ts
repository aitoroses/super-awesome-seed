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
    return todos.filter(todo =>
      action.todo !== todo
    )

  case EDIT_TODO:
    return todos.map(todo =>
      todo === action.todo ?
      Utils.extend({}, todo, {title: action.text}) :
      todo
    )

  case COMPLETE_TODO:
    return todos.map(todo =>
      todo === action.todo ?
      Utils.extend({}, todo, {completed: !todo.completed}) :
      todo
    )

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
