import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Tasky from './Tasky'

class Main extends Component {
  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Tasky} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Main