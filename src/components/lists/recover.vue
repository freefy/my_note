<template>
  <div class="mydelete-lists">
    <div
      v-for="(item,index) in this.$store.state.deletefiles"
      :key="index"
      class="flie-box"
    >
      <i class="iconfont icon-wenjian1"></i>
      {{item}}
    </div>

    <div
      v-for="(item,index) in this.$store.state.deletefolders"
      :key="index+'folder'"
      class="flie-box"
    >
      <i class="iconfont icon-wenjianjia"></i>
      {{item}}
    </div>
  </div>
</template>