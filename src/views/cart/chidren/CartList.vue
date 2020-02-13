<template>
  <div class="cart-list">
      <scroll class="content" ref="scroll" :isClick="true">
        <cart-list-item 
        v-for="(item, index) in cartList"
        :key="index"
        :itemInfo="item"></cart-list-item>
      </scroll>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

import Scroll from 'components/common/scroll/scroll'
import {debounce} from 'common/utils'

import CartListItem from './CartListItem'

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    debounce(this.$refs.scroll.refresh, 200);
  }
}
</script>

<style scoped>
  .cart-list {
    padding-top: 44px;
    height: calc(100% - 49px - 40px);
    overflow: hidden;
  }

  .content {
    overflow: hidden;
    height: 100%;

  }
</style>