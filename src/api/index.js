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
  // 获取昵称，返回20条数据
  getName(params){
    return axios.get('/getName',{params})
  },
  modifyName(params){
    return axios.get('/modifyName',{params})
  },
  // 传入hiring时返回对象数组，传入id时返回某个对象
  getPartTimeInfos(params){
    return axios.get('/getPartTimeInfo',{params})
  },
  getMyResume(){
    return axios.get('/getMyResume')
  },
  getExperience(){
    return axios.get('/getInterviewExperience')
  },
  getDetailExperience(params){
    return axios.get('/getInterviewExperience',{params})
  }

  

  
}

export default api
