<template>
  <div class="loginTotal">
    <el-form :model="loginForm" :rules="rules" ref="loginForm"  class="loginContainer">
      <h3 class="loginTitle">登录</h3>
      <el-form-item prop="username">
        <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="验证码"
                  style="width:180px;margin-right:5px"></el-input>
        <div class="login-code" @click="refreshCode">
          <!--验证码组件-->
          <Identify @click="refreshCode" :identifyCode="identifyCode"/>
        </div>
      </el-form-item>


      <div style="margin-top:5px;text-align: center">
        <el-button type="primary" style="width:25%" @click="submitLogin">登录</el-button>
        <el-button style="width:25%" @click="resetForm">重置</el-button>
      </div>

      <div style="color:gray;font-size:13px;margin-top:30px;margin-bottom:5px">


        <el-link style="float:left;">
          <a href="/homepage" style="text-decoration: none;color:cornflowerblue">
            返回首页
          </a>
        </el-link>

        <el-link style="float:right;">
          <router-link style="text-decoration: none;color:cornflowerblue" :to="{name:'Register'}">
            没有账号？点击注册
          </router-link>
        </el-link>
      </div>

    </el-form>
  </div>
</template>

<script>

import Identify from '../components/Identify'

export default {
  name: "Login",
  data(){
    return{
      loginForm:{
        username:'',
        password:'',
        code:''
      },
      rules:{
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }],
        password: [
          {required:true,message:'请输入密码',trigger:'blur'},
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }],
        code:
          [{required:true,message:'请输入验证码',trigger:'blur'}]
      },
      identifyCodes:"1234567890abcdefghijklmnopqrstuvwxyz",
      identifyCode:"",
    }
  },
  methods:{
    submitLogin(){
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if(this.identifyCode!==this.loginForm.code)
          {
            this.$message.error('验证码有误');
            return false
          }
          let that = this
          this.$axios.post('/user/login',this.loginForm)
            .then(res => {
              const jwt = res.headers['authorization']
              const userInfo = res.data.data

              //调用set方法并传入参数
              that.$store.commit("SET_TOKEN",jwt)
              that.$store.commit("SET_USERINFO",userInfo)

              this.$message.success('登录成功');

              window.location.href='/homepage'
            })
        } else {
          this.$message.error('请输入所有字段');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.loginForm.resetFields();
      this.refreshCode()
    },


    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    //刷新验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    //生成验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
          ];
      }
    },

  },
  created(){
    this.refreshCode()
  },

  components:{
    Identify
  }
}
</script>

<style>
.loginTotal{
  height:100%;
  width:100%;
  background-size: 100% 100%;
  background-image: url("../assets/loginBg.jpg");
}
.loginContainer{
  float:left;
  border-radius: 15px;
  background: padding-box;
  margin:10% 0 0 37%;
  width: 22%;
  padding:15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle{
  margin: 10px auto 30px auto;
  text-align: center;
}
.loginRemember{
  text-align: left;
  margin: 0 0 15px 0;
}
.login-code{
  width:120px;
  height:38px;
  float:right;
  cursor: pointer;
  margin-top:3px;
}
</style>


