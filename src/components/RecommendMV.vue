<template>
    <div>
      <search-bar  style="margin-top: -20px; position: relative; z-index: 5000"/>

          <div class="grid-content">
            <el-menu class="el-menu-demo" mode="horizontal" default-active="3" style="width: 100%; display: flex;  justify-content: space-between;">
              <el-menu-item index="1"><router-link to="/recommend">新歌速递</router-link></el-menu-item>
              <el-menu-item index="2"><router-link to="/toplist">推荐歌单</router-link></el-menu-item>
              <el-menu-item index="3">推荐MV</el-menu-item>
            </el-menu>
          </div>

      <el-row >
        <el-col :span="24">
          <div class="grid-content">
            <div style="height: 65%; position: fixed; bottom: 10%; overflow: scroll;">
              <div v-for="(value,index) in MV" style="font-size: 12px; border-bottom: 1px solid rgb(230,230,230); display: flex; align-items: center; height: 100px;" >
                <img width="40%" height="95%" :src="value.picUrl">
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-left:10px; width: 230px; height: 95%;" @click="viewMv(value)">
                  <span style="width: 90%;"><strong>{{value.name}}</strong></span>
                  <span style="width: 90%;">歌手：{{value.artistName}}</span>
                  <span style="width: 90%; word-break:keep-all; white-space: normal; overflow:hidden;  text-overflow:ellipsis;">{{value.copywriter}}</span>
                  <span>播放量：{{value.playCount/10000 | fix2}}万</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import SearchBar from './SearchBar';
  export default {
    name: "RecommendMV",
    components: {
      SearchBar
    },
    data (){
      return {
        MV: "",
      }
    },
    methods: {
      viewMv(value){
        this.$router.push({path: '/mvdetails', query: {MvId: value.id}});
      }
    },
    beforeCreate(){
      this.$http.get("http://musicapi.leanapp.cn/personalized/mv").then(
        function(res){
          console.log(res.body.result);
          this.MV = res.body.result;
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
