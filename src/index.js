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
  return function(state = initialState, action, ...rest) {
    let idx = 0
    while (idx < pairs.length) {
      const tuple = pairs[idx]
      invariant(
        Array.isArray(tuple),
        "The elemnt of the pairs must be a tuple with action type and handler"
      )
      const type = tuple[0]
      if (type === action.type) {
        const handler = tuple[1]
        return handler.apply(this, [state, action, ...rest])
      }
      idx += 1
    }
    return state
  }
}

export default createReducer
