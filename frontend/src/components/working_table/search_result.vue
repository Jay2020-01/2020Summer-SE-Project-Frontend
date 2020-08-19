<template>
  <div class="tabs_container">
    <!-- 标签组件 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 标签内容 -->
      <el-tab-pane label="搜索结果" name="first">
        <!-- 一行两个 -->
        <el-row :gutter="12">
          <el-col v-for="doc_info in doc_infos" :key="doc_info.doc_id" :span="8">
            <!-- 文件卡片 -->
            <el-card @click.native="toDoc(doc_info, false)" shadow="hover">
              <div class="card-container">
                <!-- 图标 -->
                <div class="picture inline-div">
                  <span class="fa fa-file-text-o" style="font-size:25px" />
                </div>
                <!-- 文字 -->
                <div class="word inline-div">
                  <div class="tile">{{doc_info.name}}</div>
                  <div class="details">{{doc_info.created_time}} 被创建</div>
                </div>

                <el-dropdown placement="bottom">
                  <!-- 后面的操作图标 -->
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right" />
                    <!-- 下拉图标 -->
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <!-- 选项 -->
                    <el-dropdown-item
                      @click.native="toDoc(doc_info, true)"
                      style="border-bottom:1px solid #e5e5e5"
                    >
                      <i class="el-icon-magic-stick"></i>新标签页打开
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="collect(doc_info.doc_id, doc_info.name)">
                      <i class="el-icon-collection-tag"></i>收藏
                    </el-dropdown-item>
                    <el-dropdown-item style="border-bottom:1px solid #e5e5e5">
                      <i class="el-icon-position"></i>分享
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="rename_trig(doc_info)">
                      <i class="el-icon-delete"></i>重命名
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="delete_doc(doc_info)" style="color:red;">
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

    <!-- 隐藏的重命名表单 -->
    <el-dialog title="重命名" :visible.sync="renameVisible">
      <el-form ref="docForm" :model="docForm" label-width="80px">
        <el-form-item label="文档名称">
          <el-input v-model="docForm.new_name" placeholder="无标题" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="renameVisible = false">取 消</el-button>
        <el-button type="primary" @click="rename_doc();renameVisible = false;">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      activeName: "first",
      renameVisible: false,
      renamed_doc_id: 0,
      docForm: {
        new_name: "",
      },
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
      axios.post("http://localhost:8000/ajax/doc_search/", data).then((res) => {
        this.doc_infos = res.data.docs;
      });
    },
    toDoc(doc, in_new_page) {
      // 1级权限时不能打开
      console.log(doc);
      var data = Qs.stringify({
        doc_id: doc.doc_id,
      });
      axios.post("http://localhost:8000/ajax/update_browsing/", data);
      if (in_new_page) {
        var routeData = this.$router.resolve({
          name: "editor",
          params: {
            doc_id: doc.doc_id,
            team_id: -1,
            level: 4,
          },
        });
        // console.log(routeData.href)
        window.open(routeData.href, "_blank");
      } else {
        this.$router.push("/editor/" + doc.doc_id + "/" + -1 + "/" + 4);
      }
    },
    collect(doc_id) {
      var data = Qs.stringify({
        doc_id: doc_id,
      });
      axios
        .post("http://localhost:8000/ajax/collect_doc/", data)
        .then((res) => {
          const flag = res.data.flag;
          if (flag == "yes") {
            this.$message({
              showClose: true,
              message: "已收藏",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "已经收藏",
              type: "warning",
            });
          }
        });
    },
    rename_trig(doc) {
      this.renameVisible = true;
      this.renamed_doc_id = doc.doc_id;
      this.docForm.new_name = doc.name;
    },
    rename_doc() {
      var doc = this.doc_infos.find(
        (doc) => doc.doc_id === this.renamed_doc_id
      );
      console.log(doc);
      if (this.docForm.new_name.length == 0) {
        this.$message({
          showClose: true,
          message: "请输入文档标题",
          type: "error",
        });
      } else if (doc.name == this.docForm.new_name) {
        this.$message({
          showClose: true,
          message: "未改变标题",
          type: "warning",
        });
      } else {
        var new_name = this.docForm.new_name;
        this.docForm.new_name = "";
        var data = Qs.stringify({
          doc_id: this.renamed_doc_id,
          title: new_name,
        });
        axios
          .post("http://localhost:8000/ajax/rename_doc/", data)
          .then((res) => {
            const flag = res.data.flag;
            if (flag) {
              this.$message({
                showClose: true,
                message: "已重命名",
                type: "success",
              });
              // 及时更新
              doc.name = new_name;
            } else {
              this.$message({
                showClose: true,
                message: "出错了，请重试",
                type: "warning",
              });
            }
          });
      }
    },
    delete_doc(doc) {
      var data = Qs.stringify({
        doc_id: doc.doc_id,
      });
      console.log(this.collected_doc_infos);
      axios.post("http://localhost:8000/ajax/delete_doc/", data).then((res) => {
        const flag = res.data.flag;
        if (flag == "yes") {
          this.$message({
            showClose: true,
            message: "已删除",
            type: "success",
          });
          var index = this.doc_infos.indexOf(doc)
          this.doc_infos.splice(index, 1)
        } else {
          this.$message({
            showClose: true,
            message: "出错了，请重试",
            type: "warning",
          });
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
