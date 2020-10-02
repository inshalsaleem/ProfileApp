import React from 'react'
import axios from 'axios'
import Logout from './Logout'
import './App.css'
import { Redirect, Link } from 'react-router-dom'
//import UploadProfile from './UploadProfile'



class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            address: '',
            email: '',
            phone:'',
            username: '',
            sex:'',
            avatar: null,
            imageurl: '',
            profileupload: false,
        }
    }

 
    componentDidMount(){
        console.log(localStorage.getItem('authToken'))
        const token = localStorage.getItem('authToken')
        const config={
            method: 'GET',
            url: 'https://inshal-profile-api.herokuapp.com/profile/me',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }

        axios(config).then((response)=>{
            this.setState({name: response.data.name,
            address: response.data.address,
            email: response.data.email,
            phone: response.data.phone,
            username: response.data.username,
            sex: response.data.gender,
            avatar: response.data.avatar
            })
            this.setState({imageurl:'data:image/jpg;base64,'+this.state.avatar})
            console.log(response.data)
            localStorage.setItem('avatar',this.state.avatar)
        }).catch( (e) => {
            console.log(e.response.data)
        })   
    }
    
    render(){

        if(localStorage.getItem('authToken') === null){
            return(<Redirect to="/"/>)
        }

        return (
            <div> 
                <ul>
                    <li><p className="active">My Profile</p></li>
                    <li style={{float: 'right'}}><Logout/></li>
                    <li style={{float: 'right'}}><p><Link to="/profile/update">Update Password</Link></p></li>
                    <li style={{float: 'right'}}><p><Link to="/profile/updateprofile">Upload Profile</Link></p></li>
                </ul>
                <div className="Profile">
                <div className="userData"> 
                    <h3 className='ui header'>Name: </h3>
                    <p className="responseData">{this.state.name}</p>
                </div>
                <div className="userData">
                    <h3 className='ui header'>Phone Number: </h3>
                    <p className="responseData">{this.state.phone}</p>
                </div>

                <div className="userData">
                    <h3 className='ui header'>Address: </h3>
                    <p className="responseData">{this.state.address}</p>
                </div>

                <div className="userData">
                    <h3 className='ui header'>Email ID: </h3>
                    <p className="responseData">{this.state.email}</p>
                </div>

                <div className="userData">
                    <h3 className='ui header'>User Name: </h3>
                    <p className="responseData">{this.state.username}</p>
                </div>

                <div className="userData">
                    <h3 className='ui header'>Sex: </h3>
                    <p className="responseData" >{this.state.sex}</p>
                </div>
                </div>
                <img src={this.state.imageurl} alt="avatar"/>

            </div>
        )
    }
}


export default Profile