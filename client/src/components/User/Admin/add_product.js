import React, {Component}  from 'react';
import UserLayout from '../../../hoc/user';
import FormField from '../../utils/Form/FormField';
import {update , generateData, isFomValid , populatedOptionFields,resetFields} from '../../utils/Form/FormActions';

import {connect} from 'react-redux';
import {getBrands, getWoods, addProduct, clearProduct} from '../../../store/actions/product_actions/productActions';

import FileUpload from '../../utils/FileUpload';

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
                            name: "Yes",
                            value: true
                        },
                        {
                            name: "No",
                            value: false
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
                            name: "Yes",
                            value: true
                        },
                        {
                            name: "No",
                            value: false
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
                            name: 22,
                            value: '22'
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
                            name: "Yes",
                            value: true
                        },
                        {
                            name: "No",
                            value: false
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
            images: {
                value: [],
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: false
            }
        }
    }
    componentDidMount(){
        const formData = this.state.formData;

        this.props.dispatch(getBrands()).then(res => {
            const newFormData =  populatedOptionFields(formData , this.props.products.brands, 'brand');
            this.updateFields(newFormData)
            console.log(this.props.products.brands);
        })

        this.props.dispatch(getWoods()).then(res => {
            const newFormData =  populatedOptionFields(formData , this.props.products.woods, 'wood');
            this.updateFields(newFormData)
            console.log(this.props.products.brands);
        })
    }
    updateForm = (element) => {
        let newFormData = update(element, this.state.formData, 'addProduct');
        this.setState({
            formData: newFormData
        })
    }
    updateFields = (newFormData) => {
        this.setState({
            formData: newFormData
        })
    }
     
    resetFieldHandler = () => {
        const newFormData = resetFields(this.state.formData, 'add_product');

        
        this.setState({
            formSuccess: true,
            formData: newFormData
        })
        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => {
                this.props.dispatch(clearProduct());
            })
        }, 3000)
    }
    submiForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'add_product');
        let formIsValid = isFomValid(this.state.formData, 'add_product');
        if (formIsValid) {
           this.props.dispatch(addProduct(dataToSubmit)).then(() => {
               if(this.props.products.addProduct.success){
                    this.resetFieldHandler();
               }else{
                    this.setState({formError: true});
               }
           })
        } else {
            this.setState({
                formError: true
            })
        }
    }
    imagesHandler = (images) => {
        const newFormData = {
            ...this.state.formData
        }
        newFormData["images"].value = images;
        newFormData["images"].valid = true;

        this.setState({
            formData: newFormData
        })
    }

    static getDerivedStateFromProps(props, state){
        
    }
    render(){
        return (
            <div>
                <UserLayout>
                    <div>
                       <h1>Add Product</h1>

                       <form onSubmit={(e) => this.submitForm(e)}>
                       {this.state.formSuccess  ? 
                                <div className="form_success" style={{ marginBottom: '30px' }}>
                                    Success..
                                </div>
                            :null
                            }
                            <FileUpload
                                imagesHandler={(images) => this.imagesHandler(images)}
                                reset={this.state.formSuccess}
                            />
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
                            <div className="form_devider"> </div>
                            <FormField
                                id={'brand'}
                                formData={this.state.formData.brand}
                                changed={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'shipping'}
                                formData={this.state.formData.shipping}
                                changed={(element) => this.updateForm(element)}
                            />

                             <FormField
                                id={'wood'}
                                formData={this.state.formData.wood}
                                changed={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'publish'}
                                formData={this.state.formData.publish}
                                changed={(element) => this.updateForm(element)}
                            />

                             <FormField
                                id={'frets'}
                                formData={this.state.formData.frets}
                                changed={(element) => this.updateForm(element)}
                            />

                             <FormField
                                id={'available'}
                                formData={this.state.formData.available}
                                changed={(element) => this.updateForm(element)}
                            />

                           

                            <div>
                                {this.state.formError ? 
                                        <div className="error_label">
                                            Something is not right with your form Please check through!
                                        </div>
                                : null }
                                <button onClick={(event) => this.submiForm(event)}>
                                       Add Product
                                </button>
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