import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 新增的两行数据
    myfiles:[],
    myfolders:[],
    // myfiles:[{name:'笔记1',folder:'文件夹1',content:'啊啊啊啊1'},{name:'笔记2',folder:'文件夹1',content:'巴巴爸爸'},{name:'笔记3',folder:'文件夹2',content:'ccc'},{name:'笔记4',folder:'文件夹2',content:'4444'},{name:'笔记5',content:'555555'},{name:'笔记6',content:'66666'}],
    // myfolders:['文件夹1','文件夹2'],
    sharefiles: [],
    sharefolders: [],
    // 添加的
    shareMyfiles: [],
    shareMyfolders: [],
    deletefiles:[],
    deletefolders:[],
  },
  mutations: {
    //获取文本。文件夹（查）
    getFiles(state,files){
      state.myfiles = files;
    },
    getFolders(state,folders){
      state.myfolders = folders;
    },

    // 添加文本。文件夹（增）
    addMyFiles(state,file){
      console.log(file);
      // state.myfiles.push({name:file.name,folder:file.folder,content:file.content});
      state.myfiles.push({name:file.name,folder:file.folder,content:file.content,time:file.time});
      console.log(state.myfiles);
    },
    addMyFolder(state, folder) {
      state.myfolders.push(folder);
    },

    //修改文本内容（改）
    modifyMyFileContent(state,file){
      console.log(file)
         for(var i = 0;i <state.myfiles.length;i++ ){
          if(state.myfiles[i].name == file.name &&state.myfiles[i].folder == file.folder){
            state.myfiles[i].content = file.content;
            state.myfiles[i].time = file.time;
          }
        }
    },
     //删除文本
    deleteMyFile(state,files){
      for(let i = 0 ;i <state.myfiles.length;i++){
          if(state.myfiles[i].folder == files.folder&&state.myfiles[i].name == files.name){
            state.myfiles.splice(i,1);
            state.deletefiles.push(files);
          } 
      }
    },
    //删除文件夹
    deleteMyFolder(state,name){
       var leftData = state.myfiles.filter(function(item){
        return item.folder != name; 
      })
       state.myfiles = leftData.concat([]);
      for(var i =0; i< state.myfolders.length;i++){
        //删除文件夹中
        if(state.myfolders[i]==name){
          state.myfolders.splice(i,1);
          state.deletefolders.push(name);
        } 
      }
    },
    //每次登陆清空回收站
    clearDelete(state){
      state.deletefiles = [];
      state.deletefolders=[];
    },
    
    //修改文件名
    editmyFile(state,files){
      for(let i = 0 ;i <state.myfiles.length;i++){
          if(state.myfiles[i].folder == files.folder&&state.myfiles[i].name == files.name){
            state.myfiles[i].name=files.name;
          } 
      }
    },
    //修改文件夹名称
    editmyFolder(state,name){
      let arr = name.split("-");
      for(let i = 0 ;i <state.myfiles.length;i++){
       if(state.myfiles[i].folder==arr[0]){
        state.myfiles[i].folder = arr[1];
       }
      }
      for(var i =0; i< state.myfolders.length;i++){
        if(state.myfolders[i]==arr[0]){
          state.myfolders[i] = arr[1];
        }
      }
    },

    addMyShare(state, shareItem) {
      let flag = true;
      for (let i = 0; i < state.myfiles.length; i++) {
        if (shareItem == state.myfiles[i].name) {
          state.shareMyfiles.push(shareItem);
          flag = false;
        }
      }
      if (flag) {
        state.shareMyfolders.push(shareItem);
      }
    },
  }
})

export default store;
