import React from 'react';
import StoreMenuItem from './StoreMenuItem';

const StoreMenuList = ({ currentItems, search, status }) => {

    if (currentItems.length === 0) {
        return <StoreMenuItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <StoreMenuItem
                item={item} index={index} key={index}
                search={search} status={status}
            />
        )
    });
}

export default StoreMenuList;