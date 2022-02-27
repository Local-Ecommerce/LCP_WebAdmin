import React from 'react';
import MenuItem from './MenuItem';

const MenuList = ({ currentItems, handleGetDeleteItem }) => {

    if (currentItems.length === 0) {
        return <MenuItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <MenuItem
                item={item} index={index} key={index}
                handleGetDeleteItem={handleGetDeleteItem}
            />
        )
    });
}

export default MenuList;