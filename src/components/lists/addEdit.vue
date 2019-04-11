<template>
  <div class="editor-box">
    <div class="file-title">  
      文件名:{{filename}}</div>
    <div class="sava-edit">
      <i class="el-icon-edit"></i>
      <i class="el-icon-upload"></i>
      <i class="el-icon-share"></i>
      <i class="el-icon-delete"></i>
      <span>上次更新时间 : {{time}}</span>
      <el-button
        type="primary"
        @click="addFile"
      >本地保存</el-button>
    </div>
    <div id="editorElem" class="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import E from "wangeditor";
import store from "@/store/store.js";
export default {
  name: 'editor',
  data () {
    return {
      editorContent: '',
      filename:'',
      foldername:'',
      time:''
    }
  },

  mounted() {
    var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
    if(this.$route.params.item){
      console.log(this.$route.params.item);
      // console.log(editor.customConfig);
      editor.txt.html(this.$route.params.item.content);
        this.filename =  this.$route.params.item.name;
        this.foldername =  this.$route.params.item.folder;
        this.time = this.$route.params.item.time
    }
  },

  methods: {
    addFile() {
      var text = this.editorContent;//获取编辑框内的内容
      var myDate = new Date();
      let [y,m,d,h,f,s] = 
      [myDate.getFullYear(),
      myDate.getMonth()+1,
      myDate.getDate(),
      myDate.getHours(),
      myDate.getMinutes(),
      myDate.getSeconds()];
      m>=10?m:'0'+m;
      d>=10?d:'0'+d;
      h>=10?h:'0'+h;
      f>=10?f:'0'+f;
      s>=10?s:'0'+s;
      this.time = y+'-'+m+'-'+d+' '+h+':'+f+':'+s;
      // console.log(y,m,d,h,f,s);
      console.log(this.time);
    this.$emit('FileContent',text,this.filename,this.foldername,this.time);
    this.$emit('toggleConfirmSave');
    },
  }
};
</script>
<style>
.w-e-text-container{
    height: 92% !important;/*!important是重点，因为原div是行内样式设置的高度300px*/
}
</style>
