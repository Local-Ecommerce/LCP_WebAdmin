import { React } from 'react';
import NotificationResidentItem from './NotificationResidentItem';

const NotificationResidentList = ({ currentItems, handleGetDetailItem }) => {

    return currentItems && currentItems.map((item, index) => {
        return (
            <NotificationResidentItem 
                item={item} key={index} 
                handleGetDetailItem={handleGetDetailItem}
            />
        )
    });
}

export default NotificationResidentList;