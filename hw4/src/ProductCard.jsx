import React from 'react';
import PropTypes from 'prop-types';
import withHoverBorder from './hoc';
import './styles.css';

const ProductCard = ({ name, price, image, addToCart }) => {
    return (
        <div className="product-card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>Price: ${price}</p>
            <button onClick={() => addToCart({ name, price })}>Add to Cart</button>
        </div>
    );
};

ProductCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    addToCart: PropTypes.func.isRequired,
};

export default withHoverBorder(ProductCard);
