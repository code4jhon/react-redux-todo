import React from 'react';
import List from './List';

const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

function generateId () {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

function addGoalAction (goal) {
  return {
    type: ADD_GOAL,
    goal,
  }
}

function removeGoalAction (id) {
  return {
    type: REMOVE_GOAL,
    id,
  }
}

class Goals extends React.Component {
  addItem = (e) => {
    e.preventDefault()
    const name = this.input.value
    this.input.value = ''

    this.props.store.dispatch(addGoalAction({
      id: generateId(),
      name,
    }))
  }
  removeItem = (goal) => {
    this.props.store.dispatch(removeGoalAction(goal.id))
  }
  render() {
    return (
      <div>
        <h1>Goals</h1>
        <input
          type='text'
          placeholder='Add Goal'
          ref={(input) => this.input = input}
        />
        <button onClick={this.addItem}>Add Goal</button>

        <List
          items={this.props.goals}
          remove={this.removeItem}
        />
      </div>
    )
  }
}

export default Goals;