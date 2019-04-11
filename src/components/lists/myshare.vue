<template>
  <div class="myshare-lists">
    <div
      v-for="(item,index) in this.$store.state.shareMyfiles"
      :key="index"
      class="flie-box"
    >
      <i class="iconfont icon-wenjian1"></i>
      {{item}}
    </div>

    <div
      v-for="(item,index) in this.$store.state.sharefolders"
      :key="index+'folder'"
      class="flie-box"
    >
      <i class="iconfont icon-wenjianjia"></i>
      {{item}}
    </div>
  </div>
</template>
<script>
export default {
  mounted(){
    console.log(this.$store.state.shareMyfiles);
  }
}
</script>
