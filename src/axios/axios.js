import axios from 'axios'
import {Message} from "element-ui";
import router from '../router'
// import store from  "../store/index"


//配置前置url
axios.defaults.baseURL = "http://localhost:8888"

axios.interceptors.request.use(config => {
  // console.log(config)
  return config
})

//后置拦截
axios.interceptors.response.use(response => {
  console.log(response)
  let res = response.data
  if(res.code === 0){
    return response
  }else if(res.code === -1003){
    Message.error({message:res.msg});
    store.commit("REMOVE_INFO")
    router.push("/login")
    return Promise.reject(res.msg);
  }else{
    Message.error({message:res.msg});
    return Promise.reject(res.msg);
  }
},error => {
  if(error.response.data.code === 401){
    Message.error({message:error.response.data.msg});
    store.commit("REMOVE_INFO")
    router.push("/login")
    return Promise.reject(error.response.data.msg);
  }
  if(error.response.data.msg==="数据异常"){
    router.push("/blogs")
  }

  Message.error({message:error.response.data.msg});
  return Promise.reject(error.response.data.msg);
})
