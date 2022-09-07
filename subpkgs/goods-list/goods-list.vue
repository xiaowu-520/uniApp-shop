<template>
  <view>
    <van-card v-for="item in goodslist" :key="goods_id" :price="item.goods_price | toFixed" desc="描述信息"
      :title="item.goods_name" :thumb="item.goods_small_logo || defaultPic"
      :thumb-link="`/subpkgs/goods-detail/goods-detail?id=${item.goods_id}`"></van-card>
  </view>
</template>

<script>
  import {
    getGoodsList
  } from '@/api/goods.js'
  import toast from '@/utils/toast.js'
  export default {
    data() {
      return {
        // 请求参数对象
        queryData: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        goodslist: [],
        total: 0,
        isLoading: false,
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    },
    methods: {
      // 获取商品数据
      async getGoods(stopPull) {
        this.isLoading = true
        const res = await getGoodsList(this.queryData)
        this.goodslist = [...this.goodslist, ...res.goods]
        this.total = res.total
        // console.log(this.goodslist);
        stopPull && stopPull()
        this.isLoading = false
      }
    },
    onLoad({
      query
    }) {
      this.queryData.query = query
      this.getGoods()
    },
    // 监听下拉行为
    onPullDownRefresh() {
      this.queryData = {
        // 查询关键词
        query: this.queryData.query,
        // 商品分类Id
        cid: '',
        // 页码值
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 10
      }
      this.goodslist = []
      this.total = 0
      this.getGoods(() => {
        uni.stopPullDownRefresh()
      })
    },
    // 监听上拉触底
    onReachBottom() {
      if (this.queryData.pagenum * this.queryData.pagesize > this.total) return toast('没有数据了')
      if (this.isLoading) return
      this.queryData.pagenum++
      this.getGoods()
    }
  }
</script>

<style>

</style>
