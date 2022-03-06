import React from 'react';
import ApartmentItem from './ApartmentItem';

const ApartmentList = ({ currentItems, handleGetEditItem, handleGetToggleStatusItem }) => {

    if (currentItems.length === 0) {
        return <ApartmentItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <ApartmentItem
                item={item} index={index} key={index}
                handleGetEditItem={handleGetEditItem}
                handleGetToggleStatusItem={handleGetToggleStatusItem}
            />
        )
    });
}

export default ApartmentList;