import {
    ArrowDropDown,
    ArrowDropUp,
    Home,
    ShoppingCart,
    House,
    Sell,
    LocationOn,
    Article,
    Apartment
} from '@mui/icons-material';
import * as Constant from '../../Constant';


const SidebarData = [
    {
        title: 'Trang chủ',
        path: '/',
        icon: <Home />,
    },
    {
        title: 'Sản phẩm',
        path: null,
        icon: <ShoppingCart />,
        iconClosed: <ArrowDropDown />,
        iconOpened: <ArrowDropUp />,
        role: Constant.ADMIN,

        subNav: [
            {
                title: 'Danh mục',
                path: '/categories',
                icon: ''
            },
        ]
    },
    {
        title: 'Sản phẩm',
        path: '/',
        icon: <ShoppingCart />,
        role: Constant.MARKET_MANAGER
    },
    {
        title: 'Quản lý cửa hàng',
        path: null,
        icon: <House />,
        iconClosed: <ArrowDropDown />,
        iconOpened: <ArrowDropUp />,

        subNav: [
            {
                title: 'Danh sách cửa hàng',
                path: '/stores',
                icon: ''
            },
            {
                title: 'Danh sách bảng giá',
                path: '/menus',
                icon: '',
            }
        ]
    },
    {
        title: 'Chung cư',
        path: '/apartments',
        icon: <Apartment />,
        role: Constant.ADMIN
    },
    {
        title: 'News',
        path: '/news',
        icon: <Article />
    },
    {
        title: 'POIs',
        path: '/pois',
        icon: <LocationOn />
    }
];

export default SidebarData;