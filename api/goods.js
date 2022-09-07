import fly from '@/utils/request.js'

// 获取商品数据
export const getGoodsList = (data) => fly.get('/goods/search', data)
