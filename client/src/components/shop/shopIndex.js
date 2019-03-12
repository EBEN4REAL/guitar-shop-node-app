import React, { Component } from 'react';
import PageTop from '../utils/page_top';

import  FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag'

import { frets,price } from '../utils/Form/fixedCategories';

import { connect } from 'react-redux';
import { getBrands, getWoods, getProductsToShop} from '../../store/actions/product_actions/productActions';

import CollapseCheckbox from '../utils/CollapseCheckBox';
import CollapseRadio from '../utils/CollapseRadio';
import LoadMoreSection from '../shop/loadMoreProductsShop';

class Shop extends Component {

    state = {
        grid:'',
        limit:6,
        skip:0,
        filters:{
            brand:[],
            frets:[],
            wood:[],
            price:[]
        }
    }

    componentDidMount(){
        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());

        this.props.dispatch(getProductsToShop(
            this.state.skip,
            this.state.limit,
            this.state.filters
        ))
    }

    handlePrice = (value) => {
        const data = price;
        let array = [];

        for(let key in data){
            
            if(data[key]._id === parseInt(value)){
                array = data[key].array
            }
        }
        return array;
    }
    showFilteredResults = (filters) => {
        this.props.dispatch(getProductsToShop(
            0,
            this.state.limit,
            filters
        )).then(() => {
            this.setState({
                skip: 0
            })
        })
    }

    handleFilters = (filters,category) => {
       const newFilters = {...this.state.filters}
       newFilters[category] = filters;

        if(category === "price"){
            let priceValues = this.handlePrice(filters);
            newFilters[category] = priceValues
        }
        this.showFilteredResults(newFilters);
       this.setState({
           filters: newFilters
       })
    }
    loadMore = () => {
        console.log(this.state.skip);
        console.log(this.state.skip);
        let skip = this.state.skip  + this.state.limit;
        this.props.dispatch(getProductsToShop(
            skip,
            this.state.limit, 
            this.state.filters,
            this.props.products.toShop
        )).then(() => {
            this.setState({
                skip
            })
        })
    }
    render() {
        console.log(this.props.filters)
        const products = this.props.products;
        console.log(products);
        return (
            <div>
                <PageTop
                    title="Browse Products"
                />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                         <CollapseCheckbox
                                initState={true}
                                title="Brands"
                                list={products.brands}
                                handleFilters={(filters)=> this.handleFilters(filters,'brand')}
                            />
                             <CollapseCheckbox
                                initState={false}
                                title="Frets"
                                list={frets}
                                handleFilters={(filters)=> this.handleFilters(filters,'frets')}
                            />
                            <CollapseCheckbox
                                initState={false}
                                title="Wood"
                                list={products.woods}
                                handleFilters={(filters)=> this.handleFilters(filters,'wood')}
                            />
                             <CollapseRadio
                                initState={true}
                                title="Price"
                                list={price}
                                handleFilters={(filters)=> this.handleFilters(filters,'price')}
                            />
                           
                        </div>
                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    grids
                                </div>
                            </div>
                            <div>
                                <LoadMoreSection
                                    grid={this.state.grid}
                                    limit={this.state.limit}
                                    size={products.toShopSize}
                                    products={products.toShop}
                                    loadMore={() => this.loadMore()}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Shop);