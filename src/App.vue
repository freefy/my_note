<template>
  <div id="app">
    <video
      id="video"
      ref="video"
      muted
      src="@/assets/login.mp4"
      autoplay
      loop
    >您的浏览器不支持\&lt; video&gt;元素</video>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.makeVideoIime();
  },
  methods: {
    makeVideoIime() {
        this.$refs.video.currentTime = 500;       //设置视频一开始播放的时间点，刚开始的画面太白
        this.$refs.video.play();
      this.$refs.playbackRate = 0.5;
    }
  }
};
</script>

<style>
</style>
