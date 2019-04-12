import {
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCTS_BY_SALE,
    GET_BRANDS,
    GET_WOODS,
    GET_SHOP_PRODUCTS,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    ADD_BRAND,
    ADD_WOOD,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL
   } from '../../../store/actions/types';


const  productReducer =  (state={} , action) => {
    
   switch(action.type){
          case GET_PRODUCTS_BY_ARRIVAL:
               return  {...state, byArrival: action.payload};
          case GET_PRODUCTS_BY_SALE:
               return {...state, bySale: action.payload}
          case GET_BRANDS:
               return {...state, brands: action.payload} 
          case GET_WOODS:
                return {...state, woods: action.payload} 
          case GET_SHOP_PRODUCTS:
               return {...state, toShop: action.payload.articles, toShopSize: action.payload.size}
          case ADD_PRODUCT:
               return {...state, addProduct: action.payload} 
          case CLEAR_PRODUCT:
                return {...state, addProduct: action.payload} 
          case ADD_BRAND:
               return {...state, addBrand: action.payload.success,
                                 brands: action.payload.brands}
          case ADD_WOOD:
               return {...state, addWood: action.payload.success, 
                                 woods: action.payload.woods}
          case GET_PRODUCT_DETAIL:
               return {...state, productDetail: action.payload}
          case CLEAR_PRODUCT_DETAIL: 
               return {...state, productDetail: action.payload}
          default:
          return state;
   }
}
export default productReducer;