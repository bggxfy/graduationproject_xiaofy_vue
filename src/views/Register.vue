<template>

    <div class="register">
      <el-form :model="registerForm" :rules="rules" ref="registerForm"  class="registerContainer">
        <h3 class="loginTitle">注册账号</h3>
        <el-form-item prop="username">
          <el-input type="text" auto-complete="false" v-model="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>


        <el-form-item prop="password">
          <el-input type="password" auto-complete="false" v-model="registerForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input type="password" auto-complete="false" v-model="registerForm.confirmPassword" placeholder="请重复密码"></el-input>
        </el-form-item>


        <div style="margin-top:5px;text-align: center;">
          <el-button type="primary" style="width:25%" @click="submitRegister">注册</el-button>
          <el-button style="width:25%" @click="resetForm">重置</el-button>
        </div>

        <div style="color:gray;font-size:13px;margin-top:30px;margin-bottom:5px">
          <el-link style="float:left;">
            <a href="/homepage" style="text-decoration: none;color:cornflowerblue">
              返回首页
            </a>
          </el-link>

          <el-link style="float:right;">
            <router-link style="text-decoration: none;color:cornflowerblue" :to="{name:'Login'}">
              返回登录
            </router-link>
          </el-link>
        </div>

      </el-form>


    </div>
</template>

<script>
    export default {
      name: "Register",
      data(){
        let validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.registerForm.password !== '') {
              this.$refs.registerForm.validateField('confirmPassword');
            }
            callback();
          }
        };
        let validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.registerForm.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return{
          registerForm:{
            username:'',
            password:'',
            confirmPassword:'',
            // code:'',
          },
          checked:false,
          rules:{
            username:[
              {required:true,message:'请输入用户名',trigger:'blur'},
              { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }],
            password: [
              {required:true,message:'请输入密码',validator: validatePass,trigger:'blur'},
              { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }],
            confirmPassword: [
              {required:true,validator: validatePass2,trigger:'blur'},
              { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }],
          },
          identifyCodes:"1234567890abcdefghijklmnopqrstuvwxyz",
          identifyCode:"",
        }
      },
      methods:{
        submitRegister(){
          this.$refs.registerForm.validate((valid) => {
            if (valid) {
              let that = this
              this.$axios.post('/user/register',this.registerForm)
                .then(res => {
                  that.$message.success("注册成功")
                  that.$router.push("/login")
                })
            } else {
              this.$message.error('请输入所有字段');
              return false;
            }
          });
        },
        resetForm() {
          this.$refs.registerForm.resetFields();
        },


      },
    }
</script>

<style scoped>
  .register{
    height:100%;
    width:100%;
    background-size: 100% 100%;
    background-image: url("../assets/registerBg.jpg");
  }
  .registerContainer{
    float:left;
    border-radius: 15px;
    background: padding-box;
    margin:10% 0 0 37%;
    /*margin: 150px 200px 0 auto;*/
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
</style>
