<template>
  <transition name="fade">
    <div v-if="ok" class="container">
      <div class="row">
        <div class="articleContainer">
          <div class="article">
            <h2 class="title">{{post.title.rendered}}</h2> 
            <div class="content" v-html="post.content.rendered">
            </div>
          </div>
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
.articleContainer {
  display: flex;
  justify-content: center; /*左右中央揃え*/
  align-items: center; /*上下中央揃え*/
  width: 100%;
}

.article > .title {
  text-align: center;
}

.article {
  width: 50%;
}

.article img {
  width: 100%;
}

/* フェードインの設定 */
.fade-enter-active
/* , .fade-leave-active */
{
  transition: opacity 2s;
}
.fade-enter
/* , .fade-leave-to */
{
  opacity: 0;
}
.fade-leave-active {
  display:none;
}
</style>