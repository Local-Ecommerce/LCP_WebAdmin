import React from 'react';
import PoiItem from './PoiItem';

const PoiList = ({ currentItems, handleGetDetailItem, handleGetToggleStatusItem }) => {

    if (currentItems.length === 0) {
        return <PoiItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <PoiItem
                item={item} index={index} key={index}
                handleGetDetailItem={handleGetDetailItem}
                handleGetToggleStatusItem={handleGetToggleStatusItem}
            />
        )
    });
}

export default PoiList;