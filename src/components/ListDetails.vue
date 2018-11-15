<template>
  <div>
    <a @click="goHome"><i class="el-icon-caret-left" style="color: #c46243; position: fixed; top: 3%; left: 5%; font-size: 20px; font-weight: 900; z-index: 7000"><span style="font-size: 12px;">返回</span></i></a>
    <search-bar></search-bar>
    <div>
      <div style="position: fixed; width: 100%; height: 35%; top: 0%; left: 0%;background-color: black;">
        <a><i class="el-icon-caret-left" style="color: white; position: fixed; top: 3%; left: 5%; font-size: 20px; font-weight: 900;"><span style="font-size: 12px;">返回</span></i></a>
        <i class="el-icon-service" style="color: white; position: fixed; top: 3%; left: 45%;font-size: 20px; font-weight: 900; "><span style="font-size: 12px;">&nbsp;榜单</span></i>
        <img :src="listDetails.coverImgUrl" width="60%" height="70%" style="margin-top: 15%; margin-bottom: 15px;">
      </div>
      <div style="height: 55%; width: 100%; position: fixed; top: 35%; left: 0%; overflow: scroll;background-color: rgb(245, 244, 249);">
        <div style="width: 100%;  display: flex; align-content: start; flex-wrap: wrap; ">
          <div style="display: flex; width: 70%; flex-direction: column; align-items: flex-start; text-indent: 20px">
            <span style="margin-top: 30px;">榜单名称: {{listDetails.name}}</span>
            <span>订阅量：{{listDetails.subscribedCount/1000 | fix2}}万</span>
            <span>歌曲总数：{{listDetails.trackCount}}</span>
            <span style="margin-bottom: 30px;">更新时间：{{new Date(parseInt(listDetails.updateTime)).toLocaleString().replace(/:\d{1,2}$/,' ')}}</span>
          </div>
          <div style="display: flex; width: 90px; height: 90px; background-color: white; flex-direction: column; justify-content: space-around; margin-top: 20px;">
            <span>分享次数</span>
            <span style="font-size: 20px; font-weight: 900;">{{listDetails.shareCount}}</span>
          </div>
        </div>
        <h4 style="margin: 0 auto;">上榜歌曲</h4>
        <div style="width: 95%; margin: 0 auto 10px;" >
          <table style="font-size: 12px; width: 90%; margin: 10px auto 0;">
            <tr>
              <td style="font-weight: 700;">歌名</td>
              <td style="font-weight: 700;">歌手</td>
              <td style="font-weight: 700; text-align: center">试听</td>
            </tr>
            <tr v-for="(val,index) in listDetails.tracks.slice((currentPage-1)*10,currentPage*10)">
              <td>{{val.name | cut}}</td>
              <td>{{val.ar[0].name}}</td>
              <td style="text-align: center"><i class="el-icon-service" @click="listen(index)"></i></td>
            </tr>
          </table>
          <el-pagination style="margin: 10px auto; " layout="prev, pager, next" :page-size="10" @current-change="current_change" :current-page.sync="currentPage" :pager-count="5"  :total="listDetails.tracks.length">
          </el-pagination>
        </div>
        <div v-show="bol" style="position: fixed; bottom: 10%; width: 100%; height: 55%; background-color: rgba(0,0,0,0.7); z-index: 4000">
          <a><i @click='backwards' class="el-icon-caret-left"  style="color: white; position: fixed; top: 38%; left: 5%; font-size: 20px; font-weight: 900; z-index: 4100"><span style="font-size: 12px;">返回</span></i></a>
          <audio :src="src" controls="controls" style="margin-top: 45px;" ></audio>
          <h4 style="color: white; margin-top: 20px;">歌词展示</h4>
          <p style="color: white; font-size: 12px; margin-top: 20px;" v-for="val in lyricsArray" v-if="val.bol">{{val.c}}</p>
        </div>
      </div>
     </div>
  </div>
</template>

<script>
  import SearchBar from './SearchBar';
export default {
        name: "ListDetails",
        components: {
          SearchBar,
        },
        data: function(){
          return {
            listIndex: "",
            listDetails: "",
            currentPage: 1,
            bol: false,
            src: "",
            lyricsArray: ""
          }
        },
        methods: {
          current_change(currentPage){
            this.currentPage = currentPage;
          },
          backwards(){
            this.bol = false;
            var audio = document.getElementsByTagName("audio")[0];
            audio.pause();
          },
          goHome (){
            this.$router.push("/home");
          },
          listen (index){
            var that = this;
            this.bol = true;
            this.src = "http://music.163.com/song/media/outer/url?id="+ this.listDetails.tracks[index + (this.currentPage-1)*10].id+ ".mp3";
            this.$http.get("http://musicapi.leanapp.cn/lyric", {params: {"id": this.listDetails.tracks[index + (this.currentPage-1)*10].id}}).then(
              function(res){
                // console.log(res.body.lrc.lyric);
                // var lrc = res.body.lrc.lyric.replace(/[\[|\]|\.|\:]/g,"");
                // var lyric = lrc.replace(/\d+/g,'');
                // console.log(lyric);
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
              })
var audio = document.getElementsByTagName("audio")[0];
var lineNo = 0;
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







          }
        },
        created (){
          this.listIndex = this.$route.query.listIndex;
          this.$http.get("http://musicapi.leanapp.cn/top/list", {params: {idx: this.listIndex}}).then(
            function(res){
              console.log(res.body.playlist);
              this.listDetails = res.body.playlist;
            },
            function(err){
              console.log(err);
            }
          )
        }
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
    margin: 20px 0px 0px 20px;
  }
  td{
    text-align: left;
  }
</style>
