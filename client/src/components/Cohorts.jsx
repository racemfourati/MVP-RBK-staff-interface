import React, { Component } from 'react'
import Cohort from './Cohort.jsx'
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


    hundleDelete = (id) => {
        axios.delete(`/cohort/${id}`)
            .then(() => { this.props.refresh() })
    }

    hundleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    hundleAddCohort = () => {
        if (this.state.cohortName !== '' && this.state.startDate !== '') {
            var cohort = {}
            cohort.name = this.state.cohortName
            cohort.start_date = this.state.startDate
            axios.post('/cohort', cohort)
                .then(() => { this.props.refresh() })
                .then(() => { this.hundleCancel() })
                .catch((err) => { throw Error('name already used') })
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
                <div className='center add-cohorts '>
                    <input className='login-items' placeholder='cohort name' value={this.state.cohortName} onChange={this.hundleChange} type='text' name='cohortName'></input>
                    <input className='login-items' value={this.state.startDate} onChange={this.hundleChange} type='date' name='startDate'></input>
                    <div>
                        <button className='cohort-button-add' onClick={this.hundleAddCohort}>Add cohort</button>
                        <button className='cohort-button-cancel' onClick={this.hundleCancel}>Cancel</button>
                    </div>

                </div>
            )
        }
        else {
            return (
                <div className='center'>
                    <div><button className='new-cohort-button' onClick={this.hundleNewCohort} >New Cohort</button></div>
                    <div>

                        {this.props.cohorts.map((element, key) =>

                            <Cohort studentsCohort={this.props.studentsCohort} deleteC={this.hundleDelete} cohort={element} key={key} />
                        )}

                    </div>
                </div>
            )
        }

    }
}
