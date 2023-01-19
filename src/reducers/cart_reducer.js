import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const {id, color, amount, product} = action.payload;
            //Search for item in cart array
            const tempItem = state.cart.find((item) => item.id === id + color); //id + color - makes unique item in cart with different colors 
            if(tempItem){
                const tempCart = state.cart.map((cartItem) => {
                    if(cartItem.id === tempItem.id){
                        let newAmount = cartItem.amount + amount
                        if(newAmount > cartItem.max){
                            newAmount = cartItem.max
                        }
                        return {...cartItem, amount: newAmount}
                    }else{
                        return cartItem
                    }
                })
                return {...state, cart: tempCart}
            }else{
                const newItem = {
                    id: id + color,
                    name: product.name,
                    color,
                    amount,
                    image: product.images[0].url,
                    price: product.price,
                    max: product.stock
                };
                return {...state, cart:[...state.cart, newItem]}
            }
        case REMOVE_CART_ITEM:
            return {...state, cart: state.cart.filter((item) => item.id !== action.payload)}
        case CLEAR_CART:
            return {...state, cart: []}
        case TOGGLE_CART_ITEM_AMOUNT:
            const {itemID, value} = action.payload
            const newItems = state.cart.map((item => {
                if(item.id === itemID){
                    if(value === 'increase'){
                        let newAmount = item.amount + 1;
                        if(newAmount > item.max){
                            newAmount = item.max;
                        }
                        return {...item, amount: newAmount}
                    }else{
                        let newAmount = item.amount - 1;
                        if(newAmount < 1){
                            newAmount = 1;
                        }
                        return {...item, amount: newAmount}
                    }
                }else{
                    return item;
                }
            }))
            return {...state, cart:[...newItems]}
        case COUNT_CART_TOTALS:
            const {total_items, total_amount} = state.cart.reduce((total, cartItem) => {
                const {amount, price} = cartItem;
                total.total_items += amount;
                total.total_amount += (amount * price);
                return total;
            },{total_amount: 0, total_items: 0})
            return {...state, total_items, total_amount}
        default:
            throw new Error(`No Matching "${action.type}" - action type`);
    }
};

export default cart_reducer;
