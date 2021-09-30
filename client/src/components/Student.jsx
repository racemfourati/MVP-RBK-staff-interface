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
            <div>
                <div>
                    <p>Name:{this.props.student.name}</p>
                    <p>Age:{this.props.student.age}</p>
                    <p>Comments:{this.props.student.comments}</p>
                </div>
                <button className='cohort-button-delete' onClick={this.hundleDelete} value={this.props.student._id}>delete</button>
                <button className='cohort-button-update' onClick={this.hundleUpdate}>update</button>
            </div>
        )
    }
}
