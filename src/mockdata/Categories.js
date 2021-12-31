const Categories = [
    {
        id: 1,
        name: 'Quần',
        discount: 1,
        parent: null,
        level: 1,
        child: [
            {
                id: 2,
                name: 'Quần đùi',
                discount: 1,
                parent: 1,
                level: 2
            },
            {
                id: 3,
                name: 'Quần jean',
                discount: 1,
                parent: 1,
                level: 2
            },
        ],
    },
    {
        id: 4,
        name: 'Áo',
        discount: 1,
        parent: null,
        level: 1,
        child: [
            {
                id: 5,
                name: 'Áo thun',
                discount: 1,
                parent: 4,
                level: 2
            },
            {
                id: 6,
                name: 'Áo ba lỗ',
                discount: 1,
                parent: 4,
                level: 2
            },
        ],
    },
    {
        id: 7,
        name: 'Thịt',
        discount: 2,
        parent: null,
        level: 1,
        child: [
            {
                id: 8,
                name: 'Thịt chế biến',
                discount: 2,
                parent: 7,
                level: 2,
                child: [
                    {
                        id: 9,
                        name: 'Thịt heo',
                        discount: 2,
                        parent: 8,
                        level: 3
                    },
                    {
                        id: 12,
                        name: 'Thịt bò',
                        discount: 2,
                        parent: 8,
                        level: 3
                    },
                    {
                        id: 13,
                        name: 'Thịt gà',
                        discount: 2,
                        parent: 8,
                        level: 3
                    },
                ],
            },
            {
                id: 10,
                name: 'Thịt sống',
                discount: 2,
                parent: 7,
                level: 2
            },
        ],
    },
    {
        id: 11,
        name: 'Thức uống',
        discount: 5,
        parent: null,
        level: 1
    },
    {
        id: 14,
        name: 'Thực phẩm tinh bột',
        discount: 5,
        parent: null,
        level: 1,
        child: [
            {
                id: 15,
                name: 'Bánh mì',
                discount: 5,
                parent: 14,
                level: 2
            },
            {
                id: 16,
                name: 'Ngũ cốc',
                discount: 5,
                parent: 14,
                level: 2
            }
        ]
    },
];

export default Categories;