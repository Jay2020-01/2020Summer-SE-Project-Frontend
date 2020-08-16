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
          <el-col v-for="doc_info in doc_infos" :key="doc_info" :span="8">
            <!-- 文件卡片 -->
            <el-card shadow="hover">
              <div class="card-container">
                <!-- 图标 -->
                <div class="picture inline-div">
                  <span class="fa fa-file-text-o" style="font-size:25px"></span>
                </div>
                <!-- 文字 -->
                <div class="word inline-div">
                  <div class="tile" @click="toDoc(doc_info.doc_id)">{{doc_info.doc_name}}</div>
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
                    <el-dropdown-item @click.native="collect(doc_info.doc_id, doc_info.doc_name)">
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
      <el-tab-pane label="我的收藏" name="third">
        角色管理
        <!-- 一行三个 -->
        <el-row :gutter="12">
          <el-col v-for="doc_info in collected_doc_infos" :key="doc_info" :span="8">
            <!-- 文件卡片 -->
            <el-card shadow="hover">
              <div class="card-container">
                <!-- 图标 -->
                <div class="picture inline-div">
                  <span class="fa fa-file-text-o" style="font-size:25px"></span>
                </div>
                <!-- 文字 -->
                <div class="word inline-div">
                  <div class="tile" @click="toDoc(doc_info.doc_id)">{{doc_info.doc_name}}</div>
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
                    <el-dropdown-item @click.native="uncollect(doc_info.doc_id, doc_info.doc_name)">
                      <i class="el-icon-collection-tag"></i>取消收藏
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
      doc_infos: [],
      collected_doc_infos: [],
      activeName: "first",
    };
  },
  created: function () {
    this.getDocsInfo();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getDocsInfo() {
      axios.get("ajax/my_doc/").then((res) => {
        const created_docs_length = res.data.created_docs.length
        const collected_docs_length = res.data.collected_docs.length
        for (let index = 0; index < created_docs_length; index++) {
          this.doc_infos.push({
            doc_id: res.data.created_docs[created_docs_length-index-1].doc_id,
            doc_name: res.data.created_docs[created_docs_length-index-1].name,
          });
        }
        for (let index = 0; index < collected_docs_length; index++) {
          this.collected_doc_infos.push({
            doc_id: res.data.collected_docs[collected_docs_length-index-1].doc_id,
            doc_name: res.data.collected_docs[collected_docs_length-index-1].name,
          });
        }
      });
    },
    toDoc(doc_id) {
      this.$router.push('/editor/' + doc_id)
    },
    collect(doc_id, doc_name) {
      var data = Qs.stringify({
        doc_id: doc_id,
      });
      axios.post("ajax/collect_doc/",data).then((res)=> {
        const flag = res.data.flag;
        if (flag == "yes") {
          this.$message({
            message: "已收藏",
            type: "success",
          });
        } else {
          this.$message({
            message: "收藏了，请重试",
            type: "warning",
          });
        }
      })
      this.collected_doc_infos.unshift({doc_id: doc_id, doc_name: doc_name})
    },
    uncollect(doc_id, doc_name) {
      var data = Qs.stringify({
        doc_id: doc_id,
      });
      axios.post("ajax/uncollect_doc/",data).then((res)=> {
        const flag = res.data.flag;
        if (flag == "yes") {
          this.$message({
            message: "已取消收藏",
            type: "success",
          });
        } else {
          this.$message({
            message: "出错了，请重试",
            type: "warning",
          });
        }
      })
      var index = this.collected_doc_infos.indexOf({doc_id: doc_id, doc_name: doc_name})
      this.collected_doc_infos.splice(index,1)
    }
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