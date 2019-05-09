export default {
    path: '/category',
    component: ()=>import('../pages/category/Root'),
    children: [
        {
            path: 'sub-cate/:categoryId/:subCategoryId',
            component: ()=>import('../pages/category/SubCateList'),
            children: [
                //商品详情页
                {
                    path: 'detail/:id',
                    component: ()=>import('../pages/common/Detail')
                }
            ]
        }
    ]
}