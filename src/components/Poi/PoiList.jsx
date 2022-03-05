import React from 'react';
import PoiItem from './PoiItem';

const PoiList = ({ currentItems, handleGetEditItem, handleGetToggleStatusItem }) => {

    if (currentItems.length === 0) {
        return <PoiItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <PoiItem
                item={item} index={index} key={index}
                handleGetEditItem={handleGetEditItem}
                handleGetToggleStatusItem={handleGetToggleStatusItem}
            />
        )
    });
}

export default PoiList;