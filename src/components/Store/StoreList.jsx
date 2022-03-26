import React from 'react';
import StoreItem from '../Store/StoreItem';

const StoreList = ({ currentItems, handleGetRejectItem, handleGetApproveItem, handleGetDetailItem }) => {

    if (currentItems.length === 0) {
        return <StoreItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <StoreItem
                item={item} key={index}
                handleGetDetailItem={handleGetDetailItem}
                handleGetRejectItem={handleGetRejectItem}
                handleGetApproveItem={handleGetApproveItem}
            />
        )
    });
}

export default StoreList;