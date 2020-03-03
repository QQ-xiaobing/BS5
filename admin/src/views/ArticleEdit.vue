<template>
  <div class="about">
    <h1>{{id ? "编辑" : "新建"}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save" :model="model">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <div id="main">
          <mavon-editor ref=md v-model="model.content" @imgAdd="$imgAdd"/>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      categories: [],
      model: {}
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`/rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    },

    async $imgAdd(num, file) {
      var formdata = new FormData();
      formdata.append('file', file);
      const res = await this.$http.post("/upload", formdata);
      this.$refs.md.$img2Url(num, res.data.url);
    }
  },

  created() {
    this.id && this.fetch(this.id);
    this.fetchCategories();
  }
};
</script>
