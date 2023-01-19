import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
    LOAD_PRODUCTS,
    SET_VIEW,
    CHANGE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
    filtered_products: [],
    all_products: [],
    grid_view: true,
    sort: 'price-lowest',
    filters: {
        text: '',
        category: 'все',
        company: 'все',
        color: 'все',
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false
    }
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
    const { products } = useProductsContext();
    const [state, dispatch] = useReducer(reducer, initialState);

    const toggleView = (view) => {
        //this function sets view of products on products page
        dispatch({type:SET_VIEW, payload: view})
    }
    const changeSort = (e) => {
        //this function sorts products on products page
        const {value} = e.target;
        dispatch({type: CHANGE_SORT, payload: value})
    }
    const updateFilters = (e) => {
        // this filters products
        let name = e.target.name;
        let value = e.target.value;
        if(name === 'category' || name === 'color'){
            value = e.target.dataset.value
        }
        if(name === 'company'){
            value = e.target.value
        }
        if(name === 'price'){
            value = Number(value)
        }
        if(name === 'shipping'){
            value = e.target.checked
        }
        dispatch({type: UPDATE_FILTERS, payload:{name, value}})
    }
    const clearFilters = () => {
        dispatch({type: CLEAR_FILTERS})
    }
    //did mount
    useEffect(() => {
        dispatch({type: LOAD_PRODUCTS, payload: products})
    }, [products])
    useEffect(() => {
        dispatch({type: FILTER_PRODUCTS})
        dispatch({type: SORT_PRODUCTS})
    }, [products, state.sort, state.filters])

    return <FilterContext.Provider value={{...state, toggleView, changeSort, updateFilters, clearFilters}}>
            {children}
        </FilterContext.Provider>
};
// make sure use
export const useFilterContext = () => useContext(FilterContext);
