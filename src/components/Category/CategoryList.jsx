import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({ currentItems, handleGetDeleteItem, filterStatus }) => {

    if (currentItems.length === 0) {
        return <CategoryItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <CategoryItem
                item={item}
                handleGetDeleteItem={handleGetDeleteItem}
                filterStatus={filterStatus}
                key={index}
            />
        )
    });
}

export default CategoryList;