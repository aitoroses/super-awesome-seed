import * as types from 'constants/ActionTypes';
import {Filter} from '../constants/TodoFilters';

export function setFilter(filter: Filter) {
  return { type: types.SET_FILTER, filter: filter };
}
