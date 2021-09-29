import React, { Component } from 'react'

export default class Cohorts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cohorts: true,
            add: false,
        }
    }
    render() {
        if (this.state.add) {
            return (
                <div>
                   <input></input>
                   <input></input>
                   
                </div>
            )
        }
        else {
            return (
                <div>
                  
                </div>
            )
        }

    }
}
