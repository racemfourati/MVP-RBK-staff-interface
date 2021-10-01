import React, { Component } from 'react';
import Login from './Login.jsx';
import Cohorts from './Cohorts.jsx'
import axios from 'axios'
import Students from './Students.jsx';
import Promise from 'bluebird';
import SignIn from './SignIn.jsx';
import logo from '../images/rbk.png'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signIn: false,
      isLoggedIn: false,
      cohortPage: true,
      studentsPage: false,
      cohorts: [],
      students: [],
      cohort: ''
    }
    this.hundleLogin = this.hundleLogin.bind(this)
  }










  //--------------------------------------------App--------------------------------//
  componentDidMount() {
    this.getCohorts()
  }


  //-------------------------------------------App-------------------------------//
















  //------------------------------------------cohort-------------------------//
  hundleAddCohort = () => {
    this.getCohorts()
  }


  getCohorts = () => {
    axios.get('/cohort')
      .then((data) => {
        this.setState({
          cohorts: data.data
        })
      })

  }

  getStudentsCohort = (cn) => {
    Promise.resolve(this.setState({
      cohort: cn,
    }))
      .then(() => { this.getStudents() })


  }


  getStudents = () => {

    axios.get(`/student/${this.state.cohort}`)
      .then((data) => {
        this.setState({
          cohortPage: false,
          studentsPage: true,
          students: data.data
        })
      })

  }


  //------------------------------------------cohort-------------------------//




  //------------------------------------------students-------------------------//
  hundleBackCohort = () => {
    this.setState({
      cohortPage: true,
      studentsPage: false,
    })
  }


  //------------------------------------------students-------------------------//







  //------------------------------------------login-------------------------//

  hundleLogin(user) {
    axios.post('/login', user)
      .then((data) => {
        if (data.data === true) {
          this.setState({
            isLoggedIn: true,
          })
        }
      })
      .catch((err) => { alert('wrong username or wrong password') })
  }
  switchSignIn = () => {
    this.setState({
      signIn: true,
    })
  }

  switchLogin = () => {
    this.setState({
      signIn: false,
    })
  }
  hundleSignIn = (user) => {
    axios.post('/signin', user)
      .then((data) => {
        if (data.data === true) {
          this.setState({
            isLoggedIn: true,
          })
        }
      })
      .catch((err) => { console.log(err) })
  }

  //------------------------------------------login-------------------------//








  //------------------------------------------logout-------------------------//
  hundlelogOut = () => {
    this.setState({
      isLoggedIn: false,
    })
  }
  //------------------------------------------logout-------------------------//





  render() {
    if (!this.state.isLoggedIn && this.state.signIn) {
      return (
        <div>
          <div className='nav-bar center'>
            <h1>Welcome to RBK staff app</h1>
          </div >
          <div className='center'>
            <div className='login'>
              <div><SignIn signIn={this.hundleSignIn} /></div>
              <h4>Already have an account ? Click here  <a onClick={this.switchLogin}>log in </a></h4>
            </div>

          </div>
        </div>
      )

    }
    else if (!this.state.isLoggedIn) {
      return (

        <div >
          <div className='nav-bar center'>

            <h1>Welcome to RBK staff app</h1>
          </div>
          <div className='center'>
            <div className='login'>
              <div ><Login login={this.hundleLogin} /></div>
              <h4>Create an account ?  Click here <a onClick={this.switchSignIn}>sign in </a></h4>
            </div>

          </div>
        </div>
      )
    }

    else if (this.state.isLoggedIn && this.state.cohortPage) {
      return (
        <div>
          <div className='nav-bar center'>
            <h1> RBK cohorts</h1>
          </div >
          <div className='center'>
            <button className='logout-button' onClick={this.hundlelogOut}>Logout</button>
            <div className='cohorts'>
              <Cohorts studentsCohort={this.getStudentsCohort} refresh={this.hundleAddCohort} cohorts={this.state.cohorts} />
            </div>

          </div>
        </div>
      )
    }
    else if (this.state.isLoggedIn && this.state.studentsPage) {
      return (
        <div >
          <div className='nav-bar center'>
            <h1> RBK {this.state.cohort} Students</h1>
          </div >
          <div className='center'>
            <button className='logout-button' onClick={this.hundlelogOut}>Logout</button>
            <div >
              <Students refreshCohort={this.getCohorts} refresh={this.getStudents} students={this.state.students} back={this.hundleBackCohort} cohort={this.state.cohort} />
            </div>
          </div>
        </div>
      )
    }
    return <h1>React App Working</h1>;
  }
}
