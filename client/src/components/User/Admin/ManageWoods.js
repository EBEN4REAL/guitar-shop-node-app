import React from 'react';
import UserLayout from '../../../hoc/user';

import FormField from '../../utils/Form/FormField';
import {update , generateData, isFomValid ,resetFields} from '../../utils/Form/FormActions';

import {connect} from 'react-redux';
import {getWoods , addWood} from '../../../store/actions/product_actions/productActions';


class ManageWoods  extends React.Component {
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
        this.props.dispatch(getWoods());
        
    }
    resetFieldsHandler = () => {
        const newFormData = resetFields(this.state.formData, 'brands');

        
        this.setState({
            formSuccess: true,
            formData: newFormData
        })
    }
    updateForm = (element) => {
        let newFormData = update(element, this.state.formData, 'brands');
        this.setState({
            formData: newFormData
        })
    }
    showCategoryItems = () => {
        return (
            this.props.products.woods ? 
                this.props.products.woods.map((item, i) => {
                    return (
                        <div className="category_item" key={item._id}>
                            {item.name}
                        </div>
                    )

                })
            :null
        )
    }
    submiForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'woods');
        let formIsValid = isFomValid(this.state.formData, 'woods');
        let existingWoods = this.props.products.woods;

        if (formIsValid) {
            this.props.dispatch(addWood(dataToSubmit, existingWoods)).then(res => {
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
    render() {
        return (
            <div className="admin_category_wrapper">
                <h1>Woods</h1>
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
                                        Add Wood
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

export default connect(mapStateToProps)(ManageWoods);