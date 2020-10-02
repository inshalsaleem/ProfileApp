import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class UploadProfile extends React.Component{
    constructor(){
        super()
        this.state={
            picture:null
        }

        this.onFileChange = this.onFileChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onFileChange = (event)=>{
        event.preventDefault()

        this.setState( {picture: event.target.files[0]} )
    }
    handleSubmit = (event)=>{
        event.preventDefault()
        const formData = new FormData()
        console.log(this.state.picture)
        formData.append(
            'avatar',
            this.state.picture
        )
        const token = localStorage.getItem('authToken')
        console.log(token)
        const config = {
            method: 'POST',
            url: "https://inshal-profile-api.herokuapp.com/profile/user/avatar",
            data: formData,
            headers:{
                'Authorization': `Bearer ${token}`,
                 'Content-Type': 'multipart/form-data'
            }
            
        }
        axios(config).then((response)=>{
            console.log('File Uploaded')
        }).catch((e)=>{
            console.log(e)
        })
    }
    render(){

        if(localStorage.getItem('authToken') === null){
            return(<Redirect to="/"/>)
        }

        return(
            <div>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <h2 className="ui header">Upload Profile Picture</h2>
                    <div className="fields">
                        <input type="file" onChange={this.onFileChange}
                         accept=".png, .jpeg, .jpg"/>
                         <button className="ui blue submit button"
                          type="submit">
                               Upload
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UploadProfile
