import React, { Component } from 'react';
import Redux from 'redux';

import Todos from './Todos';
import Goals from './Goals';

class App extends Component {
  componentDidMount () {
    const { store } = this.props

    store.subscribe(() => this.forceUpdate())
  }
  render() {
    const { store } = this.props
    const { todos, goals } = store.getState()

    return (
      <div>
        <Todos todos={todos} store={this.props.store} />
        <Goals goals={goals} store={this.props.store} />
      </div>
    )
  }
}

export default App;
