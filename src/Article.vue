<template>
  <transition name="fade">
    <div v-if="ok" class="container">
      <div class="row">
        <div class="articleContainer">
          <div class="article">
            <h3 class="title">{{post.title.rendered}}</h3> 
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
        this.post = res.data;
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
.articleContainer {
  display: flex;
  justify-content: center; /*左右中央揃え*/
  align-items: center; /*上下中央揃え*/
  width: 100%;
}

.article > .title {
  text-align: center;
}

.article img {
  width: 100%;
}

@media screen and (min-width: 800px){
	.article{
		width:60%;
	}
}

@media screen and (max-width: 799px){
	.article{
		width:85%;
	}
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