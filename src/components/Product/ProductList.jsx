import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ currentItems, handleDeleteItem }) => {

    if (currentItems.length === 0) {
        return <ProductItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <ProductItem
                item={item}
                handleDeleteItem={handleDeleteItem} key={index}
            />
        )
    });
}

export default ProductList;