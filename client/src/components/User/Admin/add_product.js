import React, {Component}  from 'react';
import UserLayout from '../../../hoc/user';
import FormField from '../../utils/Form/FormField';
import {update , generateData, isFormValid} from '../../utils/Form/FormActions';

import {connect} from 'react-redux';


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
export default connect()(AddProduct);