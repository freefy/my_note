<template>
  <div class="editor-box">
    <div class="file-title">
      
      文件名:{{filename}}</div>
    <div class="sava-edit">
      <i class="el-icon-edit"></i>
      <i class="el-icon-upload"></i>
      <i class="el-icon-share"></i>
      <i class="el-icon-delete"></i>
      <span>上次更新时间 : 2019/01/06</span>
      <el-button
        type="primary"
        @click="addFile"
      >本地保存</el-button>
      <!-- <el-button>分享</el-button> -->
    </div>
    <!-- <div class="editor">
      <div
        ref="toolbar"
        class="toolbar"
      ></div>
      <div
        ref="editor"
        class="text"
      ></div>
    </div> -->
    <div id="editorElem" class="editor" style="text-align:left"></div>
   <!-- <button v-on:click="getContent">查看内容</button> -->
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
    }
  },

  mounted() {
    var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
    if(this.$route.params.item){
      console.log(editor.customConfig);
      editor.txt.html(this.$route.params.item.content);
        this.filename =  this.$route.params.item.name
    }
  },

  methods: {
   

        // getContent: function () {
        //     alert(this.editorContent)
        // },
    addFile() {
      var text = this.editorContent;//获取编辑框内的内容
    this.$emit('FileContent',text,this.filename);
    this.$emit('toggleConfirmSave');
    // this.$store.commit("addFile", {
    //       name: this.fileName,
    //       content: text
    //     });
    // this.$router.push({ name: "notes" });
      // if (this.editor.txt.text()) {
      //   this.$emit('toggleFileMask')
      // }
      // else {
      //   // this.$alert('内容为空', '提示', {
      //   //   confirmButtonText: '确定',
      //   // });
      // }
    },
    // seteditor() {
    //   this.editor = new E(this.$refs.toolbar, this.$refs.editor);
    //   this.editor.customConfig.uploadImgShowBase64 = true; // base 64 存储图片
    //   this.editor.customConfig.uploadImgServer = ""; // 配置服务器端地址
    //   this.editor.customConfig.uploadImgHeaders = {}; // 自定义 header
    //   this.editor.customConfig.uploadFileName = ""; // 后端接受上传文件的参数名
    //   this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为 2M
    //   this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
    //   this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
    //   // 配置菜单
    //   this.editor.customConfig.menus = [
    //     "head", // 标题
    //     "bold", // 粗体
    //     "fontSize", // 字号
    //     "fontName", // 字体
    //     "italic", // 斜体
    //     "underline", // 下划线
    //     "strikeThrough", // 删除线
    //     "foreColor", // 文字颜色
    //     "backColor", // 背景颜色
    //     "link", // 插入链接
    //     "list", // 列表
    //     "justify", // 对齐方式
    //     "quote", // 引用
    //     "emoticon", // 表情
    //     "image", // 插入图片
    //     "table", // 表格
    //     "video", // 插入视频
    //     "code", // 插入代码
    //     "undo", // 撤销
    //     "redo" // 重复
    //   ];
    //   this.editor.customConfig.uploadImgHooks = {
    //     fail: (xhr, editor, result) => {
    //       // 插入图片失败回调
    //     },
    //     success: (xhr, editor, result) => {
    //       // 图片上传成功回调
    //     },
    //     timeout: (xhr, editor) => {
    //       // 网络超时的回调
    //     },
    //     error: (xhr, editor) => {
    //       // 图片上传错误的回调
    //     },
    //     customInsert: (insertImg, result, editor) => {
    //       // 图片上传成功，插入图片的回调
    //     }
    //   };
    //   this.editor.customConfig.onchange = html => {
    //     this.info_ = html; // 绑定当前逐渐地值
    //     this.$emit("change", this.info_); // 将内容同步到父组件中
    //   };

    //   // 创建富文本编辑器
    //   this.editor.create();
    // }
  }
};
</script>
<style>
.w-e-text-container{
    height: 92% !important;/*!important是重点，因为原div是行内样式设置的高度300px*/
}
</style>
