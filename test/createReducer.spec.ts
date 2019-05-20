import createReducer from '../src'

describe('Utils', () => {
  describe('createReducer', () => {
    it('returns a reducer function with two args, state and action', () => {
      const reducer = createReducer<number>(0, [
        ['inc', state => state + 1],
        ['dec', state => state - 1]
      ])

      const s1 = reducer(undefined, { type: 'initial' })
      expect(s1).toEqual(0)
      const s2 = reducer(s1, { type: 'inc' })
      expect(s2).toEqual(1)
    })

    it('accept a regular expression argument in each case', () => {
      const reducer = createReducer<number>(0, [
        [/inc/, state => state + 1],
        [/dec/, state => state - 1]
      ])

      const s1 = reducer(undefined, { type: 'initial' })
      expect(s1).toEqual(0)
      const s2 = reducer(s1, { type: 'increment' })
      expect(s2).toEqual(1)
      const s3 = reducer(s1, { type: 'decrement' })
      expect(s3).toEqual(-1)
    })
  })
})
