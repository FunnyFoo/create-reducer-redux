# create-reducer-redux

[![build status](https://img.shields.io/circleci/project/github/FunnyFoo/create-reducer-redux.svg?style=flat-square)](https://circleci.com/gh/FunnyFoo/create-reducer-redux)
[![npm version](https://img.shields.io/npm/v/@funnyfoo/create-reducer-redux.svg?style=flat-square)](https://www.npmjs.com/package/@funnyfoo/create-reducer-redux)
[![license](https://img.shields.io/npm/l/@funnyfoo/create-reducer-redux.svg?style=flat-square)](https://github.com/FunnyFoo/create-reducer-redux/blob/master/LICENSE)
[![dependencies status](https://david-dm.org/funnyfoo/create-reducer-redux.svg?style=flat-square)](https://david-dm.org/funnyfoo/create-reducer-redux)

A redux reducer using the tuple like `[ type, handler ]` instead of `switch` statement.

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

let state;
state = reducer(state, addX(12))  // => 12
state = reducer(state, decrement())  // => 11
state = reducer(state, { type: 'other' })  // => 11

```

## API

### `createReducer(pairs, initialState)`
Create a redux reducer with the initial state and a list of tuple of action type and handler

#### Arguments
`{Array}` `pairs`: A list of [ `ActionType`, `Handler` ], `Handler` is a function with the two arguments `state`, `action`.

`{Any}` `initialState`: the initial state for the reducer

#### Returns
`{Function}`: returns a function with two arguments `state`, `action`
