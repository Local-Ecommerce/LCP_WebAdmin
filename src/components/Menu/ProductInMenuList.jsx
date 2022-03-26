import React from 'react';
import ProductInMenuItem from './ProductInMenuItem';

const ProductInMenuList = ({ currentItems }) => {

    if (currentItems.length === 0) {
        return <ProductInMenuItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <ProductInMenuItem
                item={item} index={index} key={index}
            />
        )
    });
}

export default ProductInMenuList;