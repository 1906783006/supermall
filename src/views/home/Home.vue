<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar> 
    <!-- tabcontrol的复制 -->
    <tab-control class="tab-control1" :title="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" v-show="isFixed"></tab-control>
    
    <scroll class="wrapper" ref="scroll" :probe-type="0" 
    @scroll="contentScroll" :pull-up-load="true" :isClick="true" @loadMore="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control2" :title="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabcontrol/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import Scroll from 'components/common/scroll/scroll'
import BackTop from 'components/content/backtop/Backtop'

import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

import {GetHomeMultidata, getHomeGoods} from 'network/Home.js'

import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
  name: "Cart",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  }, 
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0
    }
  },
  // 组件创建之后就要请求数据了，为之后做准备，created,vue生命周期函数，组件创建之后
  created() {
    this.GetHomeMultidata();
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  // 让home保存离开时的位置
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // console.log('active' + this.saveY);
    
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();

    // 离开时取消全局事件的监听（refresh）
    this.$bus.$off('itmeImaLoad', this.itemListener);

  },
  mounted() {
    // 1.监听goodsitem图片加载完成
    
  },
  methods: {
    // 普通事件
    tabClick(index) {
      switch(index) {
        case 0: this.currentType = 'pop'; break;
        case 1: this.currentType = 'new'; break;
        case 2: this.currentType = 'sell'; break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // console.log(position);
      this.isShow = position.y < -1000;

      // 2.决定是否吸顶
      this.isFixed = (-position.y) > this.tabOffsetTop;
    },
    //接收加载更多的自定义事件
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    // swiper图片加载完成的自定义事件
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffsetTop);
          
    },
    // 网络请求方法
    GetHomeMultidata() {
      GetHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
      // console.log(res);   
      this.goods[type].list.push(...res.data.list);
      this.goods[type].page += 1; 

      // 结束pullUpLoad
      this.$refs.scroll.finishPullUp();
    })
    }
  }
}
</script>

<style scoped>
  #home {
    position: relative;
    padding-top: 44px;
    height: 100vh;
  }

  .home-nav {
    color: #fff;
    background-color: var(--color-tint);
  }

  .tab-control1 {
    position: relative;
    top: 0;
    right: 0;
    left: 0;
  }

  .tab-control2 {
    position: sticky;
    top: 44px;
  }

  .wrapper {
    /* height: 300px; */
    /* height: calc(100% - 49px); */
    overflow: hidden;
    position: absolute;
    top: 44px;
    right: 0;
    left: 0;
    bottom: 49px;
  }

</style>