import React from 'react';
import MenuItem from './MenuItem';

const MenuList = ({ currentItems, handleGetDetailItem }) => {

    if (currentItems.length === 0) {
        return <MenuItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <MenuItem
                item={item} index={index} key={index}
                handleGetDetailItem={handleGetDetailItem}
            />
        )
    });
}

export default MenuList;