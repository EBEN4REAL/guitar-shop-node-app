import React , {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import  {logoutUser} from '../../../store/actions/user_actions/user_actions';


class Header extends Component {
    state = {
        page: [
            {
                name: "Home",
                linkTo: '/',
                public: true
            },
            {
                name: "Guitars",
                linkTo: '/shop',
                public: true
            }
        ],
        user: [
            {
                name: "My Cart",
                linkTo: '/user/cart',
                public: false
            },
            {
                name: "My Account",
                linkTo: '/user/cart',
                public: false
            },
            {
                name: "Log in",
                linkTo: '/register_login',
                public: true
            },
            {
                name: "Log out",
                linkTo: '/user_logout',
                public: false
            }
        ]
    }
    logoutHandler = (item, i) => {
        this.props.dispatch(logoutUser()).then(res =>{
            if(res.payload.success){
                this.props.history.push('/');
            }
        });
        this.props.history.push('/register_login');
    }
    defaultLik = (item, i) => ( 
        item.name === 'Log out' ?
            <div className="log_out_link"
                key={i}
                onClick={() => this.logoutHandler()}
            >
            {item.name}
            </div>
        :
        <Link to={item.linkTo} key={i}>
            {item.name}
        </Link>
    )
    cartLink = (item,i) => {
        const user = this.props.user.user_data
        return (
            <div className="cart_link" key={i}>
                <span>{user.cart.length > 0 ? user.cart.length : 0}</span>
                <Link to={item.linkTo}>
                    {item.name}
                </Link>
            </div>
        )
    }
    showLinks = (type) => {
        let list = [];

        if(this.props.user.user_data){
            type.forEach(item => {
                if(!this.props.user.user_data.isAuth){
                    if(item.public === true){
                        list.push(item);
                    }
                }else{
                    if(item.name !== 'Log in'){
                        list.push(item);
                    }
                }
            });
        }

        return list.map((item, i) => {
            if(item.name === 'My Cart'){
                return this.cartLink(item,i);
            }else{
                return this.defaultLik(item, i);
            }
           
        });
    }
    render(){
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">
                            Waves
                        </div>
                    </div>
                     <div className="right">
                        <div className="top">
                        {this.showLinks(this.state.user)}
                        </div>
                         <div className="bottom">
                            {this.showLinks(this.state.page)}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

function mapStateToProps (state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Header));