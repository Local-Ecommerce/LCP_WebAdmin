import {
    ArrowDropDown,
    ArrowDropUp,
    Home,
    ShoppingCart,
    House,
    Sell,
    LocationOn,
    Article
} from '@mui/icons-material';

const SidebarData = [
    {
        title: 'Trang chủ',
        path: '/',
        icon: <Home />,
    },
    {
        title: 'Sản phẩm',
        path: '/',
        icon: <ShoppingCart />,
        iconClosed: <ArrowDropDown />,
        iconOpened: <ArrowDropUp />,

        subNav: [
            {
                title: 'Bộ sưu tập',
                path: '/collections',
                icon: ''
            },
            {
                title: 'Danh mục',
                path: '/categories',
                icon: '',
            },
        ]
    },
    {
        title: 'Bảng giá',
        path: '/menus',
        icon: <Sell />,
        iconClosed: <ArrowDropDown />,
        iconOpened: <ArrowDropUp />,

        subNav: [
            {
                title: 'Danh sách bảng giá',
                path: '/menus',
                icon: '',
            },
            {
                title: 'Cửa hàng áp dụng',
                path: '/applicables',
                icon: '',
            },
        ]
    },
    {
        title: 'Cửa hàng',
        path: '/stores',
        icon: <House />
    },
    {
        title: 'POIs',
        path: '/pois',
        icon: <LocationOn />
    },
    {
        title: 'News',
        path: '/news',
        icon: <Article />
    },
];

export default SidebarData;