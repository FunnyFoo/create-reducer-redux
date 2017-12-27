# create-reducer-redux

<p>
  <a href="https://www.npmjs.com/package/@funnyfoo/create-reducer-redux">
    <img src="https://img.shields.io/npm/v/@funnyfoo/create-reducer-redux.svg?style=flat-square" alt="npm version" />
  </a>
  <a href="https://github.com/FunnyFoo/create-reducer-redux/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@funnyfoo/create-reducer-redux.svg?style=flat-square" alt="license" />
  </a>
  <a href="https://david-dm.org/funnyfoo/create-reducer-redux">
    <img src="https://david-dm.org/funnyfoo/create-reducer-redux.svg?style=flat-square" alt="dependencies status" />
  </a>
</p>

A redux reducer generator function

## Install
```bash
npm install --save @funnyfoo/create-reducer-redux
# or
yarn add @funnyfoo/create-reducer-redux
```

## Usage
```js
import createReducer from '@funnyfoo/create-reducer-redux'

const Types = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  ADDITION: 'ADDITION'
}

const increment = function() {
  return {
    type: Types.INCREMENT,
  }
}

const decrement = function() {
  return {
    type: Types.DECREMENT,
  }
}

const addX = function(x) {
  return {
    type: Types.ADDITION,
    payload: x
  }
}

const inc = x => x + 1
const dec = x => x - 1

const initialState = 0

const reducer = createReducer([
  [ Types.INCREMENT, inc ],
  [ Types.DECREMENT, dec ],
  [ Types.ADDITION, (state, action) => state + action.payload ],
], initialState)

reducer(undefined, addX(12))  // => 12
reducer(12, decrement())  // => 11

```

## API

### `createReducer(pairs, initialState)`
Create a redux reducer with the initial state and a list of tuple of action type and handler

#### Arguments
`{Array}` `pairs`: A list of [ `ActionType`, `Handler` ], `Handler` is a function with the two arguments `state`, `action`.

`{Any}` `initialState`: the initial state for the reducer

#### Returns
`{Function}`: returns a function with two arguments `state`, `action`
