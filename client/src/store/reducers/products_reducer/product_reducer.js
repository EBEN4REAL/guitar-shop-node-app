import {
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCTS_BY_SALE,
    GET_BRANDS,
    GET_WOODS,
    GET_SHOP_PRODUCTS
   } from '../../../store/actions/types';


const  rootReducer =  (state={} , action) => {
    
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
               return {...state, shop_products: action.payload}
          default:
               return state;
   }
}
export default rootReducer;