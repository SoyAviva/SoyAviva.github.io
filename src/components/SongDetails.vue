<template>
  <div>
    <div style="position: fixed; width: 100%; height: 35%; top: 0%; left: 0%;background-color: black;">
      <a @click="backwards"><i class="el-icon-caret-left" style="color: white; position: fixed; top: 3%; left: 5%; font-size: 20px; font-weight: 900;"><span style="font-size: 12px;">返回</span></i></a>
      <i class="el-icon-service" style="color: white; position: fixed; top: 3%; left: 45%;font-size: 20px; font-weight: 900; "><span style="font-size: 12px;">&nbsp;歌曲</span></i>
      <img width="60%" height="70%" :src="details.al.picUrl" style="margin-top: 15%; margin-bottom: 15px;">
    </div>
    <div style="height: 55%; width: 100%; position: fixed; top: 35%; left: 0%; overflow: scroll; background-color: rgb(245, 244, 249);">
        <div style="width: 100%;  display: flex; align-content: start; flex-wrap: wrap; border-bottom: 1px solid lightgray;">
          <div style="display: flex; width: 70%; flex-direction: column; align-items: flex-start; text-indent: 20px">
            <p style="height: 16px; font-size: 16px; margin-bottom: 10px;">{{details.name}}</p>
            <span>歌曲简介: {{details.alia[0]}}</span>
            <span>歌曲原唱：{{details.ar[0].name}}</span>
            <span>价格：{{details.fee}}元</span>
            <span>所属专辑：{{details.al.name}}</span>
            <span>点击试听<i class="el-icon-service" style="font-weight: 700;" @click="listen(lyricsArray)"></i></span>
          </div>
          <div style="display: flex; width: 90px; height: 90px; background-color: white; flex-direction: column; justify-content: space-around; margin-top: 20px;">
            <span>网易云评分</span>
            <span style="font-size: 20px; font-weight: 900;">{{details.mst}}</span>
            <span>{{details.dt}}人</span>
          </div>
          <button style="width: 80%; height: 42px; margin: 20px auto 20px; border: 1px solid #c46243; background-color: transparent; border-radius: 4px">购买</button>
        </div>
      <div style="width: 95%; margin: 0 auto">
        <h6 @click="checkArtist">歌手[点击查看歌手简介]</h6>
        <p style="font-size: 12px; text-align: justify; width: 95%; margin: 5px 10px 0px;">{{artistsBrief}}</p>
      </div>
      <h4 style="background-color: rgb(237,236,240); font-size: 14px; line-height: 40px">评论</h4>
      <div style="width: 90%; margin: 0 auto; display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; height: 90px;">
      <textarea placeholder="评论不少于10个字" style="width: 100%; height: 50px; margin: 0 auto; background-color: transparent; border: 1px solid #c46243; resize: none; outline: 0" v-model="newComment"></textarea>
      <button style="border: 0; outline: 0; background-color: transparent;" @click="addComment">发表评论</button>
      </div>
      <h6 style="text-align: left">短评</h6>
      <div style="display: flex; justify-content: left; width: 90%; margin: 0 auto 5px" v-for="val in comments">
        <img :src="val.user.avatarUrl" width="50px" height="50px" style="-webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;">
        <div style="display: flex; flex-direction: column; align-items: flex-start">
          <h6 style="position: relative;">{{val.user.nickname}}<i style="position: absolute; left: 230px; top: 0px" class="el-icon-star-on">{{val.likedCount}}</i></h6>
          <p style="font-size: 12px; margin: 5px 10px 0px; text-align: justify;">{{val.content}}</p>
          <span style="margin: 10px 0px 0px 10px;">{{new Date(parseInt(val.time)).toLocaleString().replace(/:\d{1,2}$/,' ')}}</span>
        </div>
      </div>
    </div>
    <div v-show="bol" style="position: fixed; bottom: 10%; left: 0%; width: 100%; height: 55%; background-color: rgba(0,0,0,0.7); z-index: 4000">
      <a><i @click='goback' class="el-icon-caret-left"  style="color: white; position: fixed; top: 38%; left: 5%; font-size: 20px; font-weight: 900; z-index: 4100"><span style="font-size: 12px;">返回</span></i></a>
      <audio :src="src" controls="controls" style="margin-top: 45px;"></audio>
      <h4 style="color: white; margin-top: 20px;">歌词展示</h4>
      <p style="color: white; font-size: 12px; margin-top: 20px;" v-for="val in lyricsArray" v-if="val.bol">{{val.c}}</p>
    </div>


  </div>
