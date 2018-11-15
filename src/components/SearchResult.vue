<template>
  <div style="position: relative; height: 100%">
    <i @click='backward' class="el-icon-caret-left"  style="color: #c46243; position: absolute; left: 10px; top: -20px;"><span style="font-size: 12px;">返回</span></i>
    <div style="position: relative; top: 10%; left: 0; height: 500px; overflow: scroll;">
      <table style="font-size: 12px;">
        <tr style="font-weight: 700">
          <td style="width: 50%;">歌曲名称</td>
          <td style="width: 30%;">歌手</td>
          <td style="width: 20%;">试听</td>
        </tr>
        <tr v-for="val in result" style="width: 100%">
          <td style="width: 50%;">{{val.name}}</td>
          <td style="width: 30%;">{{val.artists[0].name}}</td>
          <td style="width: 20%;"><i class="el-icon-service" @click="listen(val.id)"></i></td>
        </tr>
      </table>
    </div>
    <div v-show="bol" style="position: fixed; top: 20%; left: 0px; width: 100%; height: 55%; background-color: rgba(0,0,0,0.7); z-index: 4000">
      <a><i @click='backwards' class="el-icon-caret-left"  style="color: white; position: absolute; top: 5px; left: 5%; font-size: 20px; font-weight: 900; z-index: 4100"><span style="font-size: 12px;">返回</span></i></a>
      <audio :src="src" controls="controls" style="margin-top: 45px;"></audio>
      <h4 style="color: white; margin-top: 20px;">歌词展示</h4>
      <p style="color: white; font-size: 12px; margin-top: 20px; " v-for="val in lyricsArray"  v-if="val.bol">{{val.c}}</p>
    </div>
  </div>
</template>

<script>
  export default {
        name: "SearchResult",
        data (){
          return {
            keywords: "",
            result: "",
            src: "",
            bol: false,
            lyricsArray: ""
          }
        },
        methods: {
          backward (){
            this.$router.back(-1);
          },
          listen (val){
            var that = this;
            this.bol = true;
            this.src = "http://music.163.com/song/media/outer/url?id="+ val+ ".mp3";
            this.$http.get("http://musicapi.leanapp.cn/lyric", {params: {"id": val}}).then(
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





          },
          backwards(){
            this.bol = false;
            var audio = document.getElementsByTagName("audio")[0];
            audio.pause();
          },
        },
        beforeCreate(){
          this.keywords = this.$route.query.keywords;
          this.$http.get("http://musicapi.leanapp.cn/search", {params: {keywords: this.keywords}}).then(
            function(res){
              console.log(res.body.result.songs);
              this.result = res.body.result.songs;
            },
            function(err){
              console.log(err)
            }
          )

        }
    }
</script>

<style scoped>
  span{
    font-size: 12px;
    line-height: 16px;
  }
  h6{
    text-align: left;
    margin: 20px 10px 0px;
  }
</style>
