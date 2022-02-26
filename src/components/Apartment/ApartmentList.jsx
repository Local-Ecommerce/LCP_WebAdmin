import React from 'react';
import ApartmentItem from './ApartmentItem';

const ApartmentList = ({ currentItems, handleGetEditItem, handleGetDeleteItem }) => {

    if (currentItems.length === 0) {
        return <ApartmentItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <ApartmentItem
                item={item} index={index} key={index}
                handleGetEditItem={handleGetEditItem}
                handleGetDeleteItem={handleGetDeleteItem}
            />
        )
    });
}

export default ApartmentList;