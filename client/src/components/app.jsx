import React, { Component } from 'react';
import Login from './Login.jsx';
import Cohorts from './Cohorts.jsx'
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: true,
      cohortPage: true,
      studentsPage: false
    }
    this.hundleLogin = this.hundleLogin.bind(this)
  }

  hundleLogin(user) {
    console.log(user)
  }


  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div >
          <Login login={this.hundleLogin} />
        </div>
      )
    }
    else if (this.state.isLoggedIn && this.state.cohortPage) {
      return (
        <div>
          <Cohorts />
        </div>
      )
    }
    else if (this.state.isLoggedIn && this.state.studentsPage) {
      return (
        <div>

        </div>
      )
    }
    return <h1>React App Working</h1>;
  }
}
