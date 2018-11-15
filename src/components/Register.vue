<template>
  <div>
    <div>
    <h3>欢迎进入网易云音乐</h3>
    <el-row style="margin-top: 13%">
      <el-col :span="2"><div class="grid-content"></div></el-col>
      <el-col :span="20"><div class="grid-content">
        <el-form>
          <el-form-item>
            <el-input placeholder="邮箱/手机" v-model="emailOrPhone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :type="mytype" placeholder="密码（最少6位）" v-model="password" style="padding-top: 15px; padding-bottom: 15px; position: relative;"></el-input>
            <el-switch v-model="flag" active-color="#C46243" inactive-color="#A1A1A1" style="position: absolute; top: 22px; right: 10px; width: 35px;"> </el-switch>
          </el-form-item>
          <el-form-item>
            <el-input v-model="nickname" placeholder="昵称" style="padding-bottom: 15px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="validateForm" plain style="width: 100%; cursor: pointer; background-color: #c46243; border:0; color: white;">注册</el-button>
          </el-form-item>
        </el-form>
        </div></el-col>
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>
    </div>
    <h6>点击「注册」代表你已阅读并同意<u>用户使用协议</u></h6>
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
  name: 'Register',
  data (){
    return {
      emailOrPhone: "",
      password: "",
      nickname: "",
      promptInfo: "",
      flag: true,
      bol: false
    }
  },
  computed:{
    //计算属性
    mytype:function(){
      return this.flag?'password':''

    }

  },
  methods: {
    transfer(){
      this.flag = false;
    },
    validateForm: function(){
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
      if(this.nickname == ""){
        this.bol = true;
        this.promptInfo = "昵称不能为空";
        return false;
      }
      if(this.nickname.length > 20 || this.nickname.length < 4){
          this.bol = true;
          this.promptInfo = "昵称为4到20位";
          return false;
      }
      this.$http.post('/api/user/addUser',{
        username: this.emailOrPhone,
        password: this.password,
        nickname: this.nickname
        },{}).then(
          function(res){
            console.log(res);
            if(res.body.status == "100"){
              window.localStorage.setItem("username",this.emailOrPhone);
              window.localStorage.setItem("password", this.password);
              window.localStorage.setItem("nickname", this.nickname);
              this.bol = true;
              this.promptInfo = res.body.msg;
              setTimeout(()=>{window.location.href = "/home"}, 2000);
            }
            if(res.body.status == "101"){
              this.bol = true;
              this.promptInfo = res.body.msg;
              setTimeout(()=>{this.bol = false}, 2000);
            };
          },
          function(err){
            console.log(err);
          }
      );

    },
    exitPrompt: function(){
      this.bol = false;
    }
  }
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
    width: 60%;
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
    right: -15%;
    color: white;
    z-index: 5000;
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
</style>
