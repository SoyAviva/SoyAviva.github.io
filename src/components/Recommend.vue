<template>
  <div>
    <search-bar style="margin-top: -20px; position: relative; z-index: 5000"/>

        <div class="grid-content">
          <el-menu class="el-menu-demo" mode="horizontal" default-active="1"  style="width: 100%; display: flex;  justify-content: space-between;">
            <el-menu-item index="1">新歌速递</el-menu-item>
            <el-menu-item index="2"><router-link to="/toplist">推荐歌单</router-link></el-menu-item>
            <el-menu-item index="3"><router-link to="/mv">推荐MV</router-link></el-menu-item>
          </el-menu>
        </div>


          <div style="height: 65%; position: fixed; bottom: 10%; overflow: scroll; ">
            <div v-for="(value,index) in recommends.slice((currentPage-
    1)*5,currentPage*5)" style="font-size: 12px; border-bottom: 1px solid rgb(230,230,230); display: flex; align-items: center; height: 100px;" >
              <img width="35%" height="100%" :src="value.album.picUrl">
              <div @click='to(index, currentPage)' style="display: flex; flex-direction: column; align-items: center; margin-left:10px; width: 45%;">
                <span><strong style="width: 90%; word-break:keep-all; white-space:nowrap; overflow:hidden;  text-overflow:ellipsis;">{{value.name | cut}}</strong></span>
                <span style="width: 90%; word-break:keep-all; white-space:nowrap; overflow:hidden;  text-overflow:ellipsis;">歌手：{{value.artists[0].name}}</span>
                <span style="width: 90%; word-break:keep-all; white-space:nowrap; overflow:hidden;  text-overflow:ellipsis;">专辑名称：{{value.album.name | cut}}</span>
                <span style="width: 90%; word-break:keep-all; white-space:nowrap; overflow:hidden;  text-overflow:ellipsis;">出版公司：{{value.album.company}}</span>
              </div>
              <div style="width: 20%; display: flex; flex-direction: column; align-items: center;">
                <span style="color: #c46243;">{{value.fee}}元</span>
                <button style="border: 1px solid #c46243; outline: 0; background-color: transparent; border-radius: 4px;">购买</button>
              </div>
            </div>
            <el-pagination class="addMarginTop" layout="prev, pager, next" :page-size="5" @current-change="current_change" :current-page.sync="currentPage" :pager-count="5"  :total="recommends.length">
            </el-pagination>
          </div>


</div>
</template>

<script>
  import SearchBar from './SearchBar';
    export default {
        name: "Recommend",
        components: {
          SearchBar,
        },
      data (){
          return {
            recommends: "",
            currentPage: 1,
          }
      },
      methods:{
        current_change(currentPage){
          this.currentPage = currentPage
        },
        to (index, currentPage){
          this.$router.push({path: '/details', query: {songId: this.recommends[index + (this.currentPage-1)*5].id}});
        }
       },

      beforeCreate: function(){
        this.$http.get("http://musicapi.leanapp.cn/top/song", {params: {type: 0}}).then(
          function(res){
            console.log(res.body.data);
            this.recommends = res.body.data;
            for(var i=0; i<res.body.data.length; i++){
              for(var j=1; j<res.body.data[i].artists.length; j++){
                res.body.data[i].artists[0].name = res.body.data[i].artists[0].name + "&" + res.body.data[i].artists[j].name;
              }
            }
          },
          function(err){
          console.log(err);
          });
        }
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .addMarginTop{
    margin-top: 10px;
  }
  a{
    text-decoration: none;
  }
</style>
