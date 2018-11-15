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
          <div style="display: flex; width: 70%; flex-direction: column; align-items: flex-start; text-indent: 20px;  font-size: 12px">
            <span style="margin-top: 30px; ">歌单名称:{{listDetails.name}}</span>
            <span>订阅量：{{listDetails.subscribedCount/10000 | fix2}}万</span>
            <span>歌曲总数：{{listDetails.trackCount}}</span>
            <span style="margin-bottom: 30px;">更新时间：{{new Date(parseInt(1541058522919)).toLocaleString().replace(/:\d{1,2}$/,' ')}}</span>
          </div>
          <div style="display: flex; width: 90px; height: 90px; background-color: white; flex-direction: column; justify-content: space-around; margin-top: 20px; margin-left: 6px;">
            <span style="font-size: 12px;">分享次数</span>
            <span style="font-size: 20px; font-weight: 900;">{{listDetails.shareCount}}</span>
          </div>
        </div>
        <h4 style="margin: 0 auto;">上榜歌曲</h4>
        <div style="width: 98%; margin: 0 auto 10px;">
          <table style="font-size: 12px; width: 90%; margin: 10px auto 0;">
            <tr>
              <td style="font-weight: 700;">歌名</td>
              <td style="font-weight: 700;">歌手</td>
              <td style="font-weight: 700; text-align: center">试听</td>
            </tr>
            <tr v-for="(val, index) of listDetails.tracks.slice((currentPage-1)*10,currentPage*10)">
              <td style="width: 50%;">{{val.name}}</td>
              <td style="width: 20%;">{{val.ar[0].name}}</td>
              <td style="text-align: center"><i class="el-icon-service" @click="listen(val)"></i></td>
            </tr>
          </table>
          <el-pagination style="margin: 10px auto;" layout="prev, pager, next" :page-size="10" @current-change="current_change" :current-page.sync="currentPage" :pager-count="5"  :total="listDetails.tracks.length">
          </el-pagination>
        </div>
        <div v-show="bol" style="position: fixed; bottom: 10%; width: 100%; height: 55%; background-color: rgba(0,0,0,0.5); z-index: 4000">
          <a><i @click='backwards' class="el-icon-caret-left"  style="color: white; position: fixed; top: 38%; left: 5%; font-size: 20px; font-weight: 900; z-index: 4100"><span style="font-size: 12px;">返回</span></i></a>
          <audio :src="src" controls="controls" style="margin-top: 45px;"></audio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchBar from './SearchBar'
    export default {
      components: {SearchBar},
      name: "RecommendListDetails",
      data (){
        return {
          listId: "",
          listDetails: "",
          bol: false,
          src: "",
          currentPage: 1,
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
          this.$router.push("/toplist");
        },
        listen(val){
          this.bol = true;
          this.src = "http://music.163.com/song/media/outer/url?id="+ val.id+".mp3"
        }
      },
      beforeCreate (){
        this.listId = this.$route.query.listId;
        this.$http.get("http://musicapi.leanapp.cn/playlist/detail", {params: {"id": this.listId}}).then(
          function(res){
            console.log(res.body.playlist);
            this.listDetails = res.body.playlist;
          },
          function(err){
            console.log(res.body)
          }
        )
      }
    }
</script>

<style scoped>
  td{
    text-align: left;
  }
</style>
