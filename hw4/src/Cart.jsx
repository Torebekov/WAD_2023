import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Cart = ({ cartItems, totalAmount, increaseItem, decreaseItem }) => {
    const filteredCartItems = cartItems.filter((item) => item.quantity > 0);

    return (
        <div className="cart">
            <h2>Cart</h2>
            <ul>
                {filteredCartItems.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price} - Quantity: {item.quantity}
                        <button onClick={() => increaseItem(item)}>+</button>
                        <button onClick={() => decreaseItem(item)}>-</button>
                    </li>
                ))}
            </ul>
            <p>Total Amount: ${totalAmount}</p>
        </div>
    );
};

Cart.propTypes = {
    cartItems: PropTypes.array.isRequired,
    totalAmount: PropTypes.number.isRequired,
    increaseItem: PropTypes.func.isRequired,
    decreaseItem: PropTypes.func.isRequired,
};

export default Cart;
