import { Home, Category, Store, FormatListBulleted, ShoppingCart, LocationOn, Article, Apartment, NoteAdd, AccountBox } from '@mui/icons-material';
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
const StyledProductIcon = styled(ShoppingCart)`
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
const StyledAccountIcon = styled(AccountBox)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;


const SidebarData = [
    {
        title: 'Trang chủ',
        path: '/',
        icon: <StyledHomeIcon />,
    },
    {
        title: 'Danh mục',
        path: '/categories',
        icon: <StyledCategoryIcon />,
        role: Constant.ADMIN
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
        title: 'Cư dân',
        path: '/residents',
        icon: <StyledAccountIcon />,
        role: Constant.MARKET_MANAGER
    },
    {
        title: 'Sản phẩm',
        path: '/products',
        icon: <StyledProductIcon />,
        role: Constant.MARKET_MANAGER
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
        title: 'News',
        path: '/news',
        icon: <StyledNewsIcon />
    },
    {
        title: 'POIs',
        path: '/pois',
        icon: <StyledPoiIcon />
    },
];

export default SidebarData;