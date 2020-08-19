<template>
  <div class="tabs_container">
    <!-- 标签组件 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 标签内容 -->
      <el-tab-pane label="最近浏览" name="first">
        <!-- 一行三个 -->
        <el-row :gutter="12">
          <el-col v-for="doc_info in browsing_docs" :key="doc_info.doc_id" :span="8">
            <!-- 文件卡片 -->
            <el-card @click.native="toDoc(doc_info, false)" shadow="hover">
              <div class="card-container">
                <!-- 图标 -->
                <div class="picture inline-div">
                  <span class="fa fa-file-text-o" style="font-size:25px"></span>
                </div>
                <!-- 文字 -->
                <div class="word inline-div">
                  <div class="tile">{{doc_info.doc_name}}</div>
                  <div class="details">{{doc_info.browse_time}} 我 浏览</div>
                </div>

                <el-dropdown placement="bottom">
                  <!-- 后面的操作图标 -->
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
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
                    <el-dropdown-item
                      v-if="!doc_info.in_group"
                      @click.native="collect(doc_info.doc_id, doc_info.doc_name)"
                    >
                      <i class="el-icon-collection-tag"></i>收藏
                    </el-dropdown-item>
                    <el-dropdown-item
                      style="border-bottom:1px solid #e5e5e5"
                      @click.native="shareFormVisible = true; getDocLevel(doc_info.doc_id)"
                    >
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
      <el-tab-pane label="我创建的" name="second">
        <!-- 一行三个 -->
        <el-row :gutter="12">
          <el-col v-for="doc_info in doc_infos" :key="doc_info.doc_id" :span="8">
            <!-- 文件卡片 -->
            <el-card @click.native="toDoc(doc_info, false)" shadow="hover">
              <div class="card-container">
                <!-- 图标 -->
                <div class="picture inline-div">
                  <span class="fa fa-file-text-o" style="font-size:25px"></span>
                </div>
                <!-- 文字 -->
                <div class="word inline-div">
                  <div class="tile">{{doc_info.doc_name}}</div>
                  <div class="details">{{doc_info.created_time}} 我 创建</div>
                </div>

                <el-dropdown placement="bottom">
                  <!-- 后面的操作图标 -->
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
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
                    <el-dropdown-item @click.native="collect(doc_info.doc_id, doc_info.doc_name)">
                      <i class="el-icon-collection-tag"></i>收藏
                    </el-dropdown-item>
                    <el-dropdown-item
                      style="border-bottom:1px solid #e5e5e5"
                      @click.native="shareFormVisible = true; getDocLevel(doc_info.doc_id)"
                    >
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

    <!-- 隐藏分享表单 -->
    <el-dialog title="分享设置" :visible.sync="shareFormVisible">
      <el-form ref="shareForm" :model="shareForm">
        <el-form-item prop="link">
          <span style="float: left;">分享链接</span>
          <el-input
            suffix-icon="el-icon-link"
            v-model="shareForm.link"
            placeholder="分享链接"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div style="display: flex; align-items: center;">
        <!-- 可以多选权限 -->
        权限设置：
        <el-select v-model="shareLevel" size="big" placeholder="权限选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shareFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="shareFormVisible = false; setDocLevel();">确 定</el-button>
      </div>
    </el-dialog>

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
      doc_infos: [],
      browsing_docs: [],
      activeName: "first",
      share_doc_id: "",
      // 分享表单可见性
      renameVisible: false,
      renamed_doc_id: 0,
      docForm: {
        new_name: "",
      },
      shareFormVisible: false,
      shareForm: {
        link: "http://localhost:8080/#/workingTable",
      },
      // 分享权限
      shareLevel: "1",
      shareKey: "",
      options: [
        {
          value: "2",
          label: "只能阅读",
        },
        {
          value: "3",
          label: "只能评论",
        },
        {
          value: "4",
          label: "可以编辑",
        },
        {
          value: "1",
          label: "禁止访问",
        },
      ],
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
      axios.get("http://localhost:8000/ajax/my_doc/").then((res) => {
        const created_docs_length = res.data.created_docs.length;
        const browsing_docs_length = res.data.browsing_docs.length;
        for (let index = 0; index < created_docs_length; index++) {
          this.doc_infos.push({
            doc_id:
              res.data.created_docs[created_docs_length - index - 1].doc_id,
            doc_name:
              res.data.created_docs[created_docs_length - index - 1].name,
            created_time:
              res.data.created_docs[created_docs_length - index - 1]
                .created_time,
            team_id: -1,
            level: 4,
          });
        }
        for (let index = 0; index < browsing_docs_length; index++) {
          this.browsing_docs.push({
            doc_id:
              res.data.browsing_docs[browsing_docs_length - index - 1].doc_id,
            doc_name:
              res.data.browsing_docs[browsing_docs_length - index - 1].name,
            in_group:
              res.data.browsing_docs[browsing_docs_length - index - 1].in_group,
            browse_time:
              res.data.browsing_docs[browsing_docs_length - index - 1]
                .browse_time,
            team_id:
              res.data.browsing_docs[browsing_docs_length - index - 1].team_id,
            level:
              res.data.browsing_docs[browsing_docs_length - index - 1].level,
          });
        }
      });
    },
    toDoc(doc, in_new_page) {
      // 1级权限时不能打开
      console.log(doc);
      if (doc.level <= 1) {
        this.$message({
          showClose: true,
          message: "您没有查看文档的权限",
          type: "error",
        });
      } else {
        var data = Qs.stringify({
          doc_id: doc.doc_id,
        });
        axios.post("http://localhost:8000/ajax/update_browsing/", data);
        if (in_new_page) {
          var routeData = this.$router.resolve({
            name: "editor",
            params: {
              doc_id: doc.doc_id,
              team_id: doc.team_id,
              level: doc.level,
            },
          });
          // console.log(routeData.href)
          window.open(routeData.href, "_blank");
        } else {
          this.$router.push(
            "/editor/" + doc.doc_id + "/" + doc.team_id + "/" + doc.level
          );
        }
      }
    },
    rename_trig(doc) {
      if (doc.level < 4) {
        this.$message({
          showClose: true,
          message: "您没有重命名文档的权限",
          type: "error",
        });
      } else {
        this.renameVisible = true;
        this.renamed_doc_id = doc.doc_id;
        this.docForm.new_name = doc.doc_name;
      }
    },
    rename_doc() {
      var created_doc = this.doc_infos.find(
        (doc) => doc.doc_id === this.renamed_doc_id
      );
      var browsing_doc = this.browsing_docs.find(
        (doc) => doc.doc_id === this.renamed_doc_id
      );
      var doc = created_doc;
      if (doc === undefined) doc = browsing_doc;
      if (this.docForm.new_name.length == 0) {
        this.$message({
          showClose: true,
          message: "请输入文档标题",
          type: "error",
        });
      } else if (doc.doc_name == this.docForm.new_name) {
        this.$message({
          showClose: true,
          message: "未改变标题",
          type: "error",
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
              // 及时更新本地文档列表
              if(created_doc !== undefined) created_doc.doc_name = new_name
              if(browsing_doc !== undefined) browsing_doc.doc_name = new_name
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
    collect(doc_id, doc_name) {
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
              message: "收藏了，请重试",
              type: "warning",
            });
          }
        });
    },
    formatDate(date) {
      var year = date.getFullYear(),
        month = date.getMonth() + 1, //月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
      var newTime = year + "-" + month + "-" + day + " " + hour + ":" + min;
      return newTime;
    },
    delete_doc(doc) {
      if (doc.level < 4) {
        this.$message({
          showClose: true,
          message: "您没有删除文档的权限",
          type: "error",
        });
      } else {
        var data = Qs.stringify({
          doc_id: doc.doc_id,
        });
        axios
          .post("http://localhost:8000/ajax/delete_doc/", data)
          .then((res) => {
            const flag = res.data.flag;
            if (flag == "yes") {
              // 若是我创建的，在我创建的文档中删除
              var index = this.doc_infos.indexOf(doc);
              if (index >= 0) this.doc_infos.splice(index, 1);
              index = this.browsing_docs.indexOf(doc);
              if (index >= 0) this.browsing_docs.splice(index, 1);
              this.$message({
                showClose: true,
                message: "已删除",
                type: "success",
              });
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
    // 点击分享时,获取文档权限
    getDocLevel(doc_id) {
      var data = Qs.stringify({
        doc_id: doc_id,
      });
      this.share_doc_id = doc_id;
      this.shareForm.link =
        window.location.href.replace("workingTable", "editor") +
        "/" +
        doc_id +
        "/-1/4";
      // console.log(data);
      // console.log(this.shareForm.link = window.location.href);
      axios
        .post("http://localhost:8000/ajax/get_doc_key/", data)
        .then((res) => {
          this.shareLevel = res.data.share_level;
        });
    },
    // 设置分享文档权限
    setDocLevel() {
      var data = Qs.stringify({
        doc_id: this.share_doc_id,
        level: this.shareLevel,
      });
      console.log(data);
      axios
        .post("http://localhost:8000/ajax/edit_share_level/", data)
        .then((res) => {
          this.$message({
            showClose: true,
            message: "已设置权限",
            type: "success",
          });
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