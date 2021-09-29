import axios from 'axios'
import React, { Component } from 'react'

export default class Student extends Component {
    constructor(props){
        super(props)
    }

    hundleDelete=(e)=>{
    this.props.deleteS(e.target.value)
    }

    hundleUpdate=()=>{
        this.props.editS(this.props.student)
        }
    render() {
        return (
            <div>
                {this.props.student.name}
                {this.props.student.age}
                {this.props.student.image}
                <button onClick={this.hundleDelete} value={this.props.student._id}>delete</button>
                <button onClick={this.hundleUpdate}>update</button>
            </div>
        )
    }
}
