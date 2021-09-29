


    import React, { Component } from 'react'

    export default class cohort extends Component {
        constructor(props) {
            super(props)

        }

        

        hundleDelete = (e) => {
            this.props.deleteC(e.target.value)
        }
        render() {
            return (
                <div>
                    {this.props.cohort.name}
                    {this.props.cohort.start_date}
                    {this.props.cohort.students_number}
                    <button onClick={this.hundleDelete} value={this.props.cohort._id}>delete</button>
                    <button>students</button>
                </div>
            )
        }
    }
