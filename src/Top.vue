<template>
  <div id="app">
    <b-navbar class="navbar" toggleable="lg">
      <b-navbar-brand href="/">Tsuda Work</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown :text="category.name" class="nav-item" v-for="category in categories" :key="category.id">
              <b-dropdown-item><router-link class="nav-link" :to="{name:'category', params:{value:category.id}}">All</router-link></b-dropdown-item>
              <b-dropdown-item :text="subCategory.name" class="nav-item" v-for="subCategory in category.subCategories" :key="subCategory.id">
                <router-link class="nav-link" :to="{name:'category', params:{value:subCategory.id}}">{{subCategory.name}}</router-link>
              </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar> 
    <router-view :key="$route.path"></router-view>
    <footer class="page-footer font-small blue pt-4">
      <div class="footer-copyright text-center py-3">© 2019-2020 Tsuda Work.</div>
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
        // カテゴリー取得
        const res = await axios.get(url);
        var categoriesTmp = [];
        categoriesTmp = categoriesTmp.concat(res.data);
        for (var categoryTmp of categoriesTmp) {
          // サブカテゴリ―の場合は処理をスキップ
          if (categoryTmp.parent > 0) {
            continue;
          }

          // カテゴリー作成
          var category = {};
          category['id'] = categoryTmp.id;
          category['name'] = categoryTmp.name;
          category['subCategories'] = [];

          // サブカテゴリー取得
          const resForSubCategories = await axios.get(url + "?parent=" + categoryTmp.id);
          var subCategoriesTmp = [];
          subCategoriesTmp = subCategoriesTmp.concat(resForSubCategories.data);
          for (var subCategoryTmp of subCategoriesTmp) {
            // サブカテゴリー作成
            var subCategory = {};
            subCategory['id'] = subCategoryTmp.id;
            subCategory['name'] = subCategoryTmp.name;
            // サブカテゴリ―配列に追加
            category['subCategories'].push(subCategory);
          }
          
          // カテゴリー配列に追加
          this.categories.push(category);
        }
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