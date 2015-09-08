import {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS} from '../constants/TodoFilters'

export interface Action {
  type: string
  filter: string
}

export default function visibilityFilter(filter = ALL_TODOS, action?: Action): string {
  switch(action.type) {
    default:
      return filter
  }
}
