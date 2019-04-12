import React from 'react';
import {connect} from 'react-redux';



import {getProdcutDetail, clearProductDetail} from '../../store/actions/product_actions/productActions';
import PageTop from '../utils/page_top';


class ProductDetail extends React.Component {
    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.dispatch(getProdcutDetail(id));
        
    }
    componentWillUnmount(){
        this.props.dispatch(clearProductDetail());
    }
    render(){
        return (
            <div>
                <PageTop title="Product Detail" />
                <div className="container">
                    {
                        this.props.products.productDetail ? 
                        <div className="product_detail_wrapper">
                            <div className="left">
                                Images
                            </div>
                            <div className="right">
                             Info
                            </div>
                        </div>
                        :null
                    }
                </div>
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