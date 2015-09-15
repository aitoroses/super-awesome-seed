import {Filter, ALL_TODOS} from '../constants/TodoFilters'
import {SET_FILTER} from '../constants/ActionTypes';

export interface Action {
  type: string
  filter: Filter
}

export default function visibilityFilter(filter = ALL_TODOS, action?: Action): string {
  switch(action.type) {
    case SET_FILTER:
      return action.filter

    default:
      return filter
  }
}
