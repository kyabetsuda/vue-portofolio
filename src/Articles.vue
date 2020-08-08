<template>
  <div id="app">
    <div class="album py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4" v-for="post in posts" :key="post.title.rendered">
            <div class="card h-100 p-2 shadow-sm">
              <img class="card-img-top" :src="post._embedded['wp:featuredmedia'][0].source_url" alt="" id="show-modal" @click="openModal(event, post.id)">
              <ArticleModal v-if="showModal && showId == post.id" :postId="post.id" @close="showModal = false"></ArticleModal>
              <div class="card-body">
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ArticleModal from './components/ArticleModal.vue'
import states from "./assets/property.json";
export default {
  name: 'Articles',
  components: { ArticleModal },
  data() {
      return {
        posts: [],
        showModal: false,
      }
  },
  mounted() {
    this.page = 1;
    var categoryId = this.$route.params.value;
    var url = states.hostname + states.postsUrl;
    if (categoryId != undefined) {
      url = states.hostname + states.categoryUrl + this.$route.params.value + '&_embed';
    }
    (async () => {  
      try {
        const res = await axios.get(url);
        this.posts = this.posts.concat(res.data);
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.empty();
      }
    })();
  },
  watch: {
  },
  methods: {
    openModal : function (event, showId) {
      this.showModal = true;
      this.showId = showId;
    }
  },
}
</script>

<style>
</style>