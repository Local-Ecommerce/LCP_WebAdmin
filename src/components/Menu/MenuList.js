import React from 'react';
import MenuItem from '../Menu/MenuItem';

const MenuList = ({ currentItems, handleDeleteItem }) => {

    if (currentItems.length === 0) {
        return <MenuItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <MenuItem
                item={item}
                handleDeleteItem={handleDeleteItem} key={index}
            />
        )
    });
}

export default MenuList;