<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item> 
  </swiper>
</template>
 
<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'

	export default {
		name: "HomeSwiper",
    components: {
		  Swiper,
      SwiperItem
    },
    props: {
		  banners: {
		    type: Array,
        default: []
      }
    },
    methods: {
		  stopTimer() {
		    this.$refs.swiper.stopTimer()
      },
      startTimer() {
		    if (this.$refs.swiper) {
          this.$refs.swiper.startTimer()
        }
      },
      // 监听图片加载完成事件 
      imageLoad() {
        this.$emit('swiperImgLoad');
        // console.log('swiper图片加载完成')
      }
    }
	}
</script>

<style scoped>

</style>
