import axios from '@/axios'

const api = {
  // 登录，传账号和密码
  login(params) {
    return axios.get('/login', {params})
  },
  // 注册，传账号和密码
  register(params){
    return axios.get('/register',{params})
  },
  // 根据用户名获取昵称
  getName(params){
    return axios.get('/getName',{params})
  },
  modifyName(params){
    return axios.get('/modifyName',{params})
  },
  refreshfiles(params){
    return axios.post('/refreshFiles.api',params)
  },
  refreshfolders(params){
    return axios.post('/refreshFolders.api',params)
  },
  getFiles(params){
    return axios.post('/getFiles.api',params)
  },
  getFolders(params){
    return axios.post('/getFolders.api',params)
  },


  addFriend(params) {
    return axios.post('/addFriend.api', params)
  },
  deleteFriend(params){
    return axios.post('/deleteFriend.api',params)
  },
  isGetName(params){
    return axios.post('/isGetName.api',params);
  },
  getFriend(params){
    return axios.post('/getFriend.api',params);
  },
  createCrowd(params){
    return axios.post('/creatCrowd.api',params);
  },
  getCrowd(params){
    return axios.post('/getCrowd.api',params);
  },
  deleteCrowd(params) {
    return axios.post('/deleteCrowd.api', params);
  },
  // 删除群
  // let params2 = JSON.stringify({
  //   username: '222',
  //   name: '22'
  // })
  // api.deleteCrowd(params2).then(res => {
  //   console.log(res);
  // });
  // 1.创建群 --->存了key值，应该存value值 这里要修改
  // let params =JSON.stringify({name:'22',people:"xiao;222"})
  // api.createCrowd(params).then(res=>{
  // console.log(res);
  // });
  // 2.获取群
  // let params =JSON.stringify({username:'xiao'})
  // api.getCrowd(params).then(res=>{
  // console.log(res);
  // });
  //添加好友
  // let params = JSON.stringify({username:'xiao',fname:'222'});
  // api.addFriend(params).then(res=>{
  // console.log(res);
  // });
  //删除好友
  // api.deleteFriend(params).then(res=>{
  // console.log(res);
  // });
  // let params1 = JSON.stringify({username:'222222'});
  //判断是否账户是否纯在
  // api.isGetName(params1).then(res=>{
  // console.log(res); 
  // })
  //获取好友
  // let params2 = JSON.stringify({username:'xiao'});
  // api.getFriend(params2).then(res=>{
  // console.log(res);
  // })


}

export default api
