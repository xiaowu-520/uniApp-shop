import fly from '@/utils/request.js'

export const getBanners = () => fly.get('/home/swiperdata')
/**
 * 获取分类数据
 * */
export const getNavList = () => fly.get('/home/catitems')
// 获取楼层
export const getFloor = () => fly.get('home/floordata')
