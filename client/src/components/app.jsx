import React, { Component } from 'react';
import Login from './Login.jsx';
import Cohorts from './Cohorts.jsx'
import axios from 'axios'
import Students from './Students.jsx';
import Promise from 'bluebird';
import SignIn from './SignIn.jsx';

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
    axios.post('/login',user)
    .then((data)=>{
      if(data.data===true){
        this.setState({
          isLoggedIn: true,
        })
      }
    })
    .catch((err)=>{console.log(err)})
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
    axios.post('/signin',user)
    .then((data)=>{
      if(data.data===true){
        this.setState({
          isLoggedIn: true,
        })
      }
    })
    .catch((err)=>{console.log(err)})
  }

  //------------------------------------------login-------------------------//








  //------------------------------------------logout-------------------------//
 hundlelogOut=()=>{
   this.setState({
    isLoggedIn: false,
   })
 }
   //------------------------------------------logout-------------------------//





  render() {
    if (!this.state.isLoggedIn && this.state.signIn) {
      return (
        <div >
          <SignIn signIn={this.hundleSignIn} />
          <button onClick={this.switchLogin}>log in </button>

        </div>
      )

    }
    else if (!this.state.isLoggedIn) {
      return (
        <div >

          <Login login={this.hundleLogin} />
          <button onClick={this.switchSignIn}>sign in </button>
        </div>
      )
    }

    else if (this.state.isLoggedIn && this.state.cohortPage) {
      return (
        <div>
          <button onClick={this.hundlelogOut}>logout</button>
          <Cohorts studentsCohort={this.getStudentsCohort} refresh={this.hundleAddCohort} cohorts={this.state.cohorts} />
        </div>
      )
    }
    else if (this.state.isLoggedIn && this.state.studentsPage) {
      return (
        <div>
          <button onClick={this.hundlelogOut}>logout</button>
          <Students refreshCohort={this.getCohorts} refresh={this.getStudents} students={this.state.students} back={this.hundleBackCohort} cohort={this.state.cohort} />
        </div>
      )
    }
    return <h1>React App Working</h1>;
  }
}
