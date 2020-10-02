import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class Logout extends React.Component{
    constructor(){
        super()
        this.state ={
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit = (event)=>{
        event.preventDefault()
        const config={
            method: 'POST',
            url: 'https://inshal-profile-api.herokuapp.com/user/logout',
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('authToken')
            }
        }
        axios(config).then((response)=>{
            localStorage.removeItem('authToken')
            console.log('fdgfd'+localStorage.getItem('authToken'))
            if(response.data){
                this.setState({redirect: true})
            }
        }).catch((e)=>{
            console.log(e)
        })
    }

    render(){
        if(this.state.redirect){
            return(<Redirect to="/" />)
        }
        return (
            <div>         
                <p onClick={this.handleSubmit}>Logout</p>
            </div>
        )
    }
}

export default Logout