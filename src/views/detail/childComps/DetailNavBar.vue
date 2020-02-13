<template>
  <nav-bar class="nav-bar">
      <div slot="left" class="left" @click="backClick"><img src="~assets/img/common/back.svg" alt=""></div>
      <div slot="center" class="tilte">
        <div v-for="(item, index) in titles" class="title-item" :class="{active:currentIndex===index}"
        @click="itemClick(index)"> {{item}} </div>
      </div>
    </nav-bar>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick', index);
    },
    backClick() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: #fff;
  }

  .left {
    text-align: center;
  }

  .nav-bar img {
    margin-top: 10px;
  }

  .tilte {
    display: flex;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }
</style>