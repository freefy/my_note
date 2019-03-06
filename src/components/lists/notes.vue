<template>
  <!-- <div class="note-lists" @mousedown="chooseShare">
    <router-view></router-view>
    <div
      v-for="(item,index) in this.$store.state.fileLists"
      :key="index"
      class="flie-box"
      @dblclick="openFile(item)"
    >
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
  </div>-->
  <div class="note-lists" @mousedown="chooseShare">
    <router-view></router-view>
    <div
      v-for="(item,index) in this.$store.state.allFiles"
      :key="index"
      class="flie-box"
      @dblclick="openFile(item)"
    >
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
  </div>
</template>

<script>
export default {
  // mounted(){
  //   console.log(this.$route.params.item);
  // },
  components: {},
  data() {
    return {
      shareItem: ""
    };
  },

  methods: {
    chooseShare(event) {
      var menu = this.$refs.menu;
      event = window.event || event;
      if (
        event.target.parentNode.classList.contains("flie-box") ||
        event.target.parentNode.classList.contains("folder-box") ||
        event.target.classList.contains("flie-box") ||
        event.target.classList.contains("folder-box")
      ) {
        if (event.button == 2) {
          if (
            event.target.parentNode.classList.contains("flie-box") ||
            event.target.parentNode.classList.contains("folder-box")
          ) {
            this.shareItem = event.target.parentNode;
          } else {
            this.shareItem = event.target;
          }

          document.oncontextmenu = function(ev) {
            var ev = ev || event;
            var scrollTop =
              document.documentElement.scrollTop || document.body.scrollTop;
            menu.style.display = "block";
            menu.style.left = ev.clientX + "px";
            menu.style.top = ev.clientY + scrollTop - 12 + "px";
            return false;
          };
        } else {
          menu.style.display = "none";
        }
      } else {
        if (event.target.classList.contains("shareClick")) {
          this.share();
        }
        if (event.target.classList.contains("deleteClick")) {
          this.delete();
        }
        menu.style.display = "none";
        document.oncontextmenu = function(ev) {
          // 如果点击的是其他区域，恢复默认事件
          return true;
        };
      }
    },
    share() {
      this.$store.commit("addShare", this.shareItem.outerText);
      this.shareItem = "";
    },
    delete() {
      // console.log(this.shareItem.outerText);
      this.$store.commit("delete", this.shareItem.outerText);
      this.shareItem = "";
    },
    openFile(item) {
      console.log(item);
      console.log(item.content); //将内容添加到编辑器中

      // this.$router.push({path:'/content/addEdit',query:{item:item}});
      this.$router.push({ name: "addEdit", params: { item: item } });

      // alert("跳转到打开文件页面，读取数据库中对应的文件的内容显示在页面");
    },
    openFolder(item) {
      // this.$router.push({name:'openFolder',params:{item:item}});
      this.$router.push({ name: "openFolder", params: { item } });

      // 跳转到新路由，显示文件夹的文件
      // this.$router.push({'name':'openFolder'});
    }
  }
  // computed:{
  //   item:function(){
  //     console.log(this.$route);
  //     return this.$route.query;
  //         }
  // },
  // watch:{
  // item(){
  //   console.log(item);
  // }
  // },
};
</script>
<style>
.note-lists {
  overflow: hidden;
}
</style>


