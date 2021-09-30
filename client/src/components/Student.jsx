import axios from 'axios'
import React, { Component } from 'react'

export default class Student extends Component {
    constructor(props) {
        super(props)
    }

    hundleDelete = (e) => {
        this.props.deleteS(e.target.value)
    }

    hundleUpdate = () => {
        this.props.editS(this.props.student)
    }
    render() {
        console.log(this.props.student)
        return (
            <div  className='student-box'>
                <div className='student'>
                    <p className='login-items'>Name:{this.props.student.name}</p>
                    <p className='login-items'>Age:{this.props.student.age}</p>
                    <p className='login-items'>Comments:{this.props.student.comments}</p>
                </div>
                <div className='student-buttons'>
                    <button className='student-button-delete' onClick={this.hundleDelete} value={this.props.student._id}>Delete</button>
                    <button className='student-button-update' onClick={this.hundleUpdate}>Update</button>
                </div>
            </div>
        )
    }
}
