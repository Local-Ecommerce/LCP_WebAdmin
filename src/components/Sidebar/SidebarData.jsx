import { Home, Category, Store, FormatListBulleted, LocationOn, Article, Apartment, NoteAdd } from '@mui/icons-material';
import * as Constant from '../../Constant';
import styled from 'styled-components';

const StyledHomeIcon = styled(Home)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;
const StyledCategoryIcon = styled(Category)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;
const StyledStoreIcon = styled(Store)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;
const StyledMenuIcon = styled(FormatListBulleted)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;
const StyledPoiIcon = styled(LocationOn)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;
const StyledCreateOrderIcon = styled(NoteAdd)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;
const StyledNewsIcon = styled(Article)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;
const StyledApartmentIcon = styled(Apartment)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;


const SidebarData = [
    {
        title: 'Trang chủ',
        path: '/',
        icon: <StyledHomeIcon />,
    },
    {
        title: 'Quản lí sản phẩm',
    },
    {
        title: 'Danh mục',
        path: '/categories',
        icon: <StyledCategoryIcon />,
        role: Constant.ADMIN
    },
    {
        title: 'Cửa hàng',
        path: '/stores',
        icon: <StyledStoreIcon />,
    },
    {
        title: 'Bảng giá',
        path: '/menus',
        icon: <StyledMenuIcon />,
    },
    {
        title: 'Quản lí thông tin',
    },
    {
        title: 'Chung cư',
        path: '/apartments',
        icon: <StyledApartmentIcon />,
        role: Constant.ADMIN
    },
    {
        title: 'Tạo đơn',
        path: '/createOrder',
        icon: <StyledCreateOrderIcon />,
        role: Constant.MARKET_MANAGER
    },
    {
        title: 'News',
        path: '/news',
        icon: <StyledNewsIcon />
    },
    {
        title: 'POIs',
        path: '/pois',
        icon: <StyledPoiIcon />
    }
];

export default SidebarData;