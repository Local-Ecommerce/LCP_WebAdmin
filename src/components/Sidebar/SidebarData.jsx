import { Home, Category, Store, Sell, LocationOn, Article, Apartment } from '@mui/icons-material';
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
const StyledSellIcon = styled(Sell)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;
const StyledLocationOnIcon = styled(LocationOn)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;
const StyledArticleIcon = styled(Article)`
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
        role: Constant.ADMIN
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
        icon: <StyledSellIcon />,
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
        title: 'News',
        path: '/news',
        icon: <StyledArticleIcon />
    },
    {
        title: 'POIs',
        path: '/pois',
        icon: <StyledLocationOnIcon />
    }
];

export default SidebarData;