import React, { Component } from 'react';
import Login from './Login.jsx';
import Cohorts from './Cohorts.jsx'
import axios from 'axios'
import Students from './Students.jsx';
import  Promise  from 'bluebird';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: true,
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

  getStudentsCohort=(cn)=>{
    Promise.resolve(this.setState({
      cohort: cn,
    }))
    .then(()=>{this.getStudents()})
    
    
  } 


  getStudents = () => {

    axios.get(`/student/${this.state.cohort}`)
      .then((data) => {
        this.setState({
          cohortPage: false,
          studentsPage: true,
          students:data.data
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
    console.log(user)
  }

  //------------------------------------------login-------------------------//











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
          <Cohorts studentsCohort={this.getStudentsCohort} refresh={this.hundleAddCohort} cohorts={this.state.cohorts} />
        </div>
      )
    }
    else if (this.state.isLoggedIn && this.state.studentsPage) {
      return (
        <div>
          <Students refresh={this.getStudents} students={this.state.students} back={this.hundleBackCohort} cohort={this.state.cohort} />
        </div>
      )
    }
    return <h1>React App Working</h1>;
  }
}
