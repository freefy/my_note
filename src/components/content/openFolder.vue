<template>
  <div class="openFolderContent">
    <div v-for="(item,index) in files" :key="index" class="flie-box" @dblclick="openFile(item)">
      <i class="iconfont icon-wenjian1"></i>
      {{item.name}}
    </div>
    <div ref="menu" class="menu" style="display:none;position:absolute;">
      <ul>
        <li class="shareClick">分享</li>
        <li>复制</li>
        <li>编辑</li>
        <li class="deleteClick">删除</li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      files: [],
      folderName: ""
    };
  },
  mounted() {
if(this.$route.params&&this.$route.params.item){
  this.files = this.$route.params.item.files;
  // this.folderName = this.$route.params.item.name;
}

    // if (this.$route.params.item) {
    //   this.files = this.$router.params.item.files;
    //   this.folderName = this.$router.params.item.name;
    //   // editor.txt.html(this.$route.params.item.content);
    //   //   this.filename =  this.$route.params.item.name
    // }
    // if (this.$route.params.query) {
    //   console.log(this.$route.params.query);
    //   this.files = this.$router.params.query.files;
    //   this.folderName = this.$router.params.query.name;
    //   // editor.txt.html(this.$route.params.item.content);
    //   //   this.filename =  this.$route.params.item.name
    // }
  },
  methods: {
    openFile(item) {
      console.log(item);
      console.log(item.content); //将内容添加到编辑器中

      // this.$router.push({path:'/content/addEdit',query:{item:item}});
      this.$router.push({ name: "addEdit", params: { item: item } });

      // alert("跳转到打开文件页面，读取数据库中对应的文件的内容显示在页面");
    }
  }
};
</script>

