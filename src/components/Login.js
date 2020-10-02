import axios from 'axios';
import React from 'react';
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
    constructor(){
        super()
        this.state= {
            username: '',
            password: '',
            redirect: false,
        }

        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    

    onUserNameChange = (event) => {
        this.setState({username: event.target.value})
        console.log(this.state.username)
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.password)
        const data = JSON.stringify(this.state)
        console.log(data)

        const config = {
            method: 'POST',
            url: 'https://inshal-profile-api.herokuapp.com/user/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }


        axios(config).then( (response)=>{
            console.log(response)
            localStorage.setItem('authToken', response.data.token)
            console.log(localStorage.getItem('authToken'))
            if(response.data.token) {
                this.setState({redirect: true});
            }
            
        }).catch( (e) => {
            alert('Username or Password is incorrect')
            console.log(e)
        })
    }


    render() {
    
    if(this.state.redirect) {
        return (<Redirect to={'/profile'}/>)
    }
     return (
            <div style={{float: "left", marginLeft: "100px"}} >
                <form className='ui form'  onSubmit = {this.handleSubmit} style={{marginTop: "100px"}}>
                    <h2 className="ui header">Login</h2>
                    <br />
                    <div className="field">
                        <label>User Name</label>
                        <div className="ui left icon input">
                        <input type="text"
                            value = {this.state.username}
                            onChange={this.onUserNameChange}
                            name="username" placeholder="username" style={{width: "250px"}} required/>
                        <i className="user icon"></i>
                        </div>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <div className="ui left icon input">
                            <input type="password" 
                            value={this.state.passwords} 
                            onChange = {this.onPasswordChange}
                            name="password" placeholder="password" style={{width: "250px"}} required/>
                            <i className="lock icon"></i>
                            </div>
                        </div>
                        <button className="ui blue submit button" type="submit" >Log In</button>
                    </form>
                </div>
        );
    }
}

export default Login