import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({ currentItems, getCreateItem, getEditItem, getDeleteItem }) => {

    if (currentItems.length === 0) {
        return <CategoryItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <CategoryItem
                item={item}
                getCreateItem={getCreateItem}
                getEditItem={getEditItem}
                getDeleteItem={getDeleteItem}
                key={index}
            />
        )
    });
}

export default CategoryList;