//统一管理后台的url接口

/**
 * 商品总数接口
 * method: GET
 * params: 无
 */
const GOODS_TOTAL_API = '/api/goodsItem/total';

/**
 * 首页头部菜单列表接口
 * method: GET
 * params: 无
 */
const HOME_MENU_API = '/api/catelist';

/**
 * 首页轮播图数据接口
 * method: GET
 * params: 无
 */
const HOME_BANNER_API = '/api/home/bannerlist';

/**
 * 网易严选协议接口
 * method: GET
 * params: 无
 *  */
const POLICY_API = '/api/policylist';

/**
 * 首页分类列表接口
 * method: GET
 * params: 无
 */
const HOME_CATE_API = '/api/home/catelist';

/**
 * 品牌制造商直供接口
 * method: GET
 * params: 无
 */
const HOME_BRAND_API = '/api/home/tagList';

/**
 * 类目热销榜接口
 * method: GET
 * params: 无
 */
const HOME_HOT_SELL_API = '/api/home/catehotsell';

/**
 * 首页分类列表数据接口
 * method: GET
 * params:  id(Y)
 */
const HOME_CATE_LIST_API = '/api/home/catelist/itemlist';

export default {
    GOODS_TOTAL_API,
    HOME_MENU_API,
    HOME_BANNER_API,
    POLICY_API,
    HOME_CATE_API,
    HOME_BRAND_API,
    HOME_HOT_SELL_API,
    HOME_CATE_LIST_API
}


