import React , {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import FormField from '../utils/Form/FormField';
import  {update, generateData, isFomValid} from '../utils/Form/FormActions';
import {loginUser} from '../../store/actions/user_actions/user_actions';

 class Login extends Component {

    state = {
        formError:  false,
        formSuccess: '',
        formData: {
            email: {
                elementType: 'input',
                value: '',
                elementConfig: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email:true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
             password: {
                 elementType: 'input',
                 value: '',
                 elementConfig: {
                     name: 'password',
                     type: 'password',
                     placeholder: 'Enter your password'
                 },
                 validation: {
                     required: true,
                 },
                 valid: false,
                 touched: false,
                 validationMessage: ''
             }
        }
    }
    updateForm = (element) => {
        const newFormdata = update(element , this.state.formData, 'login');
        this.setState({
            formError: false,
            formData: newFormdata
        })
        console.log(this.state.formData);
    }

    submiForm = (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formData, 'login');
        let formIsValid = isFomValid(this.state.formData, 'login');

        if(formIsValid){
            this.props.dispatch(loginUser(dataToSubmit)).then(res =>{
                if(res.payload.loginSuccess){
                    console.log(res.payload);
                    this.props.history.push('/user/dashboard');
                }else{
                    this.setState({
                        formError: true
                    })
                }
            }) ;
        }else{
            this.setState({
                formError: true
            })
        }
    }
     render(){
         return (
             <div className="signin_wrapper">
                <form onSubmit={(event) => this.submiForm(event)}>
                    <FormField 
                        id={'email'}
                        formData={this.state.formData.email}
                        changed={(element) => this.updateForm(element)}
                    />
                    <FormField 
                        id={'password'}
                        formData={this.state.formData.password}
                        changed={(element) => this.updateForm(element)}
                    />
                    {this.state.formError ? 
                        <div className="error_label">
                            Something is not right with your form Please check through!
                        </div>
                   : null }
                   <button onClick={(event) => this.submiForm(event)}>
                        Login
                   </button>
                </form>
             </div>
         )
     }
 }

 export default connect()(withRouter(Login));