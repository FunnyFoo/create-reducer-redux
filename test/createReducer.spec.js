import createReducer from '../'

describe('Utils', () => {
  describe('createReducer', () => {
    it('returns a reducer function with two args, state and action', () => {
      const reducer = createReducer([
        ['inc', state => state + 1],
        ['dec', state => state - 1]
      ], 0)

      const s1 = reducer(undefined, {})
      expect(s1).toEqual(0)
      const s2 = reducer(s1, { type: 'inc' })
      expect(s2).toEqual(1)
    })

    it('throw error when the first argument is not an Array', () => {

      expect(() => createReducer({}, 0)).toThrow()
    })

    it('throw error when the element of the pairs is not a tuple', () => {
      const reducer = createReducer([
        ['inc', state => state + 1]
        ['dec', state => state - 1]
      ], 0)

      expect(() => reducer(undefined, {})).toThrow()
    })
  })
})
