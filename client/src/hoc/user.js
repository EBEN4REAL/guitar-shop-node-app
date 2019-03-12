import React from 'react';
import {Link} from 'react-router-dom';

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
        linkTo: "/site_info",
    },
    {
        name: "Add product",
        linkTo: "/add_product",
    },
    {
        name: "Manage categories",
        linkTo: "/manage_categories",
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
                    <h2>Admin</h2>
                    <div className="links">
                        {genearateAdminLinks(admin_links)}
                    </div>
                </div>
                <div className="user_right">
                    {props.children}
                </div>
            </div>

        </div>
    )
}

export default UserLayout;