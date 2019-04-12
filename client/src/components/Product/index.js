import React from 'react';
import {connect} from 'react-redux';


import PageTop from '../utils/page_top';


class ProductDetail extends React.Component {
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