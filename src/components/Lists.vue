<template>
  <div>
      <div v-for="(value,index) in lists.slice((currentPage-1)*4,currentPage*4)"  style="width: 50%; display: inline-block">
        <div class="circle" :style="{ backgroundColor: bg_class[index] }"><i :class="icon[index]" style="color: #fff; font-size: 26px; line-height: 78px" ></i></div>
        <p style="font-size: 12px;" @click="sendList(index, currentPage)">{{value.name}}</p>
      </div>
    <el-row>
      <el-col :span="2"><div class="grid-content"></div></el-col>
      <el-col :span="20">
        <div class="grid-content">
        <el-pagination style="position: fixed; bottom: 10%; " layout="prev, pager, next" :page-size="4" @current-change="current_change" :current-page.sync="currentPage" :pager-count="5"  :total="lists.length">
        </el-pagination>
        </div>
      </el-col>
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Lists',
  data () {
    return {
    	lists: [],
      currentPage: 1,
      icon: ["el-icon-edit", "el-icon-news", "el-icon-date", "el-icon-star-off"],
 	    bg_class: ["#F79F48", "#66AAF5", "#6BB6F0", "#EE649F"],
      }
},
  methods:{
    current_change(currentPage){
      this.currentPage = currentPage;
     },
    sendList (index, currentPage){
      this.$router.push({path: '/listdetails', query: {listIndex: index + (this.currentPage-1)*4}});
    }
  },
  beforeCreate: function(){
  	for(let i=0; i<24; i++){
	  		this.$http.get("http://musicapi.leanapp.cn/top/list", {params: {idx: i}}).then(
	  		function(res){
	  			console.log(res.body.playlist);
	  			this.lists.push(res.body.playlist);
	  		},
	  		function(err){
	  			console.log(err);
	  		}
	  	)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div.circle{
    width: 78px;
    height: 78px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin: 0px auto 0px;
   }
a{
  font-size: 12px;
  text-decoration: none;
  color: black;
}
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
</style>
