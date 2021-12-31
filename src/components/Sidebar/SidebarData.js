import DropdownIcon from '@mui/icons-material/ArrowDropDown';
import DropupIcon from '@mui/icons-material/ArrowDropUp';
import HomeIcon from '@mui/icons-material/Home';
import CartIcon from '@mui/icons-material/ShoppingCart';
import HouseIcon from '@mui/icons-material/House';
import SellIcon from '@mui/icons-material/Sell';

const SidebarData = [
    {
        title: 'Trang chủ',
        path: '/',
        icon: <HomeIcon />,
    },
    {
        title: 'Sản phẩm',
        path: '/products',
        icon: <CartIcon />,
        iconClosed: <DropdownIcon />,
        iconOpened: <DropupIcon />,

        subNav: [
            {
                title: 'Danh sách sản phẩm',
                path: '/products',
                icon: '',
            },
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
        icon: <SellIcon />,
        iconClosed: <DropdownIcon />,
        iconOpened: <DropupIcon />,

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
        icon: <HouseIcon />
    },
];

export default SidebarData;