</template>

<script>
    export default {
        name: "SongDetails",
        data (){
          return {
            newComment: "",
            details: "",
            lyricsArray: "",
            artistsBrief: "",
            comments: "",
            songId: "",
            bol: "",
            src: "",
          }
        },
        methods: {
          addComment(){
            this.$http.get("http://musicapi.leanapp.cn/comment", {params: {t: 1, type: 0, id: 5436712, content: "很带感啊! 好久没听这么好听的歌了"}}).then(
              function(res){
                console.log(res)
              },
              function(err){
                console.log(err)
              }
            )


          },
          goback(){
            this.bol = false;
            var audio = document.getElementsByTagName("audio")[0];
            audio.pause();
          },
          listen(val){
            var lineNo = 1;
            var that = this;
            this.bol = true;
            this.src =  "http://music.163.com/song/media/outer/url?id="+this.details.id+".mp3";
            var audio = document.getElementsByTagName("audio")[0];
            audio.ontimeupdate=function(event){
              var Time = event.target.currentTime.toFixed(3);
              // console.log(Time);

              if (Math.round(Time) == Math.round(that.lyricsArray[lineNo].t)) {
                for(var i=0; i<that.lyricsArray.length; i++){
                  that.lyricsArray[i].bol = false;
                }
                that.lyricsArray[lineNo].bol = true;
                console.log(that.lyricsArray[lineNo].c);
                lineNo++;
            }
              

            };







          },
          backwards (){
            this.$router.push('/recommend');
          },
          checkArtist (){
            this.$http.get("http://musicapi.leanapp.cn/artist/desc", {params: {"id": this.details.ar[0].id}}).then(
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
          this.songId = this.$route.query.songId;
        this.$http.get("http://musicapi.leanapp.cn/lyric", {params: {"id": this.songId}}).then(
          function(res){
            // console.log(res);
            var lyricsArray = new Array();
            function createLrc () {
              var lyricsText_split = res.body.lrc.lyric.split("\n");    // 用换行符拆分获取到的歌词
              console.log(lyricsText_split);


              for(let i=0; i<lyricsText_split.length; i++){
                var t = lyricsText_split[i].substring(lyricsText_split[i].indexOf("[") + 1, lyricsText_split[i].indexOf("]"));
                lyricsArray.push({

                  t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
                  c: lyricsText_split[i].substring(lyricsText_split[i].indexOf("]") + 1, lyricsText_split[i].length),
                  bol: false
                });
              }
              console.log(lyricsArray);

            }
            createLrc();
            this.lyricsArray = lyricsArray;

          },
          function(err){
            console.log(err);
          }
        )


          this.$http.get("http://musicapi.leanapp.cn/song/detail", {params: {"ids":this.songId}}).then(
            function(res){
              console.log(res.body.songs[0]);
              this.details = res.body.songs[0];
            },
            function(err){
              console.log(err);
            }
          ),

          this.$http.get("http://musicapi.leanapp.cn/comment/music",{params: {"id": this.songId}}).then(
              function(res){
                // console.log(res.body.comments);
                this.comments = res.body.comments;
              },
              function(err){
                console.log(err)
              },
    )
        },
    }
</script>

<style scoped>
span{
  display: inline-block;
  font-size: 12px;
  line-height: 16px;
}
  h6{
    text-align: left;
    margin: 20px 10px 0px;
  }
</style>
