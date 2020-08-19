<template>
  <div class="tabs_container">
    <!-- 标签组件 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 标签内容 -->
      <el-tab-pane label="搜索结果" name="first">
        <!-- 一行两个 -->
        <el-row :gutter="12">
          <el-col v-for="(o) in 2" :key="o" :span="8">
            <!-- 文件卡片 -->
            <el-card shadow="hover">
              <div class="card-container">
                <!-- 图标 -->
                <div class="picture inline-div">
                  <span class="fa fa-file-text-o" style="font-size:25px" />
                </div>
                <!-- 文字 -->
                <div class="word inline-div">
                  <div class="tile">钻石文档aaaaaaaaaaa</div>
                  <div class="details">今天 10:20 我 打开</div>
                </div>

                <el-dropdown placement="bottom">
                  <!-- 后面的操作图标 -->
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right" />
                    <!-- 下拉图标 -->
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <!-- 选项 -->
                    <el-dropdown-item style="border-bottom:1px solid #e5e5e5">
                      <i class="el-icon-magic-stick"></i>新标签页打开
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <i class="el-icon-collection-tag"></i>收藏
                    </el-dropdown-item>
                    <el-dropdown-item style="border-bottom:1px solid #e5e5e5">
                      <i class="el-icon-position"></i>分享
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <i class="el-icon-delete"></i>重命名
                    </el-dropdown-item>
                    <el-dropdown-item style="color:red;">
                      <i class="el-icon-delete"></i>删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      activeName: "first",
      doc_infos: [],
    };
  },
  created: function () {
    this.getResult();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取搜索结果
    getResult() {
      var data = Qs.stringify({
        keyword: this.$route.params.keyword,
      });
      console.log(data);
      axios
        .post("http://localhost:8000/ajax/doc_search/", data)
        .then((res) => {
          this.doc_infos = res.data.docs;
        });
    },
  },
};
</script>

<style lang="less" scoped>
// 切换标签样式
// 取消下方横线
.tabs_container /deep/.el-tabs__nav-wrap::after {
  position: static !important;
}

// 卡片样式
.el-card {
  margin: 20px;
}
.el-card:hover {
  cursor: pointer;
  border: 1px solid #409eff;
}
// 卡片内容样式
.card-container {
  align-items: center;
  display: flex;
}
.inline-div {
  display: inline-block;
}
.picture {
  box-sizing: border-box;
  align-items: center;
  width: 25%;
}
.word {
  width: 70%;
  text-align: left;
}
.title {
  font-size: 14px;
}
.details {
  margin-top: 3px;
  font-size: 11px;
  color: #999;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.tile {
  display: block;
  text-overflow: ellipsis;
  // text-overflow 属性规定当文本溢出包含元素时发生的事情。ellipsis显示省略符号来代表被修剪的文本。
  white-space: nowrap;
  // 规定段落中的文本不进行换行,直到遇到br标签
  overflow: hidden;
  // hidden	内容会被修剪，并且其余内容是不可见的。
  width: 100px;
  // 这个是文档名称的长度，如果想显示名称长一点就改这个
}
</style>
