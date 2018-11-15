<template>
  <div id="home">
    <search-bar style="margin-top: -20px;"/>
    <carousel></carousel>
    <lists style="margin-top: 5%;"></lists>
  </div>
</template>

<script>
import SearchBar from './SearchBar';
import Carousel from './Carousel';
import Lists from './Lists';
import NavMenu from "./NavMenu";

export default {
  name: 'Home',
  components: {
    NavMenu,
    SearchBar,
    Carousel,
    Lists
  },
}
</script>

<style>
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
