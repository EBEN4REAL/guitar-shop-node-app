import React, {Component}  from 'react';
import UserLayout from '../../../hoc/user';
import FormField from '../../utils/Form/FormField';
import {update , generateData, isFormValid} from '../../utils/Form/FormActions';

import {connect} from 'react-redux';
import {getBrands, getWoods} from '../../../store/actions/product_actions/productActions';

class AddProduct extends Component {
    render(){
        return (
            <div>
                <UserLayout>
                    <div>
                        Add product.
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
export default connect()(AddProduct);