import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import UpdatePassword from './UpdatePassword'
import Logout from './Logout'
import UploadProfile from './UploadProfile'


class App extends React.Component {


    render() {
        return  (
            <div>
                <BrowserRouter>
                    <Route path='/' exact component={()=> (<div><Login /><Register/></div>)} />
                    <Route path='/profile' exact component={Profile} />
                    <Route path='/profile/update' exact component={UpdatePassword} /> 
                    <Route path='/logout' exact component={Logout}/>
                    <Route path='/profile/updateprofile' exact component={UploadProfile}/>
                </BrowserRouter>                
            </div>
        )
    }
}

export default App