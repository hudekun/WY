export default {
    path: '/home',
    component: ()=>import('../pages/home/Root'),
    children: [
        {
            path: 'cate/:id',
            component: ()=>import('../pages/home/CategoryList'),
            children: [
                //商品详情页
                {
                    path: 'detail/:id',
                    component: ()=>import('../pages/common/Detail')
                }
            ]
        },
        //商品详情页
        {
            path: 'detail/:id',
            component: ()=>import('../pages/common/Detail')
        }
    ]
}