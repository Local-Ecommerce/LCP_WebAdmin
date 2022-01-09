const Categories = [
    {
        id: 1,
        name: 'Quần',
        parent: null,
        level: 1,
        child: [
            {
                id: 2,
                name: 'Quần đùi',
                parent: 1,
                level: 2
            },
            {
                id: 3,
                name: 'Quần jean',
                parent: 1,
                level: 2
            },
        ],
    },
    {
        id: 4,
        name: 'Áo',
        parent: null,
        level: 1,
        child: [
            {
                id: 5,
                name: 'Áo thun',
                parent: 4,
                level: 2
            },
            {
                id: 6,
                name: 'Áo ba lỗ',
                parent: 4,
                level: 2
            },
        ],
    },
    {
        id: 7,
        name: 'Thịt',
        parent: null,
        level: 1,
        child: [
            {
                id: 8,
                name: 'Thịt chế biến',
                parent: 7,
                level: 2,
                child: [
                    {
                        id: 9,
                        name: 'Thịt heo',
                        parent: 8,
                        level: 3
                    },
                    {
                        id: 12,
                        name: 'Thịt bò',
                        parent: 8,
                        level: 3
                    },
                    {
                        id: 13,
                        name: 'Thịt gà',
                        parent: 8,
                        level: 3
                    },
                ],
            },
            {
                id: 10,
                name: 'Thịt sống',
                parent: 7,
                level: 2
            },
        ],
    },
    {
        id: 11,
        name: 'Thức uống',
        parent: null,
        level: 1
    },
    {
        id: 14,
        name: 'Thực phẩm tinh bột',
        parent: null,
        level: 1,
        child: [
            {
                id: 15,
                name: 'Bánh mì',
                parent: 14,
                level: 2
            },
            {
                id: 16,
                name: 'Ngũ cốc',
                parent: 14,
                level: 2
            }
        ]
    },
];

export default Categories;