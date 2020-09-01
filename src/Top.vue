<template>
  <div id="app">
    <b-navbar class="navbar" toggleable="lg">
      <b-navbar-brand href="/">Tsuda Work</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item><router-link class="nav-link" to="/">All</router-link></b-nav-item>
          <b-nav-item class="nav-item" v-for="category in categories" :key="category.id">
              <router-link class="nav-link" :to="{name:'category', params:{value:category.id}}">{{category.name}}</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar> 
  <router-view :key="$route.path"></router-view>
  <!-- Footer -->
<footer class="page-footer font-small blue pt-4">
  <!-- Copyright -->
  <div class="footer-copyright text-center py-3">© 2019-2020 Tsuda Work.
  </div>
  <!-- Copyright -->
</footer>
  </div>
</template>

<script>
import axios from 'axios';
import states from "./assets/property.json";
export default {
  name: 'Top',
  data() {
      return {
        categories: [],
      }
  },
  mounted() {
    const url = states.hostname + states.categoriesUrl;
    (async () => {
      try {
        const res = await axios.get(url);
        this.categories = this.categories.concat(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  },
  watch: {
  },
  methods: {
  },
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 82vh;
  font-family: "Yu Gothic","Yu Gothic UI","Meiryo UI", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "MS PGothic", sans-serif; 
}
.navbar {
  background-color:rgba(0, 0, 0, 0);
}
.page-footer {
  margin-bottom:0;  
}
</style>