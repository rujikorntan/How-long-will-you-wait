<template>
  <div id="app">
    <!-- <Home /> -->
    
    <router-view />
  </div>
</template>

<script>
import { store } from "./store/store";
export default {
  store,
  name: "app"
};
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Source Sans Pro', sans-serif;
  color: #2c3e50;
  padding: 0;
}
</style>
