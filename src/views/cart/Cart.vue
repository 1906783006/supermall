<template>
  <div id="cart">
    <nav-bar class="navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'

import CartList from './chidren/CartList'
import CartBottomBar from './chidren/CartBottomBar'

import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
  #cart {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .navbar {
    background-color: var(--color-tint);
    font-size: 20px;
    font-weight: 700;
    color: #fff;
  }
</style>