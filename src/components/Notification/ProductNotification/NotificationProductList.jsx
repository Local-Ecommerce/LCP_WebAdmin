import { React } from 'react';
import NotificationProductItem from './NotificationProductItem';

const NotificationProductList = ({ currentItems, handleGetDetailItem }) => {

    return currentItems && currentItems.map((item, index) => {
        return (
            <NotificationProductItem 
                item={item} key={index} 
                handleGetDetailItem={handleGetDetailItem}
            />
        )
    });
}

export default NotificationProductList;