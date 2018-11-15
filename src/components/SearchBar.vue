<template>
  <div>
    <el-row>
      <el-col :span="2"><div class="grid-content"></div></el-col>
      <el-col :span="20"><div class="grid-content">
          <el-input placeholder="音乐/专辑/歌手/歌单" class="input-search" v-model="keyword">
            <el-button slot="append" icon="el-icon-search" @click="checkResult"></el-button>
          </el-input>
        </div></el-col>
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>
  <el-popover placement="bottom-end" width="150px" content="请输入搜索关键词~" v-model="visible">
  </el-popover>
  </div>
</template>

<script>
export default {
    name: "SearchBar",
    methods: {
      checkResult (){
        if(this.keyword != ""){
          this.$router.push({path: '/result', query: {keywords: this.keyword}});
        }else{
          this.visible = true;
          setTimeout(()=>{this.visible = false}, 1500);
        }
      }
    },
    data(){
      return {
        keyword: "",
        visible: false
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-search{
  font-size: 12px;
}
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


</style>
