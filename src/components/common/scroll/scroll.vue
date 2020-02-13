<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import Bscroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    isClick: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: this.isClick
    })
    
    // 监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position);
    })

    // 监听加载更多
    this.scroll.on('pullingUp', () => {
      this.$emit('loadMore');
    })

  },
  methods: {
    scrollTo(x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 封装重新刷新事件
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log('refresh');
      
    },
    // 封装结束加载更多事件
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    // 封装获取滚动Y方向的位置
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;      
    }

  }
}
</script>

<style scoped>

</style>