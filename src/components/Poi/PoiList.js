import React from 'react';
import PoiItem from './PoiItem';

const PoiList = ({ currentItems, handleDeleteItem }) => {

    if (currentItems.length === 0) {
        return <PoiItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <PoiItem
                item={item}
                handleDeleteItem={handleDeleteItem} key={index}
            />
        )
    });
}

export default PoiList;