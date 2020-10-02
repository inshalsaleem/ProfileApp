import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'


class UpdatePassword extends React.Component{
    constructor(){
        super()
        this.state = {
            password: '',
            redirect: false,
            loggedin: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
    }

    onPasswordChange = (event) =>{
        this.setState({password: event.target.value})
    }

    handleSubmit = (event)=>{
        event.preventDefault()

        const data = JSON.stringify(this.state)
        console.log(data)
        const token = localStorage.getItem('authToken')
        const config = {
            method: 'PATCH',
            url: 'https://inshal-profile-api.herokuapp.com/profile/me',
            headers:{
                'Authorization': `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            data: data
        }

        axios(config).then((response)=>{
            console.log(response)
            alert('Password has been updated')
            if(response){
                this.setState({redirect: true})
            }
        }).catch((e)=>{
            console.log(e)
        })
    }

    render(){
        if(this.state.redirect){
            return(<Redirect to="/profile"/>)
        }
        if(localStorage.getItem('authToken') === null){
            return(<Redirect to="/"/>)
        }
        
        return (
            <div>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <h2 className="ui header">Update Password</h2>
                    <div className="field">
                        <label>Enter Password: </label>
                        <input type="password" 
                        value={this.state.password} 
                        onChange={this.onPasswordChange} 
                        style={{width: "250px"}} />
                    </div>
                    <button className="ui blue submit button" type='submit'>Update</button>
                </form>
            </div>
        )
    }
}

export default UpdatePassword