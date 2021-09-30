import React, { Component } from 'react'
import axios from 'axios'
import Student from './Student.jsx'

export default class Students extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addStudents: false,
            edit: false,
            name: '',
            age: '',
            comments: '',
            cohort_name: this.props.cohort,
            toEdit: ''

        }
    }

    hundleDelete = (id) => {
        axios.delete(`/student/${id}`)
            .then(() => { this.props.refresh() })
            .then(() => { this.props.refreshCohort() })
    }

    hundleCancel = () => {
        this.setState({
            addStudents: false,
            edit: false,
            name: '',
            age: '',
            comments: '',
            cohort_name: this.props.cohort
        })
    }

    hundleEdit = (obj) => {
        this.setState({
            addStudents: false,
            edit: true,
            toEdit: obj._id,
            name: obj.name,
            age: obj.age,
            comments: obj.comments,
        })

    }
    hundleNewEdit = () => {
        var student = {}
        student.name = this.state.name
        student.age = this.state.age
        student.comments = this.state.comments
        axios.put(`/student/${this.state.toEdit}`, student)
            .then(() => { this.props.refresh() })
            .then(() => { this.hundleCancel() })
    }

    hundleNewStudent = () => {
        this.setState({
            students: false,
            addStudents: true,
        })
    }

    hundleAddStudent = () => {
        if (this.state.name !== '' && this.state.age !== '') {
            var student = {}
            student.name = this.state.name
            student.age = this.state.age
            student.comments = this.state.comments
            student.cohort_name = this.state.cohort_name
            axios.post('/student', student)
                .then(() => { this.props.refresh() })
                .then(() => { this.props.refreshCohort() })
                .then(() => { this.hundleCancel() })
                .catch((err) => { throw Error('problem adding student') })
        }
        else {
            alert('missing fields')
        }
    }
    hundleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if (this.state.addStudents) {
            return (
                <div className='center add-cohorts'>
                    <input className='login-items' placeholder='student name' onChange={this.hundleChange} type='text' name='name'></input>
                    <input className='login-items' placeholder='student age' onChange={this.hundleChange} type='number' name='age'></input>
                    <input className='login-items' placeholder='comment' onChange={this.hundleChange} type='text' name='comments'></input>
                    <div className='students-buttons'>
                        <button className='login-items student-button-edit' onClick={this.hundleCancel}>Cancel</button>
                        <button className='login-items student-button-add' onClick={this.hundleAddStudent}>Add</button>
                    </div>
                </div>
            )
        }
        else if (this.state.edit) {
            return (
                <div className='center add-cohorts'>

                    <input className='login-items' placeholder='student name' value={this.state.name} onChange={this.hundleChange} type='text' name='name'></input>
                    <input className='login-items' placeholder='student age' value={this.state.age} onChange={this.hundleChange} type='number' name='age'></input>
                    <input className='login-items' placeholder='comment' value={this.state.comments} onChange={this.hundleChange} type='text' name='comments'></input>
                    <div className='students-buttons'>
                        <button className=' login-items student-button-edit' onClick={this.hundleCancel}>Cancel</button>
                        <button className='login-items student-button-add' onClick={this.hundleNewEdit} >Edit</button>
                    </div>
                </div>
            )
        }
        else {
            return (

                <div className='center'>
                    <button className='back-cohort-button' onClick={this.props.back}>Back to cohorts</button>
                    <button className='add-student-button' onClick={this.hundleNewStudent}>Add Student</button>
                    <div className='students center'>

                        {this.props.students.map((element, key) =>

                            <Student editS={this.hundleEdit} deleteS={this.hundleDelete} student={element} key={key} />

                        )}

                    </div>


                </div>
            )
        }

    }
}
