import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from 'constants/ActionTypes';
import Utils from 'Utils'

export interface Action {
  type: string
  id: TodoID
  text: string
}

export type TodoID = string

export interface Todo {
  completed: boolean
  id: TodoID
  title: string
}

const initialState: Todo[] = [{
  title: 'Use Redux',
  completed: false,
  id: Utils.uuid()
}]

export default function todos(todos = initialState, action?: Action): Todo[] {

  var todo = todos.filter(todo => action.id === todo.id)[0]
  switch(action.type) {
  case ADD_TODO:

    return [{
      id: Utils.uuid(),
      completed: false,
      title: action.text
    }, ...todos]

  case DELETE_TODO:
    var i = todos.indexOf(todo)
    return [
      ...todos.slice(0, i),
      ...todos.slice(i + 1)
    ]

  case EDIT_TODO:
    var i = todos.indexOf(todo)
    return [
      ...todos.slice(0, i),
      Utils.extend({}, todo, {title: action.text}),
      ...todos.slice(i + 1)
    ]

  case COMPLETE_TODO:
    var i = todos.indexOf(todo)
    var result = [
      ...todos.slice(0, i),
      Utils.extend({}, todo, {completed: !todo.completed}),
      ...todos.slice(i + 1)
    ]

    return result

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
