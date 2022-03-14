import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ currentItems, handleGetRejectItem, handleGetApproveItem, handleGetDetailItem }) => {

    if (currentItems.length === 0) {
        return <ProductItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <ProductItem
                item={item} index={index} key={index}
                handleGetRejectItem={handleGetRejectItem}
                handleGetApproveItem={handleGetApproveItem}
                handleGetDetailItem={handleGetDetailItem}
            />
        )
    });
}

export default ProductList;