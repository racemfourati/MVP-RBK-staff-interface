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

    hundleSignin=()=>{
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
            <div className='center'>
                <input className='login-items' placeholder='username' value={this.state.username} onChange={this.hundleChange} name='username'></input>
                <input className='login-items' placeholder='password' type='password' value={this.state.password} onChange={this.hundleChange} name='password'></input>
                <input className='login-items' placeholder='email' type='email' value={this.state.email} onChange={this.hundleChange} name='email'></input>
                <input className='login-items' placeholder='secret code' type='password' value={this.state.scode} onChange={this.hundleChange} name='scode'></input>
                <button className='login-items button' onClick={this.hundleSignin}  >sign in</button>
            </div>
        )
    }
}