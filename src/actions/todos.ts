import * as types from 'constants/ActionTypes';
import {Todo} from '../reducers/todos'

export function addTodo(text) {
  return { type: types.ADD_TODO, text };
}

export function deleteTodo(todo: Todo) {
  return { type: types.DELETE_TODO, todo };
}

export function editTodo(todo: Todo, text) {
  return { type: types.EDIT_TODO, todo, text };
}

export function completeTodo(todo: Todo) {
  return { type: types.COMPLETE_TODO, todo };
}

export function completeAll() {
  return { type: types.COMPLETE_ALL };
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED };
}
