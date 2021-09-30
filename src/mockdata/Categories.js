const Categories = [
    {
        id: 1,
        name: 'Quần',
        discount: 1,
        master: null,
        child: [
            {
                id: 2,
                name: 'Quần đùi',
                discount: null,
                master: 1
            },
            {
                id: 3,
                name: 'Quần jean',
                discount: null,
                master: 1
            },
        ],
    },
    {
        id: 4,
        name: 'Áo',
        discount: 1,
        master: null,
        child: [
            {
                id: 5,
                name: 'Áo thun',
                discount: null,
                master: 4
            },
            {
                id: 6,
                name: 'Áo ba lỗ',
                discount: null,
                master: 4
            },
        ],
    },
    {
        id: 7,
        name: 'Thịt',
        discount: 2,
        master: null,
        child: [
            {
                id: 8,
                name: 'Thịt chế biến',
                discount: null,
                master: 7,
                child: [
                    {
                        id: 9,
                        name: 'Thịt heo',
                        discount: null,
                        master: 8
                    },
                ],
            },
            {
                id: 10,
                name: 'Thịt sống',
                discount: null,
                master: 7
            },
        ],
    },
    {
        id: 11,
        name: 'Thức uống',
        discount: 5,
        master: null
    },
];

export default Categories;