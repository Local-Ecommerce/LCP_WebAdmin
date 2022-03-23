import React from 'react';
import ApartmentResidentItem from './ApartmentResidentItem';

const ApartmentResidentList = ({ currentItems }) => {

    if (currentItems.length === 0) {
        return <ApartmentResidentItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <ApartmentResidentItem
                item={item} index={index} key={index}
            />
        )
    });
}

export default ApartmentResidentList;