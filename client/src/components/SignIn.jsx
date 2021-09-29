import React, { Component } from 'react'

export default class SignIn extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            email:'',
            scode:''
        }
    }

    hundleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
     
    }

    hundleLogin=()=>{
        if(this.state.password !== '' && this.state.username !== '' && this.state.email !== '' && this.state.scode !== ''){
            this.props.signIn(this.state)
          this.setState({
            username:'',
            password:'',
            email:'',
            scode:''
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
                <input type='email' value={this.state.email} onChange={this.hundleChange} name='email'></input>
                <input type='password' value={this.state.scode} onChange={this.hundleChange} name='scode'></input>
                <button onClick={this.hundleLogin}  >sign in</button>
            </div>
        )
    }
}