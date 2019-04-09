import React from 'react';
import UserLayout from '../../../hoc/user';
import FormField from '../../utils/Form/FormField';
import {update , generateData, isFomValid ,resetFields} from '../../utils/Form/FormActions';

import {connect} from 'react-redux';
import {getBrands, addBrand} from '../../../store/actions/product_actions/productActions';


class ManageBrands extends React.Component{
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                elementType: "input",
                value: '',
                elementConfig: {
                    label: "Brand name",
                    name: 'product_name',
                    type: 'text',
                    placeholder: 'Enter the brand'
                },
                validation: {
                    required: true
                },
                validationMessage: '',
                valid: false,
                touched: false,
            },
        }
    }

    componentDidMount(){
        this.props.dispatch(getBrands());
        
    }
    showCategoryItems = () => {
        return (
            this.props.products.brands ? 
                this.props.products.brands.map((item, i) => {
                    return (
                        <div className="category_item" key={item._id}>
                            {item.name}
                        </div>
                    )

                })
            :null
        )
    }
    resetFieldsHandler = () => {
        const newFormData = resetFields(this.state.formData, 'brands');

        
        this.setState({
            formSuccess: true,
            formData: newFormData
        })
    }
    submiForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'brands');
        let formIsValid = isFomValid(this.state.formData, 'brands');
        let existingBrands = this.props.products.brands;

        if (formIsValid) {
            this.props.dispatch((addBrand(dataToSubmit, existingBrands))).then(res => {
               if(res.payload.success){
                    this.resetFieldsHandler();
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
    updateForm = (element) => {
        let newFormData = update(element, this.state.formData, 'brands');
        this.setState({
            formData: newFormData
        })
    }
    render(){
        return (
            <div className="admin_category_wrapper">
                <h1>Brands</h1>
                <div className="admin_two_column"> 
                    <div className="left">
                        <div className="brands_container">
                            {this.showCategoryItems()}
                        </div>
                    </div>
                    <div className="left">
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormField
                                id={'name'}
                                formData={this.state.formData.name}
                                changed={(element) => this.updateForm(element)}
                            />
                        </form>
                        <div>
                            {this.state.formError ? 
                                            <div className="error_label">
                                                Something is not right with your form Please check through!
                                            </div>
                                    : null }
                                    <button onClick={(event) => this.submiForm(event)}>
                                        Add Brand
                                    </button>
                        </div>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ManageBrands);