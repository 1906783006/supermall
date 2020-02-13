<template>
  <div class="backtop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "Backtop"
}
</script>

<style scoped>
  .backtop {
    position: fixed;
    bottom: 100px;
    right: 20px;
    /* z-index: 9; */
  }

  .backtop img {
    width: 50px;
    height: 50px;
  }
</style>