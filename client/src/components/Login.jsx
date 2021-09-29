import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:''
        }
    }

    hundleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
     
    }

    hundleLogin=()=>{
        if(this.state.password !== '' && this.state.username !== ''){
            this.props.login(this.state)

          this.setState({
            username:'',
            password:''
          })  
        }
        else{
            alert('missing fields')
        }
        
    
    }

    render() {
        return (
            <div>
                <input value={this.state.username} onChange={this.hundleChange} name='username'></input>
                <input type='password' value={this.state.password} onChange={this.hundleChange} name='password'></input>
                <button onClick={this.hundleLogin} >login</button>
            </div>
        )
    }
}
