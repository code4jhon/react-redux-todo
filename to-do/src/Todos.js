import React from 'react';
import List from './List';

// App Code
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

function generateId () {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

function addTodoAction (todo) {
  return {
    type: ADD_TODO,
    todo,
  }
}

function removeTodoAction (id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toggleTodoAction (id) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

class Todos extends React.Component {
  addItem = (e) => {
    e.preventDefault()
    const name = this.input.value
    this.input.value = ''

    this.props.store.dispatch(addTodoAction({
      name,
      complete: false,
      id: generateId()
    }))
  }
  removeItem = (todo) => {
    this.props.store.dispatch(removeTodoAction(todo.id))
  }
  toggleItem = (id) => {
    this.props.store.dispatch(toggleTodoAction(id))
  }
  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <input
          type='text'
          placeholder='Add Todo'
          ref={(input) => this.input = input}
        />
        <button onClick={this.addItem}>Add Todo</button>

        <List
          toggle={this.toggleItem}
          items={this.props.todos}
          remove={this.removeItem}
        />
      </div>
    )
  }
}

export default Todos;