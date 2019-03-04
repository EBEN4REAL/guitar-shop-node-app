 import React, {Component} from 'react';
 import {connect} from 'react-redux';

 import FormField from '../../components/utils/Form/FormField';
 import  {update, generateData, isFomValid} from '../utils/Form/FormActions';
 import {registerUser} from '../../store/actions/user_actions/user_actions';
 import Modal from '@material-ui/core/Dialog';

 class Register extends Component {
     state = {
         formError: false,
         formSuccess: false,
         formData: {
             name: {
                 elementType: 'input',
                 value: '',
                 elementConfig: {
                     name: 'name',
                     type: 'text',
                     placeholder: 'Enter your Name'
                 },
                 validation: {
                     required: true,
                 },
                 valid: false,
                 touched: false,
                 validationMessage: ''
             },
             lastname: {
                 elementType: 'input',
                 value: '',
                 elementConfig: {
                     name: 'lastname',
                     type: 'text',
                     placeholder: 'Enter your lastname'
                 },
                 validation: {
                     required: true,
                 },
                 valid: false,
                 touched: false,
                 validationMessage: ''
             },
             email: {
                 elementType: 'input',
                 value: '',
                 elementConfig: {
                     placeholder: "Enter your email",
                     type: 'email',
                     name: "name"
                 },
                 validation: {
                     email: true,
                     required: true
                 },
                 valid: false,
                 validationMessage: ''
             },
              password: {
                  elementType: 'input',
                  value: '',
                  elementConfig: {
                      placeholder: "Enter your password",
                      type: 'password',
                      name: 'password'
                  },
                  validation: {
                      required: true
                  },
                  valid: false,
                  validationMessage: ''
              },
              confirmPassword: {
                  elementType: 'input',
                  value: '',
                  elementConfig: {
                      placeholder: "Enter your password",
                      type: 'password',
                      name: 'confirm_password'
                  },
                  validation: {
                      required: true,
                      confirm: 'password'
                  },
                  valid: false,
                  validationMessage: '',
                  touched: false
              },
         }
     }

     updateForm = (element) => {
         let newFormData = update(element, this.state.formData, 'register');
         this.setState({
             formData: newFormData
         })
     }
      submiForm = (event) => {
          event.preventDefault();

          let dataToSubmit = generateData(this.state.formData, 'register');
          let formIsValid = isFomValid(this.state.formData, 'register');

          if (formIsValid) {
             this.props.dispatch(registerUser(dataToSubmit)).then(res => {
                if(res.payload.success){
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    setTimeout(() => {
                        this.props.history.push('/register_login');
                    }, 3000)
                }
             }).catch(e => {
                 this.setState({formError: true});
             })
          } else {
              this.setState({
                  formError: true
              })
          }
      }
     render(){
         return  (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={(event) => this.submiForm(event)}>
                                <h2>Personal Information</h2>
                                    <div className="form_block_two">
                                        <div className="block">
                                            <FormField 
                                                id={'name'}
                                                formData={this.state.formData.name}
                                                changed={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                        <div className="block">
                                            <FormField 
                                                id={'lastname'}
                                                formData={this.state.formData.lastname}
                                                changed={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <FormField 
                                                id={'email'}
                                                formData={this.state.formData.email}
                                                changed={(element) => this.updateForm(element)}
                                            />
                                    </div>
                                    <h2>Verify password</h2>
                                    <div className="form_block_two">
                                        <div className="block">
                                            <FormField 
                                                id={'password'}
                                                formData={this.state.formData.password}
                                                changed={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                        <div className="block">
                                            <FormField 
                                                id={'confirmPassword'}
                                                formData={this.state.formData.confirmPassword}
                                                changed={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        {this.state.formError ? 
                                            <div className="error_label">
                                                Something is not right with your form Please check through!
                                            </div>
                                    : null }
                                    <button onClick={(event) => this.submiForm(event)}>
                                            Create Account
                                    </button>
                                    </div>
                                    
                            </form>
                        
                        </div>
                    </div>
                </div>
                <Modal open={this.state.formSuccess}>
                    <div className="dialog_alert">
                    <div>Congratulation!</div>
                    <div>
                        Redirecting in a couple seconds...
                    </div>
                    </div>
                </Modal>
            </div>
               
         )
     }
 }

 export default connect()(Register);