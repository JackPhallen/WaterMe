/*
 * action types
 */

export const ADD_PLANT = 'ADD_PLANT'
export const WATER_PLANT = 'WATER_PLANT'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_WATERED: 'SHOW_WATERED',
  SHOW_NOT_WATERED: 'SHOW_NOT_WATERED'
}

/*
 * action creators
 */

export function addPlant(text) {
  return { type: ADD_PLANT, text }
}

export function waterPlant(index) {
  return { type: WATER_PLANT, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}