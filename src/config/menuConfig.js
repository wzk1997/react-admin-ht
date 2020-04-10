// 存储左侧列表

const menuList = [
    {
    title:'首页',
    key:'/home',
    icom:'home'
    },
    {
        title: '商品',
        key: '/prodcy',
        icom: 'appstore',
        children:[
            {
                title:'品类管理',
                key:'/categroy',
                icom:'bars',
            },
            {
                title:'商品管理',
                key:'/product',
                icom:'tool',
            }
        ]
    },
    {
        title:'用户管理',
        key:'/User',
        icom:'user'
    },
    {
        title:'权限管理',
        key:'/role',
        icom:'safety'
    },
    {
        title:'图形图标',
        key:'/charts',
        icom:'area-chart',
        children: [
            {
                title:'折线图',
                key: '/charts/line',
                icom:'line-chart',
            },
            {
                title:'饼状图',
                key: '/charts/pie',
                icom:'pie-chart',
            },
            {
                title:'柱状图',
                key: '/charts/bar',
                icom:'bar-chart',
            },
        ]

    },
];
export default menuList
//默认暴露可以写任意名字