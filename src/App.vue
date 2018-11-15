<template>
  <div id="app">
    <router-view></router-view>
    <div style="position:fixed; bottom: 0%; left: 0px; width: 100%; z-index: 10000">
      <nav-menu/>
    </div>
  </div>
</template>

<script>
import NavMenu from './components/NavMenu'


export default {
  name: 'App',
  components: {
    NavMenu
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
