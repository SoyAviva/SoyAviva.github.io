<template>
    <div>
      <search-bar  style="margin-top: -20px; position: relative; z-index: 5000"/>

          <div>
            <el-menu class="el-menu-demo" mode="horizontal" default-active="2" style="width: 100%; display: flex;  justify-content: space-between;">
              <el-menu-item index="1"><router-link to="/recommend">新歌速递</router-link></el-menu-item>
              <el-menu-item index="2">推荐歌单</el-menu-item>
              <el-menu-item index="3"><router-link to="/mv">推荐MV</router-link></el-menu-item>
            </el-menu>
          </div>


            <div style="height: 65%; position: fixed; bottom: 10%; display: flex; flex-direction: column;">
              <div @click="checkDetails(index, currentPage)" v-for="(value,index) in topList.slice((currentPage-
      1)*5,currentPage*5)" style="font-size: 12px; border-bottom: 1px solid rgb(230,230,230); display: flex; align-items: top; height: 110px; overflow: hidden;" >
                <img width="100px" height="100px" :src="value.coverImgUrl">
                <div style="display: flex; flex-direction: column; align-items: center; margin-left:10px; width: 52%; height: 110px; padding-top: 5px;">
                  <span><strong style="width: 90%;">{{value.name}}</strong></span>
                  <span style="width: 90%; height: 50px; word-break:keep-all; white-space: normal; overflow:hidden;  text-overflow:ellipsis;">{{value.description}}</span>
                </div>
              </div>
            <el-pagination style="margin-top: 10px; margin-left: -70px;" layout="prev, pager, next" :page-size="5" @current-change="current_change" :current-page.sync="currentPage" :pager-count="5"  :total="topList.length">
            </el-pagination>
            </div>

          </div>

</template>

<script>
  import SearchBar from './SearchBar';
  export default {
    name: "RecommendTopList",
    components: {
      SearchBar
    },
    data (){
      return {
        currentPage: 1,
        topList: ""
      }
    },
    methods:{
      current_change(currentPage){
        this.currentPage = currentPage
      },
      checkDetails (index, currentPage){
        this.$router.push({path: "/recommendlistdetails", query: {listId: this.topList[index + (this.currentPage-1)*5].id}});
      }
    },
    beforeCreate(){
      this.$http.get("http://musicapi.leanapp.cn/top/playlist/highquality").then(
        function(res){
          console.log(res.body.playlists);
          this.topList = res.body.playlists;
        },
        function(err){
          console.log(err)
        }
      )
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
 a{
    text-decoration: none;
  }
</style>
