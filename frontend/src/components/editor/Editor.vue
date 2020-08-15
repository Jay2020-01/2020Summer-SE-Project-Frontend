<template>
  <div>
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header height="60px" direction="horizontal">
        <el-row type="flex" class="row-bg">
          <el-col :span="6" :offset="0">
            <div class="grid-content head-box1 bg-purple">
              <!-- 顶部工具栏区域 -->
              <!-- 返回按钮 -->
              <el-tooltip class="item" effect="dark" content="返回" placement="bottom">
                <el-button
                  size="big"
                  icon="fa fa-angle-left"
                  style="border: none;"
                  @click="backtoHome"
                ></el-button>
              </el-tooltip>
              <!-- 文件名 -->
              <span style="margin-left: 13px; font-size: 14px;">文件名</span>
              <!-- 收藏按钮 -->
              <el-tooltip class="item" effect="dark" content="收藏" placement="bottom">
                <el-button size="big" style="border: none; margin-left: 13px;" @click="onlike">
                  <i
                    class="el-icon-collection-tag"
                    :style="!islike?'':'color:red;font-weight:1000;'"
                  ></i>
                </el-button>
              </el-tooltip>
              <!-- 保存按钮 -->
              <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
                <el-button size="big" style="border: none; margin-left: 13px;" @click="clickSave">
                  <i class="fa fa-save"></i>
                </el-button>
              </el-tooltip>

              <!-- 自动保存文字(已废请保留) -->
              <!-- <span style="margin-left: 13px; color:#a5a5a5; font-size: 14px;">文档将自动保存</span> -->
            </div>
          </el-col>
          <el-col :span="5" :offset="7">
            <div class="grid-content head-box2 bg-purple-light">
              <el-input placeholder="搜索内容" v-model="input" size="small" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="6" style="height:60px;">
            <div class="grid-content head-box3 bg-purple">
              <!-- 这里是右上角的头像 -->
            <el-dropdown>
              <span class="el-dropdown-link">
                <div>
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled>{{username}}</el-dropdown-item>
                <el-dropdown-item disabled>{{mail_address}}</el-dropdown-item>
                <!-- <el-divider></el-divider> -->
                <!-- <el-dropdown-item >个人信息</el-dropdown-item> -->
                <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
                <el-dropdown-item @click.native="changeInfo">修改信息</el-dropdown-item>
                <el-dropdown-item style="color:red;" @click.native="logout">退出登录</el-dropdown-item>
                
              </el-dropdown-menu>
            </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 右侧内容主体 -->
        <el-main>
          <!-- <editor :content="content" @editorContent="getEditorContent"></editor> -->
          <!-- 测试按钮 -->
          <editor v-model="content" @editorContent="getEditorContent"></editor>
          <el-button size="small" @click="newdoc">测试</el-button>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <!-- <div>
    <editor v-model="content" ></editor>
  </div>-->
</template>

<script>
import editor from "./EditorComponent";
import axios from "axios";
import Qs from "qs";
export default {
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    changeInfo() {
      window.sessionStorage.clear();
      this.$router.push("/myinfo");
    },
    backtoHome() {
      this.$router.push("/home");
    },
    getEditorContent(data) {
      this.content = data;
    },
    newdoc() {
      // alert(this.content);
      var data = Qs.stringify({
        title: "test",
        content: this.content,
      });
      axios.post("ajax/newdoc/", data).then((resp) => {
        const flag = resp.data["flag"];
        if (flag == "yes") {
          alert("saved!");
        } else {
          alert("error!");
        }
      });
    },
    // 点击收藏的提示信息
    onlike() {
      this.islike = !this.islike;
      if (this.islike) {
        this.$message({
          message: "收藏成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "取消收藏",
          type: "warning",
        });
      }
    },
    // 点击保存的提示信息
    clickSave() {
      this.$message({
        message: "已保存",
        type: "success",
      });
    },
  },

  components: {
    editor,
  },
  data() {
    return {
      input: "",
      // 编辑器内容
      content: "",
      //收藏按钮
      islike: false,
      //改：根据登陆人员的的信息改(可能是表单形式)
      username: '檠莲焰',
      mail_address: '921049836@qq.com',
    };
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #ffffff;
  margin-bottom: 5px;
  color: #333;
  text-align: left;
  line-height: 60px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px #ddd;
  align-items: center;
}

.el-aside {
  padding-top: 30px;
  background-color: #ffffff;
  color: #333;
  text-align: left;
  line-height: 200px;
  border-right: 1px solid #eee;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #f7f7f7;
  // background-color: #ffffff;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

// 顶栏内容样式
.head-box1 {
  display: flex;
  align-items: center;
  // border: 1px solid red;
}
.el-avatar {
  margin: 10px 15px 10px 30px;
}
.site-name {
  font-size: 30px;
  color: #409eff;
}
.head-box3 {
  display: flex;
  align-items: center;
  // 居右对齐
  justify-content: flex-end;
}

// .bg-purple {
//   background: #d3dce6;
// }
// .bg-purple-light {
//   background: #e5e9f2;
// }
// .grid-content {
//   border-radius: 4px;
//   max-height: 30px;
// }
.row-bg {
  display: flex;
  align-items: center;
  // margin: 2.5px 0;
  // background-color: #f9fafc;
}
// .el-icon-collection-tag{
//   color: red;
// }
//编辑界面右上角的头像
.el-dropdown-link{
  cursor: pointer;
}
</style>
