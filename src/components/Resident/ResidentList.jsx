import React from 'react';
import ResidentItem from './ResidentItem';

const ResidentList = ({ currentItems, handleGetToggleStatusItem }) => {

    if (currentItems.length === 0) {
        return <ResidentItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <ResidentItem
                item={item} index={index} key={index}
                handleGetToggleStatusItem={handleGetToggleStatusItem}
            />
        )
    });
}

export default ResidentList;