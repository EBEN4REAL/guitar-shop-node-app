import React from 'react';
import {Link} from 'react-router-dom';
import {connect } from 'react-redux';

const links = [
    {
        name: "My acount",
        linkTo: '/user/dashboard'
    },
    {
        name: 'User Information',
        linkTo: 'user/user_profile'
    },
    {
        name: 'My Cart',
        linkTo: 'user/cart'
    }
]

const admin_links = [
    {
        name: "Site Info",
        linkTo: "/admin/site_info",
    },
    {
        name: "Add product",
        linkTo: "/admin/add_product",
    },
    {
        name: "Manage categories",
        linkTo: "/admin/manage_categories",
    }
]

const UserLayout = (props) => {
    const generateLinks = (links) => {
            return (
                links.map((item,index) => {
                    return (
                        <Link to={item.linkTo} key={index}>
                            {item.name}
                        </Link>
                    )
                }
            )
            
        ) 
    }

    const genearateAdminLinks = (admin_links) => (
        admin_links.map((item, index) => {
            return (
                <Link to={item.linkTo} key={index}>{item.name}</Link>
            )
        })
    )
    return (
        <div className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <h2>My Account</h2>
                    <div className="links">
                        {generateLinks(links)}
                    </div>
                    {props.user.userData.isAdmin ? 
                         <div>
                             <h2>Admin</h2>
                             <div className="links">
                                {genearateAdminLinks(admin_links)}
                            </div>
                         </div>
                    :null

                    }
                   
                </div>
                <div className="user_right">
                    {props.children}
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {

}
export default connect()(UserLayout;