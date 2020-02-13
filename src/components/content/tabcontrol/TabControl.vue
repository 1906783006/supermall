<template>
  <div class="tabControl">
    <div v-for="(item, index) in title" class="tabControl-item" 
    :class="{active:currentIndex === index}" @click="itemClick(index)">
      <span> {{item}} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    title: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index);
    }
  }
}
</script>

<style scoped>
  .tabControl {
    width: 100%;
    background-color: #fff;
    display: flex;
    text-align: center;
    z-index: 2;
  }

  .tabControl-item {
    flex: 1;
    padding: 5px;
  }

  .active span {
    padding: 5px;
    border-bottom: 5px solid var(--color-high-text);
  }
</style>