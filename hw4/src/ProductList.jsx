import React from 'react';
import ProductCard from './ProductCard';

const products = [
    { name: 'Orange shirt', price: 10, image: require('./images/black.png') },
    { name: 'Black shirt', price: 15, image: require('./images/orange.png') },
];

const ProductList = ({ addToCart }) => {
    return (
        <div className="product-list">
            <h2>Products</h2>
            {products.map((product, index) => (
                <ProductCard key={index} {...product} addToCart={addToCart} />
            ))}
        </div>
    );
};

export default ProductList;
