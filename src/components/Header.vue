<template>
  <div class="header_total">
    <div style="height:100%;width:500px;margin:0;float:left;">
      <p style="margin: 0;font-size:14px">欢迎来到重庆理工大学校园招聘网！</p>
    </div>
    <div style="float:right;">
      <div v-if="!isLogin">
        <router-link style="text-decoration: none;color: black;margin-right:20px" :to="{name:'Login'}">
          登录
        </router-link>

        <router-link style="text-decoration: none;color: black;" :to="{name:'Register'}">
          注册
        </router-link>
      </div>

      <div v-if="isLogin&&!hasRole">
        已登录，无角色
        <el-link style="margin-left:50px;color: red;" @click="logout">
          退出
        </el-link>
      </div>


      <div v-if="isLogin&&hasRole">
        已登录，有角色
        <el-link style="margin-left:50px;color: red;" @click="logout">
          退出
        </el-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isLogin:false,
      hasRole:false
    }
  },
  methods: {
    logout() {
      const that = this
      this.$axios.get("/user/logout", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        that.$store.commit("REMOVE_INFO")
        window.location.href='/homepage'
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    if (this.$store.getters.getUser) {
      this.isLogin = true
      this.hasRole = this.$store.getters.getUser.role
    }
  }
}
</script>

<style scoped>
.header_total{
  padding: 5px 15% 0 15%;
  width:70%;
  height:25px;
  margin: 0 auto;
  background:lightgray;
 }
</style>

