import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// App Code
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

function todos (state = [], action) {
  switch(action.type) {
    case ADD_TODO :
      return state.concat([action.todo])
    case REMOVE_TODO :
      return state.filter((todo) => todo.id !== action.id)
    case TOGGLE_TODO :
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, { complete: !todo.complete }))
    default :
      return state
  }
}

function goals (state = [], action) {
  switch(action.type) {
    case ADD_GOAL :
      return state.concat([action.goal])
    case REMOVE_GOAL :
      return state.filter((goal) => goal.id !== action.id)
    default :
      return state
  }
}

const checker = (store) => (next) => (action) => {
  if (
    action.type === ADD_TODO &&
    action.todo.name.toLowerCase().includes('bitcoin')
  ) {
    return alert("Nope. That's a bad idea.")
  }

  if (
    action.type === ADD_GOAL &&
    action.goal.name.toLowerCase().includes('bitcoin')
  ) {
    return alert("Nope. That's a bad idea.")
  }

  return next(action)
}

const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('The action: ', action)
    const result = next(action)
    console.log('The new state: ', store.getState())
  console.groupEnd()
  return result
}

const store = createStore(combineReducers({
  todos,
  goals,
}), applyMiddleware(checker, logger))

ReactDOM.render(<App store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
