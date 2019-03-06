<template>
  <div class="content-box">
    <div class="left-side-box" @click="closeTheFolderOuter">
      <div class="userAccount">
        <img src="@/assets/pic.png">
        <!-- <span>账户名</span> -->
        <el-dropdown style="
    margin-left: 12px;">
          <span class="el-dropdown-link">
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>上传头像</el-dropdown-item>
            <el-dropdown-item>
              <div @click="changeName">修改昵称</div>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <router-link :to="{path:'/'}">退出登录</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="menuList">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-plus"></i>创建
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toggleFolderMask()">创建文件夹</el-dropdown-item>
            <el-dropdown-item @click.native="toggleFileMask()">创建笔记本</el-dropdown-item>
            <!-- <el-dropdown-item>
              <router-link :to="{'name':'addEdit'}">创建笔记本</router-link>
            </el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="menuList">
        <router-link :to="{name:'notes'}">
          <i class="el-icon-document"></i>全部笔记
        </router-link>
      </div>
      <div class="menuList">
        <router-link :to="{name:'notesBook'}">
          <i class="el-icon-document"></i>笔记本
        </router-link>
      </div>

      <div class="menuList">
        <router-link :to="{name:'myshare'}">
          <i class="el-icon-news"></i>我的分享
        </router-link>
      </div>

      <div class="menuList">
        <router-link :to="{name:'shareList'}">
          <i class="el-icon-tickets"></i>分享给我的
        </router-link>
      </div>

      <div class="menuList">
        <router-link :to="{name:'partner'}">
          <i class="el-icon-goods"></i>笔记好友
        </router-link>
      </div>

      <div class="menuList">
        <router-link :to="{name:'recover'}">
          <i class="el-icon-delete"></i>回收站
        </router-link>
      </div>
    </div>

    <div class="right-side-box" @click="closeTheFolderInner">
      <!-- 添加文件夹名弹出框 -->
      <div class="view-add-folder" v-if="viewFolderMask">
        <div class="folder-box">
          <div class="fold-input">
            <span>文件夹名称：</span>
            <el-input v-model="foldName"></el-input>
          </div>
          <div class="fold-btn">
            <el-button type="primary" @click="addFolder" class="addFolder-btn">确定</el-button>
            <el-button @click="cancelAddFolder">取消</el-button>

            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
              <span>请填写文件夹名称</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </div>

      <!-- 添加文件名弹出框 -->
      <div class="view-add-folder" v-if="viewFileMask">
        <div class="folder-box">
          <div class="fold-input">
            <span>文件名称：</span>
            <el-input v-model="fileName"></el-input>
          </div>
          <div class="fold-btn">
            <el-button type="primary" @click="addfile" class="addFolder-btn">确定</el-button>
            <el-button @click="cancelAddfile">取消</el-button>

            <el-dialog title="提示" :visible.sync="dialogVisible2" width="30%">
              <span>请填写文件夹名称</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible2 = false">确定</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </div>
      <!-- 修改名字弹出框 -->
      <div class="view-change-name" v-if="viewChangeName">
        <div class="name-box">
          <div class="name-input">
            <span>昵称：</span>
            <el-input v-model="myChangeName"></el-input>
          </div>
          <div class="fold-btn">
            <el-button type="primary" @click="conFirmChangeName">确定</el-button>
            <el-button @click="cancelChangeName">取消</el-button>
          </div>
        </div>
      </div>
      <div class="view-confirm-save" v-if="viewConfirmMask">
        <div class="confirm-box">
          <h1>确认保存？</h1>
          <el-button type="primary" @click="confirmSaveFile">确定</el-button>
          <el-button @click="cancelSaveFile">取消</el-button>
        </div>
      </div>
      <router-view @toggleConfirmSave="toggleConfirmSave" @FileContent="FileContent"></router-view>
    </div>

    <el-button type="primary" class="backBtn" @click="back">返回</el-button>
  </div>
</template>

<script>
import api from "@/api/index.js";
import store from "@/store/store.js";
export default {
  mounted() {
    this.getName();
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      viewFolderMask: false,
      viewFileMask: false,
      viewChangeName: false,
      viewConfirmMask: false,
      fileContent: "",
      foldName: "",
      fileName: "",
      username: store.state.username, //登录用户名
      name: "", //用户名
      myChangeName: "" //修改昵称
    };
  },
  store,

  methods: {
    back() {
      this.$router.go(-1);
    },
    //确认保存（修改笔记本内容）
    confirmSaveFile() {
      this.$store.commit("modifyFileContent", {
        name: this.fileName,
        content: this.fileContent
      });
      this.viewConfirmMask = !this.viewConfirmMask;
      this.fileName = "";
      this.$router.push({ name: "notes" });
    },
    cancelSaveFile() {
      this.toggleConfirmSave();
    },
    //获取当前用户的昵称
    getName() {
      api.getName({ userName: this.username }).then(res => {
        this.name = res.data.name;
      });
    },
    // 添加文件的弹出罩切换
    toggleFileMask() {
      this.viewFileMask = !this.viewFileMask;
    },
    //确认保存弹出框显示切换
    toggleConfirmSave() {
      this.viewConfirmMask = !this.viewConfirmMask;
    },
    //获取编辑器文件内容和文件名称
    FileContent(text, filename) {
      this.fileContent = text;
      this.fileName = filename;
    },

    cancelAddfile() {
      this.toggleFileMask();
    },

    // 添加文件夹的弹出罩切换
    toggleFolderMask() {
      this.viewFolderMask = !this.viewFolderMask;
    },
    closeTheFolderInner(event) {
      if (
        this.viewFolderMask &&
        event.srcElement.classList.contains("view-add-folder")
      ) {
        this.viewFolderMask = !this.viewFolderMask;
      }
    },
    closeTheFolderOuter() {
      if (this.viewFolderMask) {
        this.viewFolderMask = !this.viewFolderMask;
      }
    },
    //添加文件夹
    addFolder() {
      if (this.foldName != "") {
        this.$store.commit("addFolder", { name: this.foldName, files: [] });
        this.toggleFolderMask();
        this.foldName = "";
        this.$router.push({ name: "notes" });
      } else {
        this.dialogVisible = true;
      }
    },
    //添加笔记本
    addfile() {
      if (this.fileName != "") {
        this.$store.commit("addFile", {
          name: this.fileName,
          content: ""
        });
        this.toggleFileMask();
        this.fileName = "";
        this.$router.push({ name: "notes" });
      } else {
        this.dialogVisible2 = true;
      }
    },
    cancelAddFolder() {
      this.toggleFolderMask();
    },
    //修改用户名
    changeName() {
      this.myChangeName = this.name;
      this.viewChangeName = !this.viewChangeName;
    },
    //确认修改用户名
    conFirmChangeName() {
      // this.name = this.myChangeName;
      api
        .modifyName({ userName: this.username, name: this.myChangeName })
        .then(res => {
          console.log(res);
          this.getName();
        });
      this.viewChangeName = !this.viewChangeName;
      this.$router.push({ name: "notes" });
    },
    //取消修改
    cancelChangeName() {
      (this.myChangeName = this.name),
        (this.viewChangeName = !this.viewChangeName);
      this.$router.push({ name: "notes" });
    }
  }
};
</script>

