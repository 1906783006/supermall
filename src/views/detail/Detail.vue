<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
    <scroll class="content" ref="scroll" 
    :probe-type="3"
    @scroll="contentScroll"> 
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @detailImgLoad="detailImgLoad"></detail-goods-info>
      <detail-params-info :paramInfo="itemParams" ref="params"></detail-params-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <bottom-bar @addCart="addCart"></bottom-bar>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import BottomBar from './childComps/BottomBar'

import scroll from 'components/common/scroll/scroll'

import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, Goods, getRecommend} from 'network/detail'

import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    BottomBar
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends: [],
      imgRefresh: null,
      themeOffsetTop: [],
      getThemeY: null,
      currentIndex: 0,
    }
  },
  created() {
    // 1.获取id
    this.iid = this.$route.query.iid;

    // 2.请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取数据
      const data = res.result;

      // 2.从轮播图中去除轮播图的数据
      this.topImages = data.itemInfo.topImages;
      // console.log(this.topImages);

     // 3.创建商品的对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
    
      // 4.取出店铺信息
      this.shopInfo = data.shopInfo;
      
      // 5.取出详情信息
      this.detailInfo = data.detailInfo;

      // 6.取出参数信息
      this.itemParams = data.itemParams;

      // 7.取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      
    });

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    })

    // 4.给getThemeY赋值
    this.getThemeY = debounce(() => {
      this.themeOffsetTop = [];
      this.themeOffsetTop.push(0);
      this.themeOffsetTop.push(this.$refs.params.$el.offsetTop)
      this.themeOffsetTop.push(this.$refs.comment.$el.offsetTop)
      this.themeOffsetTop.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeOffsetTop);
    }, 200)
  },
  mounted() {
    
  },
  deactivated() {
    this.$bus.$off('itemImgLoad',this.itemListener)
  },
  methods: {
    // 1.图片加载完成事件
    detailImgLoad() {
      debounce(this.$refs.scroll.refresh, 200);
      this.getThemeY();
    },
    
    // 2.监听tabbar点击事件
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeOffsetTop[index], 200);
    },

    // 3.better-scroll滚动事件
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;
      // console.log(positionY);
      
      // 2.posiitonY和主题中值进行对比
      let length = this.themeOffsetTop.length;
      for(let i = 0; i < length; i++) {
        if(this.currentIndex !== i && 
        ((i < length - 1 && positionY >= this.themeOffsetTop[i] && positionY < this.themeOffsetTop[i+1])
        || (i === length - 1 && positionY >= this.themeOffsetTop[i]))) {
          this.currentIndex = i;
          this.$refs.detailNavBar.currentIndex = this.currentIndex;
        }
      }

      // 3.决定backtop显示和隐藏
      this.isShow = position.y < -1000;
    },

    // 4.加入购物车
    addCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(product);
      
      // 2.将商品添加到购物车中
      this.$store.dispatch('addCart', product).then(res => {
        // this.message = res;
        // this.show = true;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = '';
        // }, 2000)
        this.$toast.show(res);
      });
    }
  }
}
</script>

<style scoped>
  .detail {
    height: 100vh;
    /* padding-top: 44px; */
    position: fixed;
    top: 44px;
    z-index: 15;
  }

  .content {
    background-color: #fff;
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }
</style>