import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
    CLEAR_CART,
    COUNT_CART_TOTALS,
} from '../actions';

const getCartItems = () => {
    //gets cart items from local storage
    const cart = localStorage.getItem('cart');
    if(cart){
        return JSON.parse(cart)
    }else{
        return []
    }
}

const initialState = {
    cart: getCartItems(),
    total_items: 0,
    total_amount: 0,
    shipping_fee: 534
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //ADD TO CART
    const addToCart = (id, color, amount, product) => {
        dispatch({type: ADD_TO_CART, payload: {id, color, amount, product}})
    }
    //REMOVE
    const removeCartItem = (id) => {
        dispatch({type: REMOVE_CART_ITEM, payload: id})
    }
    //TOGGLE AMOUNT
    const toggleItemAmount = (itemID, value) => {
        console.log(itemID, value)
        dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: {itemID, value}})
    }
    //CLEAR THE CART
    const clearCart = () => {
        dispatch({type: CLEAR_CART})
    }
    //DID MOUNT
    useEffect(() => {
        dispatch({type:COUNT_CART_TOTALS});
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },[state.cart])
    return <CartContext.Provider value={{...state, addToCart, removeCartItem, toggleItemAmount, clearCart}}>{children}</CartContext.Provider>
};

export const useCartContext = () => useContext(CartContext);
