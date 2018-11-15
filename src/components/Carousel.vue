<template>
    <el-row >
     <el-col>
      <div class="grid-content">
          <el-carousel height="150px" indicator-position="outside" arrow="always">
            <el-carousel-item  v-for="val in banners" :key="val.index">
              <img :src="val.picUrl" width="100%" height="100%"/>
            </el-carousel-item>
          </el-carousel>
      </div>
     </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      banners: []
    }
  },
  beforeCreate: function(){
  	this.$http.get("http://musicapi.leanapp.cn/banner").then(
  		function(res){
  			// console.log(res.data.banners);
  			this.banners = res.data.banners;
  		},
  		function(err){
  			console.log(err);
  		}
  	)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
