import React from 'react';
import PoiItem from './PoiItem';

const PoiList = ({ currentItems, handleGetDeleteItem }) => {

    if (currentItems.length === 0) {
        return <PoiItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <PoiItem
                item={item}
                handleGetDeleteItem={handleGetDeleteItem} index={index}
            />
        )
    });
}

export default PoiList;