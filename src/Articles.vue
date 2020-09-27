<template>
  <div id="app">
    <transition name="fade">
      <!-- フェードイン実装のためv-ifは必要 -->
      <div v-if="ok" class="album py-3">
        <div class="container">
          <div class="row">
            <div class="col-md-4 mb-4" v-for="post in posts" :key="post.title.rendered">
              <div class="card h-100 shadow-sm">
                <router-link class="nav-link" :to="{name:'post', params:{value:post.id}}">
                    <img class="card-img-top" :src="post._embedded['wp:featuredmedia'][0].source_url" alt="">
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import states from "./assets/property.json";
export default {
  name: 'Articles',
  data() {
      return {
        posts: [],
        // フェードイン実装のために必要
        ok: false
      }
  },
  mounted() {
    var categoryId = this.$route.params.value;
    var url = states.hostname + states.postsUrl;
    if (categoryId != undefined) {
      url = states.hostname + states.categoryUrl + categoryId + '&_embed';
    }
    (async () => {  
      try {
        const res = await axios.get(url);
        this.posts = this.posts.concat(res.data);
        // マウント時にok=trueを実施
        this.ok = true;
      } catch (error) {
        console.log(error);
      }
    })();
  },
}
</script>

<style>
.card {
  display: flex;
  justify-content: center; /*左右中央揃え*/
  align-items: center; /*上下中央揃え*/
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>