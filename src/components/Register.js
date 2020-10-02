import React from 'react'
import axios from 'axios'
import validator from 'validator'
import {Redirect} from 'react-router-dom'

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            name:'',
            phone:'',
            address:'',
            email:'',
            username:'',
            password:'',
            gender:'Male',
            redirect: false
        }

        this.onNameChange = this.onNameChange.bind(this)
        this.onAddressChange = this.onAddressChange.bind(this)
        this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onUserNameChange = this.onUserNameChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onGenderChange = this.onGenderChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onAddressChange = (event) => {
        this.setState({address: event.target.value})
    }

    onPhoneNumberChange = (event) => {
        this.setState({phone: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onUserNameChange = (event) => {
        this.setState({username: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onGenderChange = (event) => {
        this.setState({gender: event.target.value})
    }

    handleSubmit = (event)=> {
        event.preventDefault()

        if(!validator.isLength(this.state.password, {min: 7})){
            alert('Password length should be greate than 7')
        }else{
            const data = JSON.stringify(this.state)
            console.log(data)
            const config = {
                method: 'POST',
                url: 'https://inshal-profile-api.herokuapp.com/newuser',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }
            console.log(localStorage.getItem('authToken'))
            axios(config).then((response)=>{
                console.log(response.data)

                localStorage.setItem('authToken', response.data.token)

                if(response.data.token){
                    this.setState({redirect: true})
                }
            }).catch ((e)=>{
                console.log(e)
                alert('username or email already exits')
            })
        }
        
    }

    render(){

        if(this.state.redirect){
            return (<Redirect to='/profile' />)
        }
        return (
            <div style={{float: "right", marginRight: "100px"}} >
                <form className='ui form' onSubmit= {this.handleSubmit} style={{marginTop: "100px"}}>
                    <h2 className="ui header">Register</h2>
                    <br />

                    <div className="two fields">
                    <div className="field">
                        <label>Full Name</label>
                        <input type="text"
                            value = {this.state.name}
                            onChange={this.onNameChange}
                            name="username" placeholder="Full Name" style={{width: "250px"}} required/>
                    </div>

                    
                    <div className="field">
                        <label>Phone No</label>
                        <input type="text"
                            value = {this.state.phone}
                            onChange={this.onPhoneNumberChange}
                            name="phonenumber" placeholder="Phone Number" style={{width: "250px"}} required/>
                    </div>
                    </div>
                    <div className="field">
                        <label>Address</label>
                        <input type="text"
                            value = {this.state.address}
                            onChange={this.onAddressChange}
                            name="username" placeholder="Address" style={{width: "500px"}} required/>
                    </div>


                    <div className="field">
                        <label>Email</label>
                        <input type="email"
                            value = {this.state.email}
                            onChange={this.onEmailChange}
                            name="email" placeholder="Email ID" style={{width: "500px"}} required/>
                    </div>

                    <div className="two fields">
                    <div className="field">
                        <label>User Name</label>
                        <input type="text"
                            value = {this.state.username}
                            onChange={this.onUserNameChange}
                            name="username" placeholder="username" style={{width: "250px"}} required/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" 
                            value={this.state.passwords} 
                            onChange = {this.onPasswordChange}
                            name="password" placeholder="password" style={{width: "250px"}} required/>
                    </div>

                    </div>

                    <div className="two fields">
                    <select className="ui dropdown" value = {this.state.gender} onChange={this.onGenderChange} style={{width: "100px"}}>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </select>

                    <button className="ui button" type="submit" style={{marginLeft: "350px"}}>Sign Up</button>

                    </div>
                    </form>
            </div>
        )
    }
}

export default Register