<template>
  <div class="detail-swiper" v-if="topImages.length">
    <swiper>
      <swiper-item class="item" v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item> 
    </swiper>
  </div>
</template>

<script>

import {Swiper, SwiperItem} from 'components/common/swiper/index'

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .item {
    width: 100%;
    height: 300px;
    text-align: center;
  }
</style>