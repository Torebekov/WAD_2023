import React, { useState, useEffect, useCallback } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

const calculateTotalAmount = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(calculateTotalAmount(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.name === product.name);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity++;
        return updatedItems;
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  const increaseItem = useCallback((product) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
      );
      return updatedItems;
    });
  }, []);

  const decreaseItem = useCallback((product) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      return updatedItems;
    });
  }, []);

  return (
    <div className="app">
      <ProductList addToCart={addToCart} />
      <Cart cartItems={cartItems} totalAmount={totalAmount} increaseItem={increaseItem} decreaseItem={decreaseItem} />
    </div>
  );
};

export default App;
