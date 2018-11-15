<template>
  <div class="login">
    <div>
    <h3>欢迎进入网易云音乐</h3>
    <el-row style="margin-top: 13%">
      <el-col :span="2"><div class="grid-content"></div></el-col>
      <el-col :span="20"><div class="grid-content">
        <el-form>
          <el-form-item>
            <el-input placeholder="邮箱/手机" v-model="emailOrPhone" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :type="mytype" v-model="password" placeholder="密码（最少6位）" style="padding-top: 15px; padding-bottom: 15px; position: relative;"></el-input>
            <el-switch v-model="flag" active-color="#C46243" inactive-color="#A1A1A1" style="position: absolute; top: 22px; right: 10px; width: 35px;"> </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button plain style="width: 100%; cursor: pointer; background-color: #c46243; border:0; color: white;" @click="logIn">登陆</el-button>
          </el-form-item>
        </el-form>
        </div></el-col>
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>
    </div>
    <h6><span style="color: #C46243" @click="exit">{{confirmExit}}</span>&nbsp;|&nbsp;<span><router-link to="/register">新用户注册</router-link></span></h6>
    <div class="mask" v-show="bol">
        <div class="prompt">
          <p>{{promptInfo}}</p>
          <i class="el-icon-error" @click="exitPrompt"></i>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      bol: false,
      emailOrPhone: "",
      password: "",
      promptInfo: "",
      flag: true,
      confirmExit: "",
    }
  },
  computed:{
    //计算属性
    mytype:function(){
      return this.flag?'password':''

    }

  },
  mounted (){
    var username = window.localStorage.getItem("username");
    if(username == null){
    this.confirmExit = "忘记密码";
    }
    if(username != null){
    this.confirmExit = "退出登录";
    }
  },
  methods: {
      logIn: function(){
          var re_email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
          var re_phone = /^1\d{10}$/;
          if(this.emailOrPhone == ""){
            this.bol = true;
            this.promptInfo = "邮箱或手机不能为空";
            return false;
        }else{
        if(!re_email.test(this.emailOrPhone) && !re_phone.test(this.emailOrPhone)){
            this.bol = true;
            this.promptInfo = "邮箱或手机格式不正确";
            return false;
            }
        }
        if(this.password == ""){
            this.bol = true;
            this.promptInfo = "密码不能为空";
            return false;
        }
        if(this.password.length > 20 || this.password.length < 6){
            this.bol = true;
            this.promptInfo = "密码为6到20位";
            return false;
        }
        this.$http.post('/api/user/login',{
          username: this.emailOrPhone,
          password: this.password,
        },{}).then(
          function(res){
            if(res.body.status == "102"){
              this.bol = true;
              this.promptInfo = "用户未注册，跳转注册页面";
              setTimeout(() =>{
                this.$router.push('/register')
              }, 2000);
            }
            if(res.body.status == "103"){
              this.bol = true;
              this.promptInfo = "密码输入错误";
              setTimeout(() =>{
                this.bol = false;
              }, 2000);
            }
            if(res.body.status == "100"){
              window.localStorage.setItem("username",this.emailOrPhone);
              window.localStorage.setItem("password", this.password);
              this.bol = true;
              this.promptInfo = "登陆成功，正在跳转";
              setTimeout(() =>{
                        // window.location.href = "/home";
                            this.$router.back(-1);
                    }, 2000);
            }
          },
          function(err){
            console.log(err)
          }
        )







        // var username = window.localStorage.getItem("username");
        // var pwd = window.localStorage.getItem("password");
        // if(this.emailOrPhone == username && this.password == pwd){
        //     this.bol = true;
        //     this.promptInfo = "登陆成功，即将跳转主页";
        //     setTimeout(() =>{
        //         window.location.href = "/home";
        //     },2000);
        //     }else if(this.emailOrPhone == username && this.password != pwd){
        //   this.bol = true;
        //   this.promptInfo = "密码输入请重输";
        //   setTimeout(() =>{
        //     this.bol = false;
        //     this.password = "";
        //   },1500);
        // }else{
        //     this.bol = true;
        //     this.promptInfo = "该用户未注册，即将跳转注册页面";
        //     setTimeout(() =>{
        //       this.$router.push("/register");
        //     },2000);
        // }

      },
      exitPrompt: function(){
      this.bol = false;
    },
    exit (){
    var username = window.localStorage.getItem("username");
    if(username != ""){
      window.localStorage.setItem("username", "");
      window.localStorage.setItem("password", "");
      this.bol = true;
      this.promptInfo = "您已登出";
      setTimeout(() =>{
        this.bol = false;
      },1500);
      this.confirmExit="忘记密码"
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .mask{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.8);
    top: 0%;
    left: 0%;
    position: fixed;
    z-index: 5000;
  }
  .prompt{
    width: 65%;
    height: 15%;
    background-color: #C46243;
    position: relative;
    top: 38%;
    left: 20%;
    z-index: 6000;
    border-radius: 4px;
    border: 1px solid #C46243;

  }
  .prompt i{
    position: relative;
    top: -26%;
    right: -10%;
    color: white;
    cursor: pointer;
  }
  .prompt p{
    font-size: 12px;
    color: white;
    margin-top: 14%;
    display: inline-block;
  }
  h6{
    color: rgb(216, 216, 216);
    margin-top: -5%;
  }
  a{
    text-decoration: none;
    color: rgb(216, 216, 216);
  }
</style>
