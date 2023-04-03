import { createContext, useEffect, useReducer, useState } from 'react';
import { cartReducer } from '../reducer/cartReducer';

export const CartContext = createContext();

function CartContextProvider({ children }) {

    const dataCart = JSON.parse(localStorage.getItem('cart')) || [];
    const [cartState, dispatch] = useReducer(cartReducer, dataCart);
    const [refCart, setRefCart] = useState();

    useEffect(() => {
        if (cartState.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartState));
        } else localStorage.removeItem('cart');
    }, [cartState]);

    const cartContexData = { cartState, dispatch, refCart, setRefCart };
    return (
        <CartContext.Provider value={cartContexData}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;
