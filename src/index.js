import invariant from "invariant"
/**
 * @func
 * @sig ([[ String | Symbol, (state, action) -> state ]], InitialState) -> (state, action) -> state
 * @param {Array} pairs - A list of [actionType, handler]
 * @param {Any} initialState - the initial state for reducer
 * @return {Function} (state, action) -> state
 * @example reducer.js
 * inspired by RamdaJS function "cond"
 */

const createReducer = function(pairs, initialState) {
  invariant(
    Array.isArray(pairs),
    "The pairs (first argument) must be a list of [actionType, handler]"
  )
  return function(state = initialState, action) {
    let idx = 0
    while (idx < pairs.length) {
      const type = pairs[idx][0]
      if (type === action.type) {
        return pairs[idx][1].apply(this, [state, action])
      }
      idx += 1
    }
    return state
  }
}

export default createReducer
