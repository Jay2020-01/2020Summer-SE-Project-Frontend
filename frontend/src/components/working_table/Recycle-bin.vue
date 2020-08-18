<template>
  <div class="tabs_container">
    <!-- 标签组件 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 标签内容 -->
      <el-tab-pane label="回收站" name="first">
        <!-- 清空回收站是否确认的显示 -->
        <h6>这里是为了显示清空回收站按钮选择的哪一个，并方便以绑定事件,之后请删除</h6>
        <h5>点击了"{{ qingkong }}"</h5>
        <!-- 清空回收站图标与弹出框 -->

        <div style="text-align:right">
          <el-button type="danger" title="清空回收站" @click="open">
            <i class="el-icon-delete" />
          </el-button>
        </div>
        <!-- 以前的清空回收站
        <div style="text-align:right">
          <el-popconfirm
            popper-class="ceshi2"
            confirmButtonText="好的"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除所有文件吗？"
            @onConfirm="confirm"
          >
            <el-button slot="reference" title="清空回收站">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-popconfirm>
        </div>
        over-->

        <!-- 测试新卡片 -->
        <el-row>
          <el-col
            v-for="deleted_doc_info in deleted_doc_infos"
            :key="deleted_doc_info"
            style="width:200px"
          >
            <!-- span是说col标签能够影响的列数 -->
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <div class="bottom clearfix" style="text-align:right">
                <el-dropdown placement="bottom">
                  <!-- 操作图标 -->
                  <div class="card-pic">
                    <span class="el-dropdown-link">
                      <i class="el-icon-setting el-icon--right" />

                      <!-- 下拉图标 -->
                    </span>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <!-- 选项 -->
                    <el-dropdown-item style="border-bottom:1px solid #e5e5e5">
                      <i class="el-icon-magic-stick"></i>新标签页打开
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="restore(deleted_doc_info.doc_id)">
                      <i class="el-icon-collection-tag"></i>还原
                    </el-dropdown-item>
                    <!-- <el-dropdown-item style="border-bottom:1px solid #e5e5e5">
                      <i class="el-icon-position"></i>分享
                    </el-dropdown-item>-->
                    <!-- <el-dropdown-item>
                      <i class="el-icon-delete"></i>重命名
                    </el-dropdown-item>-->
                    <el-dropdown-item
                      @click.native="delete_completely(deleted_doc_info.doc_id)"
                      style="color:red;"
                    >
                      <i class="el-icon-delete"></i>彻底删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <!-- <center>
              图标
                <div class="picture inline-div">
                  <span class="fa fa-file-text-o" style="font-size:50px"></span>
                </div>
              </center>-->
              <i class="el-icon-document" style="font-size:50px" />

              <div style="padding: 14px;">
                <span>{{deleted_doc_info.doc_name}}</span>
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
      qingkong: "还没点",
      deleted_doc_infos: [],
    };
  },
  created: function () {
    this.get_deleted_docs_info();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    get_deleted_docs_info() {
      axios.post("http://localhost:8000/ajax/get_deleted_docs/").then((res) => {
        const deleted_docs_length = res.data.deleted_docs.length;
        for (let index = 0; index < deleted_docs_length; index++) {
          this.deleted_doc_infos.push({
            doc_id:
              res.data.deleted_docs[deleted_docs_length - index - 1].doc_id,
            doc_name:
              res.data.deleted_docs[deleted_docs_length - index - 1].name,
          });
        }
      });
    },
    restore(doc_id) {
      var data = Qs.stringify({
        doc_id: doc_id,
      });
      axios
        .post("http://localhost:8000/ajax/restore_doc/", data)
        .then((res) => {
          const flag = res.data.flag;
          if (flag == "yes") {
            this.$message({
              message: "已还原",
              type: "success",
            });
            var index = this.deleted_doc_infos.findIndex(
              (doc) => doc.doc_id === doc_id
            );
            this.deleted_doc_infos.splice(index, 1);
          } else {
            this.$message({
              message: "出错了，请重试",
              type: "warning",
            });
          }
        });
    },
    delete_completely(doc_id) {
      var data = Qs.stringify({
        doc_id: doc_id,
      });
      axios
        .post("http://localhost:8000/ajax/delete_doc_completely/", data)
        .then((res) => {
          const flag = res.data.flag;
          if (flag == "yes") {
            this.$message({
              message: "已彻底删除",
              type: "success",
            });
            var index = this.deleted_doc_infos.findIndex(
              (doc) => doc.doc_id === doc_id
            );
            this.deleted_doc_infos.splice(index, 1);
          } else {
            this.$message({
              message: "出错了，请重试",
              type: "warning",
            });
          }
        });
    },
    // 清空回收站
    delete_completely_all() {
      this.deleted_doc_infos.forEach(element => {
        this.delete_completely(element.doc_id)
      });
    },
    confirm() {
      this.qingkong = "确定";
    },
    // open
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.qingkong = "清空回收站";
          // 这里就是以后绑定事件写代码的地方
          this.delete_completely_all();
          this.$message({
            type: "success",
            message: "清空成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // end
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
.el-card {
  // margin: 0px 20px 0px 20px;//左侧的边距
  width: 100px;
  height: 135px;
  margin: 20px;
}
.el-card .card-pic {
  visibility: hidden;
}
.el-card:hover {
  cursor: pointer;
  border: 1px solid #409eff;
}
.el-card:hover .card-pic {
  visibility: visible;
}
.el-dropdown-link {
  cursor: pointer;
  color: gray;
}

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
.el-popconfirm {
  background-color: blue;
}
.ceshi2 {
  background-color: blue;
  border-width: 2px;
  border-color: blue;
}
.tile{
  display:-webkit-box;
  -webkit-box-orient: vertical;
  text-overflow:ellipsis;
  // text-overflow 属性规定当文本溢出包含元素时发生的事情。ellipsis显示省略符号来代表被修剪的文本。
  // white-space:nowrap;
  // 规定段落中的文本不进行换行,直到遇到br标签
  -webkit-line-clamp: 2;
  overflow:hidden;
  // hidden	内容会被修剪，并且其余内容是不可见的。
  
  width:80px;
  height: 26px;
  // height是让文本框只有两行显示，其实后面还会显示的，
  // 不过我们不能让用户看见，不信将height的值变大一点，就能看见了
}
</style>
