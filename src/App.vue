<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/admin">Admin</router-link>
    </nav>
    <router-view />
  </div>
</template>


<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
}

nav a.router-link-active {
  color: #35495e;
}
</style>
