<template>
  <div class="content-box">
    <div
      class="left-side-box"
      @click="closeTheFolderOuter"
    >
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

      <div
        class="menuList"
        @click='chooseIndex(1)'
        :class="{clickStyle:index==1}"
      >
        <router-link :to="{name:'notes'}">
          <i class="el-icon-document"></i>我的桌面
        </router-link>
      </div>
      <div
        class="menuList"
        @click='chooseIndex(2)'
        :class="{clickStyle:index==2}"
      >
        <router-link :to="{name:'partner'}">
          <i class="el-icon-goods"></i>好友及群聊
        </router-link>
      </div>
      <div
        class="menuList"
        style="display:none"
        @click='chooseIndex(3)'
        :class="{clickStyle:index==3}"
      >
        <router-link :to="{name:'myFiles'}">
          <i class="el-icon-goods"></i>我的文件
        </router-link>
      </div>

      <div
        class="menuList"
        @click='chooseIndex(4)'
        :class="{clickStyle:index==4}"
      >
        <router-link :to="{name:'recover'}">
          <i class="el-icon-delete"></i>回收站
        </router-link>
      </div>
      <div class="menuList">
        <a
          href="javascript:void(0);"
          @click="Synch"
        > <i class="el-icon-refresh"></i>同步</a>
      </div>
    </div>

    <div
      class="right-side-box"
      @click="closeTheFolderInner"
    >
      <!-- 添加文件夹名弹出框 -->
      <div
        class="view-add-folder"
        v-if="viewFolderMask"
      >
        <div class="folder-box">
          <div class="fold-input">
            <span>文件夹名称：</span>
            <el-input v-model="foldName"></el-input>
          </div>
          <div class="fold-btn">
            <el-button
              type="primary"
              @click="addFolder"
              class="addFolder-btn"
            >确定</el-button>
            <el-button @click="cancelAddFolder">取消</el-button>

            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
            >
              <span>请填写文件夹名称</span>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button
                  type="primary"
                  @click="dialogVisible = false"
                >确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </div>

      <!-- 添加文件名弹出框 -->

      <div
        class="view-add-folder"
        v-if="viewFileMask"
      >
        <div class="folder-box">
          <div class="fold-input">

            <span>文件名称：</span>
            <el-input v-model="fileName"></el-input>

          </div>
          <div class="select-fold">
            <span>文件夹：</span>
            <el-select
              v-model="fileFolderName"
              clearable
              placeholder="请选择文件夹"
            >
              <el-option
                v-for="item in this.$store.state.myfolders"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="fold-btn">
            <el-button
              type="primary"
              @click="addfile"
              class="addFolder-btn"
            >确定</el-button>
            <el-button @click="cancelAddfile">取消</el-button>

            <el-dialog
              title="提示"
              :visible.sync="dialogVisible2"
              width="30%"
            >
              <span>请填写文件夹名称</span>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button
                  type="primary"
                  @click="dialogVisible2 = false"
                >确定</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </div>
      <!-- 修改名字弹出框 -->
      <div
        class="view-change-name"
        v-if="viewChangeName"
      >
        <div class="name-box">
          <div class="name-input">
            <span>昵称：</span>
            <el-input v-model="myChangeName"></el-input>
          </div>
          <div class="fold-btn">
            <el-button
              type="primary"
              @click="conFirmChangeName"
            >确定</el-button>
            <el-button @click="cancelChangeName">取消</el-button>
          </div>
        </div>
      </div>
      <div
        class="view-confirm-save"
        v-if="viewConfirmMask"
      >
        <div class="confirm-box">
          <h1>确认保存？</h1>
          <el-button
            type="primary"
            @click="confirmSaveFile"
          >确定</el-button>
          <el-button @click="cancelSaveFile">取消</el-button>
        </div>
      </div>
      <router-view
        @toggleConfirmSave="toggleConfirmSave"
        @FileContent="FileContent"
        v-if="!$route.meta.keepAlive"
      ></router-view>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
import store from "@/store/store.js";
export default {
  mounted() {
    this.getName();
  
    // this.Synch();
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
      fileFolderName: '',
      // username: this.$store.state.username, //登录用户名
      name: "", //用户名
      myChangeName: "",//修改昵称
      files: [],
      folders: [],
      index: 0,
      partnerAndcrowds: [],
    };
  },
  store,
  watch: {
    '$store.state.myfiles'(val) {
      this.files = val;
    },
    '$store.state.myfolders'(val) {
      this.folders = val;
    },

  },
  methods: {
    chooseIndex(index) {
      this.index = index;
    },
    //同步功能
    Synch() {
      this.files = this.$store.state.myfiles;
      this.folders = this.$store.state.myfolders;
      let username = localStorage.username;
      let params1 = JSON.stringify({ ...{ userName: username, files: this.files } });
      let params2 = JSON.stringify({ userName: username, folders: this.folders });
      api.refreshfiles(
        params1
      ).then(res => {
        if (res.data.reason) {
          this.$message({
            showClose: true,
            message: '文本同步成功',
            duration: 2000,
            type: 'success'
          });       
        }
      });
      api.refreshfolders(params2).then(res => {
        if (res.data.reason) {
          this.$message({
            showClose: true,
            message: '文件夹同步成功',
            duration: 4000,
            type: 'success'
          });
        }
      })
    },
    //确认保存（修改笔记本内容）
    confirmSaveFile() {
      // this.$store.commit("modifyFileContent", {
      //   name: this.fileName,
      //   folder:this.fileFolderName,
      //   content: this.fileContent,
      // });
      this.$store.commit("modifyMyFileContent", {
        name: this.fileName,
        folder: this.fileFolderName,
        content: this.fileContent,
        time:this.time
      });
      this.viewConfirmMask = !this.viewConfirmMask;
      this.fileName = "";
      this.fileFolderName = "";
      this.time = "";
      this.$router.push({ name: "notes" });
    },
    cancelSaveFile() {
      this.toggleConfirmSave();
    },
    //获取当前用户的昵称
    getName() {
      let username = localStorage.username;
      api.getName({ userName: username }).then(res => {
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
    FileContent(text, filename, foldername,time) {
      this.fileContent = text;
      this.fileName = filename;
      this.fileFolderName = foldername;
      this.time = time;
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
    // addFolder() {
    //   if (this.foldName != "") {
    //     this.$store.commit("addFolder", { name: this.foldName, files: [] });
    //     this.toggleFolderMask();
    //     this.foldName = "";
    //     this.$router.push({ name: "notes" });
    //   } else {
    //     this.dialogVisible = true;
    //   }
    // },
    addFolder() {
      if (this.foldName != "") {
        this.$store.commit("addMyFolder", this.foldName);
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
        // this.$store.commit("addFile", {
        //   name: this.fileName,
        //   content: ""
        // });
        this.getTime();
        this.$store.commit("addMyFiles", {
          name: this.fileName,
          folder: this.fileFolderName,
          content: "",
          time:this.time
        });
        this.toggleFileMask();
        this.fileName = "";
        this.fileFolderName = "";
        this.time ="";
        this.$router.push({ name: "notes" });
      } else {
        this.dialogVisible2 = true;
      }
    },
    cancelAddFolder() {
      this.toggleFolderMask();
    },
    getTime(){
      let myDate = new Date();
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
    },
    //修改用户名
    changeName() {
      this.myChangeName = this.name;
      this.viewChangeName = !this.viewChangeName;
    },
    //确认修改用户名
    conFirmChangeName() {
      let username = localStorage.username;
      // this.name = this.myChangeName;
      api
        .modifyName({ userName: username, name: this.myChangeName })
        .then(res => {
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