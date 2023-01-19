import {
    LOAD_PRODUCTS,
    SET_VIEW,
    CHANGE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            //finding max price of products
            const prices = action.payload.map((product => product.price));
            const maxPrice = Math.max(...prices);
            return {
                ...state,
                all_products: [...action.payload],
                filtered_products: [...action.payload],
                filters:{
                    ...state.filters,
                    max_price: maxPrice,
                    price: maxPrice
                }
            }
        case SET_VIEW:
            //changes view
            if(action.payload === 'grid'){
                return {
                    ...state,
                    grid_view: true
                }
            }else{
                return {
                    ...state,
                    grid_view: false
                }
            }
        case CHANGE_SORT:
            return {
                ...state,
                sort: action.payload
            }
        case SORT_PRODUCTS:
            let sorted = []
            if(state.sort === "price-lowest"){
                sorted  = state.filtered_products.sort((a, b) => a.price - b.price)
                return {...state, filtered_products: [...sorted]}
            }
            if(state.sort === "price-highest"){
                sorted  = state.filtered_products.sort((a, b) => b.price - a.price)
                return {...state, filtered_products: [...sorted]}
            }
            if(state.sort === "name-a"){
                sorted  = state.filtered_products.sort((a, b) => a.name.localeCompare(b.name))
                return {...state, filtered_products: [...sorted]}
            }
            if(state.sort === "name-z"){
                sorted  = state.filtered_products.sort((a, b) => b.name.localeCompare(a.name))
                return {...state, filtered_products: [...sorted]}
            }
            return {...state}
        case UPDATE_FILTERS:
            const {name, value} = action.payload
            return{...state, filters: {...state.filters, [name]: value}}
        case FILTER_PRODUCTS:
            const { all_products } = state;
            const { text, category, company, color, price, shipping } = state.filters;
            let tempProducts = [...all_products];
            //text filter
            if(text){
                //if there is some text then filter products that start with this text  
                tempProducts = tempProducts.filter((item) => item.name.toLowerCase().startsWith(text));
            }
            //category filter
            if(category !== 'все'){
                tempProducts = tempProducts.filter((item) => item.category === category);
            }
            //company filter
            if(company !== 'все'){
                tempProducts = tempProducts.filter((item) => item.company === company);
            }
            //color
            if(color !== 'все'){
                tempProducts = tempProducts.filter((item) => item.colors.includes(color))
            }
            //shipping
            if(shipping){
                tempProducts = tempProducts.filter((item) => item.shipping)
            }
            //price
            tempProducts = tempProducts.filter((item) => item.price <= price)
            return {...state, filtered_products: tempProducts}
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: '',
                    category: 'все',
                    company: 'все',
                    color: 'все',
                    price: state.filters.max_price,
                    shipping: false
                }
            }
        default:
            throw new Error(`No Matching "${action.type}" - action type`);
    }
    
};

export default filter_reducer;
