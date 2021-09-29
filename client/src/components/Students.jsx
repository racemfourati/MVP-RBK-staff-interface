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
            image: 'test',
            comments: '',
            cohort_name: this.props.cohort

        }
    }

    hundleDelete = (id) => {
        axios.delete(`/student/${id}`)
            .then(() => { this.props.refresh() })
    }

    hundleCancel = () => {
        this.setState({
            addStudents: false,
            edit: false,
            name: '',
            age: '',
            image: 'test',
            comments: '',
            cohort_name: this.props.cohort
        })
    }

    hundleEdit = (obj) => {
     this.setState({
        addStudents: false,
        edit: true,
     })
     console.log(obj)
    }

    hundleNewStudent = () => {
        this.setState({
            students: false,
            addStudents: true,
        })
    }

    hundleAddStudent = () => {
        if (this.state.name !== '' && this.state.age !== '' && this.state.image !== '') {
            var student = {}
            student.name = this.state.name
            student.age = this.state.age
            student.image = this.state.image
            student.comments = this.state.comments
            student.cohort_name = this.state.cohort_name
            axios.post('/student', student)
                .then(() => { this.props.refresh() })
                .then(() => { this.hundleCancel() })
            // .catch((err)=>{throw Error('name already used')})
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
                <div>
                    <input onChange={this.hundleChange} type='text' name='name'></input>
                    <input onChange={this.hundleChange} type='number' name='age'></input>
                    <input onChange={this.hundleChange} type='image' name='image'></input>
                    <input onChange={this.hundleChange} type='text' name='comments'></input>
                    <button onClick={this.hundleAddStudent}>add</button>
                    <button onClick={this.hundleCancel}>cancel</button>
                </div>
            )
        }
        else if (this.state.edit) {
            return (
                <div>
                    <input onChange={this.hundleChange} type='text' name='name'></input>
                    <input onChange={this.hundleChange} type='number' name='age'></input>
                    <input onChange={this.hundleChange} type='image' name='image'></input>
                    <input onChange={this.hundleChange} type='text' name='comments'></input>
                    <button >edit</button>
                    <button onClick={this.hundleCancel}>cancel</button>

                </div>
            )
        }
        else {
            return (
                <div>
                    <h1>Students of {this.state.cohort_name}</h1>
                    <button onClick={this.hundleNewStudent}>add Student</button>
                    <button onClick={this.props.back}>back to cohorts</button>
                    <div>
                        {this.props.students.map((element, key) =>
                            <Student editS={this.hundleEdit} deleteS={this.hundleDelete} student={element} key={key} />
                        )}
                    </div>

                </div>
            )
        }

    }
}
