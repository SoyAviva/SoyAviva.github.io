import Vue from 'vue';
Vue.filter("cut", function(val){
  return val.substr(0,12);
})
Vue.filter("fix2", function(val){
  return val.toFixed(2);
})
