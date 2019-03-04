import React from 'react';
import UserLayout from '../../hoc/user';
import Button from '../utils/Button';
import {connect} from 'react-redux';

const  UserDashboard = ({user}) =>{
    return (
        <div>
            <UserLayout>
                <div className="user_nfo_panel">
                    <h1>User information</h1>
                    <div>
                        <span>Name: {user.user_data.name}</span>
                        <span>Last Name: {user.user_data.lstname}</span>
                        <span>Email: {user.user_data.email}</span>
                    </div>
                    <Button
                        type="default"
                        title="Edit acount Info"
                        linkTo="/user/user_profile"
                        >
                    
                    </Button>
                </div>
                <div className="user_nfo_panel">
                    <h1>Histroy purchases</h1>
                    <div className="user+product_block_wrapper">
                        History
                    </div>
                </div>
               
            </UserLayout>
        </div>
    )
}


export default UserDashboard;