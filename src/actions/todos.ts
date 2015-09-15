import * as types from 'constants/ActionTypes';
import {Todo, TodoID} from '../reducers/todos'

/**
 * @module TodoActions - ActionCreator module for todo actionTypes
 */

/**
 * @typedef {Object} Action
 * @property {string} type   - Action type
 * @property {string} [text] - Todo text
 * @property {TodoID} [id]   - Todo Identifier
 */

/**
 * Add a new todo
 * @param  {string} text - The text of the new Todo
 * @return {Action}      - Todo add action object
 */
export function addTodo(text) {
  return { type: types.ADD_TODO, text };
}

/**
 * Delete a todo by its ID
 * @param  {TodoID} id - Todo Identifier
 * @return {Action}    - Todo delete action object
 */
export function deleteTodo(id: TodoID) {
  return { type: types.DELETE_TODO, id };
}

/**
 * Edit a todo by its ID
 * @param  {TodoID} id - Todo Identifier
 * @return {Action}    - Todo edit action object
 */
export function editTodo(id: TodoID, text) {
  return { type: types.EDIT_TODO, id, text };
}

/**
 * Complete a todo by its ID
 * @param  {TodoID} id - Todo Identifier
 * @return {Action}    - Todo complete action object
 */
export function completeTodo(id: TodoID) {
  return { type: types.COMPLETE_TODO, id };
}

/**
 * Complete all todos
 * @return {Action}    - Todo complete all action object
 */
export function completeAll() {
  return { type: types.COMPLETE_ALL };
}

/**
 * Clear completed todos
 * @return {Action}    - Todo complete all action object
 */
export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED };
}
