import * as types from 'constants/ActionTypes';
import {Todo, TodoID} from '../reducers/todos'

export function addTodo(text) {
  return { type: types.ADD_TODO, text };
}

export function deleteTodo(id: TodoID) {
  return { type: types.DELETE_TODO, id };
}

export function editTodo(id: TodoID, text) {
  return { type: types.EDIT_TODO, id, text };
}

export function completeTodo(id: TodoID) {
  return { type: types.COMPLETE_TODO, id };
}

export function completeAll() {
  return { type: types.COMPLETE_ALL };
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED };
}
