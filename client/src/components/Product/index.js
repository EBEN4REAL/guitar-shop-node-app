import React from 'react';
import {connect} from 'react-redux';



import {getProdcutDetail, clearProductDetail} from '../../store/actions/product_actions/productActions';
import PageTop from '../utils/page_top';


class ProductDetail extends React.Component {
    componentDidMount(){
        const id = this.props.match.params.id;
    }
    render(){
        return (
            <div>
                Products
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ProductDetail);