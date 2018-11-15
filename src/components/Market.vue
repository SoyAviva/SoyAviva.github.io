<template>
  <div>
    <search-bar style="margin-top: -20px;"/>
    <div class="item" style="font-size: 12px; margin-top: -20px; margin-bottom: 15px; padding-bottom: 10px;position: relative;" v-for="(val, index) in products" :class="index%2 == 1 ? bg : bg2">
          <div style="display: flex; flex-direction: row;" >
              <img :src="val.img" width="115px" height="115px" >
              <div style="height: 115px; line-height: 12px; width: 70%;">
                  <p style="position: relative; z-index: 1000">{{val.name}}</p>
                  <p><span>颜色：{{val.color}}</span><span>型号：{{val.size}}</span></p>
                  <i class="el-icon-error" @click="removeItem(index)" style="position: absolute; top: 30px; right: 5px;"></i>
              </div>
          </div>
          <div style="width: 100%; margin-top: -50px;">
            <span style="font-size: 20px; color: #C46243; font-weight: 900; margin-left: 110px;">¥{{val.price}}</span>
            <button @click="reduceQty(index)" style="margin-left: 25px;width: 30px; height: 20px; background-color: #C46243; border: 0px; outline: 0;">-</button>
            <input type="number" style="text-align: center; width: 40px; outline: 0; " v-model="val.qty">
            <button @click="addQty(index)" style="width: 30px; height: 20px; background-color: #C46243; border: 0; outline: 0;">+</button>
          </div>

      <el-popover placement="top-start" width="120" content="数量不能再减少啦~" v-model="val.visible">
      </el-popover>
    </div>
    <div  style="display: flex; justify-content: space-between; font-size: 12px;" >
      <div>
        <input type="checkbox" id="clearCart" @click="wipeOut">
        <label for="clearCart">清空购物车</label>
      </div>
      <span>商品总价：¥{{totalValue}}</span>
    </div>
    <div style="display: flex; justify-content: space-around; font-size: 12px; margin-top: 10px;">
      <button>继续购物</button><button class="bg3">确认结算</button>
    </div>
    <div class="mask" v-if="bol">
      <el-alert center title="请先登陆" type="error" style="position: relative; top: 45%;" @close="shutDown"></el-alert>
    </div>
  </div>
</template>

<script>
  import SearchBar from './SearchBar'
    export default {
        name: "Market",
        components: {
          SearchBar,
        },
      data (){
           return {
            products: [
              {name: "变形金刚狂派博派健康陶瓷马克杯", img: '../../static/0.jpeg', color: "黑色", size: "L", price: 15, qty: 1, visible: false},
              {name: "茶饮订阅礼盒-四周音乐主题套装", img: '../../static/1.jpeg', color: "酷黑", size: "L", price: 29, qty: 1, visible: false},
              {name: "音乐进口拼色羊毛围巾帽子礼盒装", img: '../../static/2.jpeg', color: "黑红白", size: "M", price: 99,  qty: 1, visible: false},
              {name: "网易云音乐官方定制帆布袋", img: '../../static/3.jpeg', color: "米白", size: "L", price: 29, qty: 1, visible: false},
            ],
            bg: "bg",
            bg2: "bg2",
            totalValue: 172,
            bol: false,
          }
      },
      methods: {
        removeItem (index){
          this.totalValue -= this.products[index].price;
          this.products.splice(index, 1);
        },
        reduceQty: function(index){
          if(this.products[index].qty > 1){
            this.products[index].qty -= 1;
            this.totalValue -= this.products[index].price;
          }else if(this.products[index].qty <= 1){
            this.products[index].qty = 1;
            this.products[index].visible = true;
            setTimeout(()=>{this.products[index].visible = false}, 1500);
          }
        },
        addQty: function(index){
          this.products[index].qty += 1;
          this.products[index].visible = false;
          this.totalValue += this.products[index].price;
        },
        wipeOut: function(){
          this.products = ""
        },
        shutDown (){
          this.bol = false;
          this.$router.push("/login");
        }
      },
      mounted (){
        var username = window.localStorage.getItem("username");
        if(username == null){
          this.bol = true;
        }
      }
    }
</script>

<style scoped>
  .bg{
    background-color: linen;
  }
  .bg2{
    background-color: transparent;
   }
  .bg3{
    background-color:#C46243;
  }
  button{
    width: 100px;
    height: 25px;
    line-height: 25px;
    color: white;
    border: 0;
    outline: 0;
    margin-top: 5px;
  }
  .mask{
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,1);
    top: 0%;
    left: 0%;
    position: fixed;
    z-index: 5000;
  }
</style>
