import React, {Component}  from 'react';
import UserLayout from '../../../hoc/user';
import FormField from '../../utils/Form/FormField';
import {update , generateData, isFormValid} from '../../utils/Form/FormActions';

import {connect} from 'react-redux';
import {getBrands, getWoods} from '../../../store/actions/product_actions/productActions';

class AddProduct extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                elementType: "input",
                value: '',
                elementConfig: {
                    label: "Product name",
                    name: 'product_name',
                    type: 'text',
                    placeholder: 'Enter product name'
                },
                validation: {
                    required: true
                },
                validationMessage: '',
                valid: false,
                touched: false,
                showlabel: true
            },
            description: {
                elementType: "textarea",
                value: '',
                elementConfig: {
                    label: "Product description",
                    name: 'product_description',
                    type: 'text',
                    placeholder: 'Enter  description'
                },
                validation: {
                    required: true
                },
                validationMessage: '',
                valid: false,
                touched: false,
                showlabel: true
            },
            price: {
                elementType: "input",
                value: '',
                elementConfig: {
                    label: "Product price",
                    name: 'product_price',
                    type: 'number',
                    placeholder: 'product price'
                },
                validation: {
                    required: true
                },
                validationMessage: '',
                valid: false,
                touched: false,
                showlabel: true
            },
            brand: {
                elementType: "select",
                value: '',
                elementConfig: {
                    label: "Product brand",
                    name: 'product_brand',
                    options: [

                    ]
                },
                validation: {
                    required: true
                },
                validationMessage: '',
                valid: false,
                touched: false,
                showlabel: true
            },
            shipping: {
                elementType: "select",
                value: '',
                elementConfig: {
                    label: "Shipping",
                    name: 'shipping',
                    options: [
                        {
                            name: true,
                            value: 'Yes'
                        },
                        {
                            name: false,
                            value: 'No'
                        }
                    ]
                },
                validation: {
                    required: true
                },
                validationMessage: '',
                valid: false,
                touched: false,
                showlabel: true
            },
            available: {
                elementType: "select",
                value: '',
                elementConfig: {
                    label: "Available in stock",
                    name: 'available',
                    options: [
                        {
                            name: true,
                            value: 'Yes'
                        },
                        {
                            name: false,
                            value: 'No'
                        }
                    ]
                },
                validation: {
                    required: true
                },
                validationMessage: '',
                valid: false,
                touched: false,
                showlabel: true
            },
            wood: {
                elementType: "select",
                value: '',
                elementConfig: {
                    label: "Wood material",
                    name: 'wood',
                    options: []
                },
                validation: {
                    required: true
                },
                validationMessage: '',
                valid: false,
                touched: false,
                showlabel: true
            },
            frets: {
                elementType: "select",
                value: '',
                elementConfig: {
                    label: "Frets",
                    name: 'frets',
                    options: [
                        {
                            name: 21,
                            value: '21'
                        },
                        {
                            name: 21,
                            value: '21'
                        },
                        {
                            name: 24,
                            value: '24'
                        }
                    ]
                },
                validation: {
                    required: true
                },
                validationMessage: '',
                valid: false,
                touched: false,
                showlabel: true
            },
            publish: {
                elementType: "select",
                value: '',
                elementConfig: {
                    label: "Publish",
                    name: 'publish',
                    options: [
                        {
                            name: true,
                            value: 'Yes'
                        },
                        {
                            name: false,
                            value: 'No'
                        }
                    ]
                },
                validation: {
                    required: true
                },
                validationMessage: '',
                valid: false,
                touched: false,
                showlabel: true
            },
        }
    }
    updateForm = (element) => {
        let newFormData = update(element, this.state.formData, 'addProduct');
        this.setState({
            formData: newFormData
        })
    }
    render(){
        return (
            <div>
                <UserLayout>
                    <div>
                       <h1>Add Product</h1>

                       <form onSubmit={(e) => this.submitForm(e)}>
                            <FormField
                                id={'name'}
                                formData={this.state.formData.name}
                                changed={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'description'}
                                formData={this.state.formData.description}
                                changed={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'price'}
                                formData={this.state.formData.price}
                                changed={(element) => this.updateForm(element)}
                            />
                            <div className="form_devider">

                            </div>
                       </form>
                    </div>
                </UserLayout>
            </div>
        )
    }
}

const mapstateToProps = (state) => {
    return {
        products: state.products
    }
}
export default connect(mapstateToProps)(AddProduct);