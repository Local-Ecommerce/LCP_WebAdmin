import React from 'react';
import MenuInStoreItem from './MenuInStoreItem';

const MenuInStoreList = ({ currentItems, menuId }) => {

    if (currentItems.length === 0) {
        return <MenuInStoreItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <MenuInStoreItem
                item={item} index={index} key={index}
                menuId={menuId}
            />
        )
    });
}

export default MenuInStoreList;