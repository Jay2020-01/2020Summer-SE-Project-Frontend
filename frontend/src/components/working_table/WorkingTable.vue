<template>
  <div class="tabs_container">
    <!-- 标签组件 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 标签内容 -->
      <el-tab-pane label="最近浏览" name="first"></el-tab-pane>
      <el-tab-pane label="我创建的" name="second">
        <!-- 一行三个 -->
        <el-row :gutter="12">
          <el-col v-for="doc_info in doc_infos" :key="doc_info.doc_id" :span="8">
            <!-- 文件卡片 -->
            <el-card @click.native="toDoc(doc_info.doc_id)" shadow="hover">
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
                    <el-dropdown-item style="border-bottom:1px solid #e5e5e5">
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
                    <el-dropdown-item>
                      <i class="el-icon-delete"></i>重命名
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="delete_doc(doc_info.doc_id)"
                      style="color:red;"
                    >
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
        <!-- 一行三个 -->
        <el-row :gutter="12">
          <el-col v-for="doc_info in collected_doc_infos" :key="doc_info.doc_id" :span="8">
            <!-- 文件卡片 -->
            <el-card @click.native="toDoc(doc_info.doc_id)" shadow="hover">
              <div class="card-container">
                <!-- 图标 -->
                <div class="picture inline-div">
                  <span class="fa fa-file-text-o" style="font-size:25px"></span>
                </div>
                <!-- 文字 -->
                <div class="word inline-div">
                  <div class="tile">{{doc_info.doc_name}}</div>
                  <div class="details">{{doc_info.collected_time}} 我 收藏</div>
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
                    <el-dropdown-item @click.native="uncollect(doc_info.doc_id)">
                      <i class="el-icon-collection-tag"></i>取消收藏
                    </el-dropdown-item>
                    <el-dropdown-item style="border-bottom:1px solid #e5e5e5">
                      <i class="el-icon-position"></i>分享
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <i class="el-icon-delete"></i>重命名
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="delete_doc(doc_info.doc_id)"
                      style="color:red;"
                    >
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

    <!-- 隐藏分享表单 -->
    <el-dialog title="分享设置" :visible.sync="shareFormVisible">
      <el-form ref="shareForm" :model="shareForm">
        <el-form-item prop="link">
          <span style="float: left;">分享链接</span>
          <el-input suffix-icon="el-icon-link" v-model="shareForm.link" placeholder="分享链接" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div style="display: flex; align-items: center;">
        <!-- 可以多选权限 -->
        权限设置：
        <el-select 
        @blur="setDocLevel" 
        v-model="shareLevel" 
        size="big" 
        placeholder="权限选择"
        >
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
        <el-button type="primary" @click="shareFormVisible = false; createTeam('shareForm') ">确 定</el-button>
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
      collected_doc_infos: [],
      activeName: "first",
      // 分享表单可见性
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
        const collected_docs_length = res.data.collected_docs.length;
        for (let index = 0; index < created_docs_length; index++) {
          this.doc_infos.push({
            doc_id:
              res.data.created_docs[created_docs_length - index - 1].doc_id,
            doc_name:
              res.data.created_docs[created_docs_length - index - 1].name,
            created_time:
              res.data.created_docs[created_docs_length - index - 1]
                .created_time,
          });
        }
        for (let index = 0; index < collected_docs_length; index++) {
          this.collected_doc_infos.push({
            doc_id:
              res.data.collected_docs[collected_docs_length - index - 1].doc_id,
            doc_name:
              res.data.collected_docs[collected_docs_length - index - 1].name,
            collected_time:
              res.data.collected_docs[collected_docs_length - index - 1]
                .collected_time,
          });
        }
      });
    },
    toDoc(doc_id) {
      this.$router.push("/editor/" + doc_id + "/-1/4");
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
            this.collected_doc_infos.unshift({
              doc_id: doc_id,
              doc_name: doc_name,
              collected_time: this.formatDate(new Date()),
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
    uncollect(doc_id) {
      var data = Qs.stringify({
        doc_id: doc_id,
      });
      axios
        .post("http://localhost:8000/ajax/uncollect_doc/", data)
        .then((res) => {
          const flag = res.data.flag;
          if (flag == "yes") {
            this.$message({
              showClose: true,
              message: "已取消收藏",
              type: "success",
            });
            var index = this.collected_doc_infos.findIndex(
              (doc) => doc.doc_id === doc_id
            );
            this.collected_doc_infos.splice(index, 1);
          } else {
            this.$message({
              showClose: true,
              message: "出错了，请重试",
              type: "warning",
            });
          }
        });
    },
    delete_doc(doc_id) {
      var data = Qs.stringify({
        doc_id: doc_id,
      });
      console.log(this.collected_doc_infos);
      axios.post("http://localhost:8000/ajax/delete_doc/", data).then((res) => {
        const flag = res.data.flag;
        if (flag == "yes") {
          // 若在收藏中，先在收藏列表中删除
          var index = this.collected_doc_infos.findIndex(
            (doc) => doc.doc_id === doc_id
          );
          console.log(index);
          if (index >= 0) {
            this.collected_doc_infos.splice(index, 1);
          }
          // 在我创建的文档中删除该文档
          index = this.doc_infos.findIndex((doc) => doc.doc_id === doc_id);
          this.doc_infos.splice(index, 1);
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
    },
    // 点击分享时,获取文档权限
    getDocLevel(doc_id) {
      var data = Qs.stringify({
        doc_id: doc_id,
      });
      console.log(data);
      axios.post("http://localhost:8000/ajax/get_doc_key/", data).then((res) => {
          this.shareLevel = res.data.share_level;
          this.shareKey = res.data.key;
        });
    },
    // 设置分享文档权限
    setDocLevel() {
      var data = Qs.stringify({
        key: this.shareKey,
        level: this.shareLevel,
      });
      console.log(data);
      axios.post("http://localhost:8000/ajax/edit_share_level/", data).then((res) => {
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