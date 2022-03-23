import React from 'react';
import StoreItem from '../Store/StoreItem';

const StoreList = ({ currentItems }) => {

    if (currentItems.length === 0) {
        return <StoreItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <StoreItem
                item={item} index={index} key={index}
            />
        )
    });
}

export default StoreList;