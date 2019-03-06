<template>
  <div class="open-file">openfile</div>
</template>
  <script>
  export default {
    mounted(){
      console.log(this.$route.query.content);
    }
  }
  </script>
  <style lang = "less" scoped>
  .openFile{
    width:100%;
    height:100%;
  }
  </style>
  
  