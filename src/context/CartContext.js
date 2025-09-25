
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const initialState = []
    const [cartItems, setCartItems] = useState(initialState);

    const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existing = prevItems.find(item => item.id === product.id);
            if (existing) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeSingleItem = (product) => {
        setCartItems(prevItems => {
            const existing = prevItems.find(item => item.id === product.id);
            if (existing) {
                return prevItems.map(item =>
                    item.id === product.id
                        && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                return initialState;
            }
        });
    };

    const value = {
        cartItems,
        addToCart,
        removeSingleItem,
        removeItem
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
