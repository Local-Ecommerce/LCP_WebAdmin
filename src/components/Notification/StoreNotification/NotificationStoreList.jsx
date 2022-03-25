import { React } from 'react';
import NotificationStoreItem from './NotificationStoreItem';

const NotificationStoreList = ({ currentItems, handleGetDetailItem }) => {

    return currentItems && currentItems.map((item, index) => {
        return (
            <NotificationStoreItem 
                item={item} key={index} 
                handleGetDetailItem={handleGetDetailItem}
            />
        )
    });
}

export default NotificationStoreList;