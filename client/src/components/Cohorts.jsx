import React, { Component } from 'react'
import axios from 'axios'

export default class Cohorts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cohorts: true,
            addCohort: false,
            cohortName: '',
            startDate: ''
        }
    }

    hundleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    hundleAddCohort = () => {
        if (this.state.cohortName !== '' && this.state.startDate !== '') {
            var cohort = {}
            cohort.cohortName = this.state.cohortName
            cohort.startDate = this.state.startDate
            axios.post('/cohort', cohort)
                .then(() => {
                    this.hundleCancel()
                })
        }
        else {
            alert('missing fields')
        }
    }

    hundleNewCohort = () => {
        this.setState({
            cohorts: false,
            addCohort: true,
        })
    }
    hundleCancel = () => {
        this.setState({
            cohorts: true,
            addCohort: false,
            cohortName: '',
            startDate: ''
        })
    }

    render() {
        if (this.state.addCohort) {
            return (
                <div>
                    <input value={this.state.cohortName} onChange={this.hundleChange} type='text' name='cohortName'></input>
                    <input value={this.state.startDate} onChange={this.hundleChange} type='date' name='startDate'></input>
                    <button onClick={this.hundleAddCohort}>add cohort</button>
                    <button onClick={this.hundleCancel}>cancel</button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <button onClick={this.hundleNewCohort} >new Cohort</button>
                </div>
            )
        }

    }
}
