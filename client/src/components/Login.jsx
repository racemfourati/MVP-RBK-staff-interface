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
            <div className='center '>
                <div className='login-items '><input placeholder='username' value={this.state.username} onChange={this.hundleChange} name='username'></input></div>
                <div className='login-items '><input placeholder='password' type='password' value={this.state.password} onChange={this.hundleChange} name='password'></input></div>
                <button  className='login-items button' onClick={this.hundleLogin}  >Login</button>
            </div>
        )
    }
}
