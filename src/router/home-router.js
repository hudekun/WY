export default {
    path: '/home',
    component: ()=>import('../pages/home/Root'),
    children: [
        {
            path: 'cate/:id',
            component: ()=>import('../pages/home/CategoryList')
        }
    ]
}