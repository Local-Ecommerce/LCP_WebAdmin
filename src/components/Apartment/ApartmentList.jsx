import React from 'react';
import ApartmentItem from './ApartmentItem';

const ApartmentList = ({ currentItems, handleGetDeleteItem }) => {

    if (currentItems.length === 0) {
        return <ApartmentItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <ApartmentItem
                item={item}
                handleGetDeleteItem={handleGetDeleteItem} key={index}
            />
        )
    });
}

export default ApartmentList;