<template>
  <div class="tabs_container">
    <!-- 标签组件 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 标签内容 -->
      <el-tab-pane label="最近浏览" name="first"></el-tab-pane>
      <el-tab-pane label="我创建的" name="second">
        配置管理
        <!-- 一行三个 -->
        <el-row :gutter="12">
          <el-col v-for="docName in docNames" :key="docName" :span="8">
            <!-- 文件卡片 -->
            <el-card shadow="hover">
              <div class="card-container">
                <!-- 图标 -->
                <div class="picture inline-div">
                  <span class="fa fa-file-text-o" style="font-size:25px"></span>
                </div>
                <!-- 文字 -->
                <div class="word inline-div">
                  <div class="tile">{{docName}}</div>
                  <div class="details">今天 10:20 我 打开</div>
                </div>

                <el-dropdown placement="bottom">
                  <!-- 后面的操作图标 -->
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
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
      <el-tab-pane label="我的收藏" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="团队文档" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      docNames: [],
      activeName: "first",
    };
  },
  created: function () {
    this.getDocsName();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getDocsName() {
      axios.get("ajax/my_doc/").then((res) => {
        for (let index = 0; index < res.data.data.length; index++) {
          this.docNames.push(res.data.data[index].name);
        }
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
</style>