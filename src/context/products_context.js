import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url as url } from '../utils/constants';
import {
    TOGGLE_SIDEBAR,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

const initialState = {
    isSidebarOpen: false,
    products_loading: false,
    products_error: false,
    featured_products: [],
    products: [],
    single_product_loading: false,
    single_product_error: false,
    single_product: {}
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const toggleSidebar = (bool) => {
        dispatch({type: TOGGLE_SIDEBAR, payload: bool})
    }
    //Fetch all products
    const fetchProduts = async (url) => {
        try {
            dispatch({type: GET_PRODUCTS_BEGIN});
            const { data } = await axios.get(url);
            dispatch({type: GET_PRODUCTS_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: GET_PRODUCTS_ERROR})
        }
    }
    //Fetch a single product
    const fetchSingleProduct = async (url) => {
        dispatch({type: GET_SINGLE_PRODUCT_BEGIN})
        try {
            const {data: singleProduct} = await axios(url);
            dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct});
        } catch (error) {
            dispatch({type: GET_SINGLE_PRODUCT_ERROR});
        }
    }
    useEffect(() => {
        fetchProduts(url)
    }, [])
    return <ProductsContext.Provider value={{...state, toggleSidebar, fetchSingleProduct}}>
        {children}
    </ProductsContext.Provider>
};
// make sure use
export const useProductsContext = () => useContext(ProductsContext);
