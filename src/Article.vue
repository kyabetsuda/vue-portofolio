<template>
  <transition name="fade">
    <div v-if="ok" class="container">
      <div class="row">
        <div class="article" v-html="post.content.rendered">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';
import states from "./assets/property.json";
export default {
  name: 'Article',
  data() {
      return {
        post: null,
        // フェードイン実装のために必要
        ok: false
      }
  },
  mounted() {
    var postId = this.$route.params.value;
    const url = states.hostname + states.postUrl + postId + '?_embed';
    (async () => {
      try {
        const res = await axios.get(url);
        var posts = [];
        this.post = posts.concat(res.data)[0];
        // マウント時にok=trueを実施
        this.ok = true;
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>