<template>
  <div class="bottom-bar">
    <div class="all-check">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      全选
    </div>

    <div class="total">合计:{{totalPrice}}</div>

    <div class="caculate" @click="calcClick"> 去计算:{{checkLength}} </div>
  </div>
</template>

<script>

import CheckButton from 'components/content/checkbutton/CheckButton'

import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => item.checked ).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if(this.cartList.length === 0) return false;
      return !this.cartList.find(item => !item.checked);
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false);
      } else {
        this.cartList.forEach(item => item.checked = true);
      }
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
  }

  .all-check {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
  }

  .total {
    margin-left: 15px;
    flex: 1;
  }

  .caculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>