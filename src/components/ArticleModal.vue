<template>
  <transition name="modal-tmp">
    <div class="modal-tmp-mask">
      <div class="modal-tmp-wrapper">
        <div class="modal-tmp-container">

          <div class="modal-tmp-header">
            <slot name="header">
              <h3>{{posts[0].title.rendered}}</h3>
            </slot>
          </div>

          <div class="modal-tmp-body">
            <slot name="body">
                <div ref="content" class="content">
                  <div class="article">
                  </div>
                </div>
            </slot>
          </div>

          <div class="modal-tmp-footer">
            <slot name="footer">
              <button class="btn btn-light" @click="$emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';
import states from "../assets/property.json";
export default {
  name: 'ArticleModal',
  props: ['postId'],
  data() {
      return {
        posts: [],
      }
  },
  mounted() {
    this.page = 1;
    const postId = this.$props.postId;
    const url = states.hostname + states.postUrl + postId + '?_embed';
    (async () => {
      try {
        const res = await axios.get(url);
        this.posts = this.posts.concat(res.data);
        this.loading = false;
        // 本文を挿入
        var contents = document.getElementsByClassName('article');
        contents[0].innerHTML = await this.posts[0].content.rendered;
      } catch (error) {
        console.log(error);
        this.empty();
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
/* ==============================================================================================
基本設定
============================================================================================== */
.modal-tmp-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-tmp-wrapper {
  display: table-cell;
  vertical-align: middle;
  overflow: scroll;
}

.modal-tmp-container {
  margin: 0px auto;
  height: 90%;
  background-color: rgba(255, 255, 255, 255);
  overflow-y: scroll;
  font-family: "Yu Gothic","Yu Gothic UI","Meiryo UI", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "MS PGothic", sans-serif; 
}

.modal-tmp-body {
  margin: 20px 0;
  min-height:60vh;
}

.modal-tmp-default-button {
  float: right;
}

.modal-tmp-enter {
  opacity: 0;
}

.modal-tmp-leave-active {
  opacity: 0;
}

.modal-tmp-enter .modal-tmp-container,
.modal-tmp-leave-active .modal-tmp-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-tmp-open {
  overflow: hidden;
}

.modal-tmp-open .modal-tmp {
  overflow-x: hidden;
  overflow-y: auto;
}

/* ==============================================================================================
モーダルの大きさ調整
============================================================================================== */
@media (min-width: 1000px) {
   .modal-tmp-container {
     width: 50%;
    }
}

@media (min-width: 900px) {
   .modal-tmp-container {
     width: 55%;
    }
}

@media (min-width: 800px) {
   .modal-tmp-container {
     width: 60%;
    }
}

@media (min-width: 700px) {
   .modal-tmp-container {
     width: 70%;
    }
}

@media (min-width: 600px) {
   .modal-tmp-container {
     width: 75%;
    }
}

/* ==============================================================================================
app.cssからコピペ(modal-headerおよびmodal-footerの設定を調整するため)
============================================================================================== */
.modal-tmp {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}

.modal-tmp-dialog {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
}

.modal-tmp.fade .modal-tmp-dialog {
  transition: transform 0.3s ease-out;
  transform: translate(0, -50px);
}

@media (prefers-reduced-motion: reduce) {
  .modal-tmp.fade .modal-tmp-dialog {
    transition: none;
  }
}

.modal-tmp.show .modal-tmp-dialog {
  transform: none;
}

.modal-tmp.modal-tmp-static .modal-tmp-dialog {
  transform: scale(1.02);
}

.modal-tmp-dialog-scrollable {
  display: flex;
  max-height: calc(100% - 1rem);
}

.modal-tmp-dialog-scrollable .modal-tmp-content {
  max-height: calc(100vh - 1rem);
  overflow: hidden;
}

.modal-tmp-dialog-scrollable .modal-tmp-header,
.modal-tmp-dialog-scrollable .modal-tmp-footer {
  flex-shrink: 0;
}

.modal-tmp-dialog-scrollable .modal-tmp-body {
  overflow-y: auto;
}

.modal-tmp-dialog-centered {
  display: flex;
  align-items: center;
  min-height: calc(100% - 1rem);
}

.modal-tmp-dialog-centered::before {
  display: block;
  height: calc(100vh - 1rem);
  height: -webkit-min-content;
  height: -moz-min-content;
  height: min-content;
  content: "";
}

.modal-tmp-dialog-centered.modal-tmp-dialog-scrollable {
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.modal-tmp-dialog-centered.modal-tmp-dialog-scrollable .modal-tmp-content {
  max-height: none;
}

.modal-tmp-dialog-centered.modal-tmp-dialog-scrollable::before {
  content: none;
}

.modal-tmp-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.modal-tmp-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}

.modal-tmp-backdrop.fade {
  opacity: 0;
}

.modal-tmp-backdrop.show {
  opacity: 0.5;
}

.modal-tmp-header {
  display: flex;
  justify-content: center; /*左右中央揃え*/
  align-items: center; /*上下中央揃え*/
  padding: 1rem 1rem;
  /* border-bottom: 1px solid #dee2e6; */
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}

.modal-tmp-header .close {
  padding: 1rem 1rem;
  margin: -1rem -1rem -1rem auto;
}

.modal-tmp-title {
  margin-bottom: 0;
  line-height: 1.5;
}

.modal-tmp-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}

.modal-tmp-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;
  /* border-top: 1px solid #dee2e6; */
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
}

.modal-tmp-footer > * {
  margin: 0.25rem;
}

.modal-tmp-scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll;
}

@media (min-width: 576px) {
  .modal-tmp-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
  }
  .modal-tmp-dialog-scrollable {
    max-height: calc(100% - 3.5rem);
  }
  .modal-tmp-dialog-scrollable .modal-tmp-content {
    max-height: calc(100vh - 3.5rem);
  }
  .modal-tmp-dialog-centered {
    min-height: calc(100% - 3.5rem);
  }
  .modal-tmp-dialog-centered::before {
    height: calc(100vh - 3.5rem);
    height: -webkit-min-content;
    height: -moz-min-content;
    height: min-content;
  }
  .modal-tmp-sm {
    max-width: 300px;
  }
}

@media (min-width: 992px) {
  .modal-tmp-lg,
  .modal-tmp-xl {
    max-width: 800px;
  }
}

@media (min-width: 1200px) {
  .modal-tmp-xl {
    max-width: 1140px;
  }
}

/* ==============================================================================================
微調整
============================================================================================== */
.content img{
  width: 90%;
}

.article {
  text-align:center;
}

.article p {
  text-align:left;
  margin-right:1rem;
  margin-left:1rem;
}

@media screen and (orientation: portrait) {
   .content img {
     width:100%
   }
   .article p {
      text-align:left;
      margin-right:0rem;
      margin-left:0rem;
    }
}





</style>