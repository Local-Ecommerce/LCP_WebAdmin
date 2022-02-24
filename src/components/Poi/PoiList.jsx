import React from 'react';
import PoiItem from './PoiItem';

const PoiList = ({ currentItems, handleGetEditItem, handleGetDeleteItem }) => {

    if (currentItems.length === 0) {
        return <PoiItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <PoiItem
                item={item} index={index}
                handleGetEditItem={handleGetEditItem}
                handleGetDeleteItem={handleGetDeleteItem}
            />
        )
    });
}

export default PoiList;