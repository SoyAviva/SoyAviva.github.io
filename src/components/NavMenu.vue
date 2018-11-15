<template class= "nav_bar" >
        <el-row style="background-color: white; width: 100%; margin: 0 auto;">
            <el-col :span="6" v-for="(val, index) in menu_list" :key="val.id">
                <div class="grid-content"  @click="changeColor(index)" style="cursor: pointer">
                    <p><router-link :to="val.path" :class="{'hLight':val.bol, 'visited': !val.bol}"><i :class="val.icon"></i></router-link></p>
                    <p><router-link :to="val.path" :class="{'hLight':val.bol, 'visited': !val.bol}">{{val.name}}</router-link></p>
                </div>
            </el-col>
        </el-row>
</template>


<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      menu_list: [
          {id: 0, name: "首页", bol: false, icon: "el-icon-menu",path: "/home"},
          {id: 2, name: "市场", bol: false, icon: "el-icon-tickets",path: "/market"},
          {id: 4, name: "推荐", bol: false, icon: "el-icon-star-on", path: "/recommend"},
          {id: 5, name: "登陆", bol: false, icon: "el-icon-more", path: "/login"},
      ],

    }
  },
  methods: {
      changeColor: function(index){
          for(var i=0; i<this.menu_list.length; i++){
              this.menu_list[i].bol = false;
              this.menu_list[index].bol = true;
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p{
    font-size: 12px;
    line-height: 12px;
    cursor: pointer;
}
i{
    font-size: 16px;
    cursor: pointer;
}
.hLight{
    color: #c46243;
}
.visited{
    color: black;
}
</style>


