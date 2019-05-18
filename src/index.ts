import invariant from 'invariant'
import { isRegExp } from 'lodash'
/**
 * @func
 * @sig ([[ String | Symbol, (state, action) -> state ]], InitialState) -> (state, action) -> state
 * @param {Array} pairs - A list of [actionType, handler]
 * @param {Any} initialState - the initial state for reducer
 * @return {Function} (state, action) -> state
 * @example reducer.js
 * inspired by RamdaJS function "cond"
 */

type ActionType = RegExp & string
type Action = {
  type: ActionType
}
type Reducer<T> = (state: T, action: Action) => T
type Pair<T> = [ActionType, Reducer<T>]

const createReducer = function<T>(initialState: T, pairs: Pair<T>[]) {
  invariant(
    Array.isArray(pairs),
    'The pairs (first argument) must be a list of [actionType, handler]'
  )
  return function(this: void, state = initialState, action: Action) {
    let idx = 0
    while (idx < pairs.length) {
      const tuple = pairs[idx]
      invariant(
        Array.isArray(tuple),
        'The elemnt of the pairs must be a tuple with action type and handler'
      )
      const type = tuple[0]
      const cond = isRegExp(type)
        ? type.test(action.type)
        : type === action.type

      if (cond) {
        const handler = tuple[1]
        return handler.apply(this, [state, action])
      }
      idx += 1
    }
    return state
  }
}

export default createReducer
