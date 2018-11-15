<template>
  <div>
    <div style="position: fixed; width: 100%; height: 35%; top: 0%; left: 0%;background-color: black;">
      <a @click="backwards"><i class="el-icon-caret-left" style="color: white; position: fixed; top: 3%; left: 5%; font-size: 20px; font-weight: 900;"><span style="font-size: 12px;">返回</span></i></a>
      <i class="el-icon-service" style="color: white; position: fixed; top: 3%; left: 45%;font-size: 20px; font-weight: 900; "><span style="font-size: 12px;">&nbsp;MV</span></i>
      <video controls :src="src" width="60%" height="70%" style="margin-top: 15%; margin-bottom: 15px;"></video>
    </div>
    <div style="height: 55%; width: 100%; position: fixed; top: 35%; left: 0%; overflow: scroll; background-color: rgb(245, 244, 249);">
      <div style="width: 100%;  display: flex; justify-content: space-around; border-bottom: 1px solid lightgray; padding-bottom: 10px">
        <div style="display: flex; width: 60%; flex-direction: column; align-items: flex-start; text-align: justify; padding-left: 10px; ">
          <p style="height: 16px; font-size: 16px; margin-bottom: 0px;font-size: 12px;">{{MV.name}}</p>
          <span style="font-size: 12px;">{{MV.artistName}}</span>
          <span style="font-size: 12px;">MV简介: {{MV.desc}}</span>
        </div>
        <div style="display: flex; width: 90px; height: 90px; background-color: white; flex-direction: column; justify-content: space-around; margin-top: 20px;">
          <span>播放次数</span>
          <span style="font-size: 20px; font-weight: 900;">{{MV.playCount}}</span>
          <span>次</span>
        </div>
      </div>
      <div style="width: 95%; margin: 0 auto">
        <h6 @click="checkArtist">歌手[点击查看歌手简介]</h6>
        <p style="font-size: 12px; text-align: justify; width: 95%; margin: 0 auto;">{{artistsBrief}}</p>
      </div>
      <h4 style="background-color: rgb(237,236,240); font-size: 14px; line-height: 40px">评论</h4>
      <h6 style="text-align: left; margin-bottom: 10px;">短评</h6>
      <div style="display: flex; width: 95%; margin: 0 auto 5px" v-for="val in comments">
        <img :src="val.user.avatarUrl" width="50px" height="50px" style="-webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;">
        <div style="display: flex; flex-direction: column; align-items: flex-start">
          <h6 style="position: relative;"><i style="position: absolute; left: 230px; top: 0px" class="el-icon-star-on">{{val.likedCount}}</i></h6>
          <p style="font-size: 12px; margin: 5px 10px 0px; text-align: justify; ">{{val.user.nickname}}</p>
          <span style="margin: 10px 0px 0px 10px; font-size: 12px; text-align: justify; padding-right: 20px;">{{val.content}}</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
    export default {
        name: "MvDetails",
        data (){
          return{
            MvId: "",
            MV: "",
            src: "",
            artistsBrief: "",
            comments: ""
          }
        },
        methods: {
          backwards (){
            this.$router.push('/mv');
          },
          checkArtist (){
            this.$http.get("http://musicapi.leanapp.cn/artist/desc", {params: {"id": this.MV.artistId}}).then(
              function(res){
                // console.log(res.body.briefDesc);
                this.artistsBrief = res.body.briefDesc;
              },
              function(err){
                console.log(err)
              },
            )
          }
        },
        beforeCreate (){
          this.MvId = this.$route.query.MvId
          this.$http.get("http://musicapi.leanapp.cn/mv/detail", {params: {mvid: this.MvId}}).then(
            function(res){
              console.log(res.body.data);
              this.MV = res.body.data;
              this.src = this.MV.brs[480];
             },
            function(err){
              console.log(err);
            }
          );
          this.$http.get("http://musicapi.leanapp.cn/comment/mv", {params: {id: this.MvId}}).then(
            function(res){
              console.log(res.body.comments);
              this.comments = res.body.comments;
            },
            function(err){
              console.log(err);
            }
          )
        }
    }
</script>

<style scoped>
  h6{
    text-align: left;
    margin: 20px 10px 0px;
  }
</style>
