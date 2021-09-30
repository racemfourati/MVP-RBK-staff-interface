


import React, { Component } from 'react'

export default class cohort extends Component {
    constructor(props) {
        super(props)

    }

    hundleStudents = (e) => {
        this.props.studentsCohort(e.target.value)
    }

    hundleDelete = (e) => {
        this.props.deleteC(e.target.value)
    }
    render() {
        return (
            <div>
                <div className='container cohort '>
                    <div><p className='cohort-text'>Cohort Name:</p><p className='cohort-value'>{this.props.cohort.name}</p> </div>
                    <div><p className='cohort-text'> Starting Date:</p ><p className='cohort-value'>{this.props.cohort.start_date.slice(0,10)}</p></div>
                    <div><p className='cohort-text'> Number of students :</p><p className='cohort-value'>{this.props.cohort.students_number}</p></div>
                </div>
                <div className='cohort-buttons'>
                    <button className='cohort-button-delete' onClick={this.hundleDelete} value={this.props.cohort._id}>Delete</button>
                    <button className='cohort-button-update' onClick={this.hundleStudents} value={this.props.cohort.name}>Students</button>
                </div>
            </div>
        )
    }
}
