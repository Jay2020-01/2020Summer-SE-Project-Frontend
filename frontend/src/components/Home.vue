<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header height="60px" direction="horizontal">
      <el-row type="flex" class="row-bg">
        <el-col :span="6" :offset="0">
          <div class="grid-content head-box1 bg-purple">
            <!-- 头像区域 -->
            <el-avatar
              icon="fa fa-diamond"
              style="color: #409eff; background-color: #fff !important; cursor:pointer;"
              :size="40"
              @click.native="backtoHome"
            >logo</el-avatar>
            <span class="site-name">钻石文档</span>
          </div>
        </el-col>
        <el-col :span="5" :offset="7">
          <div class="grid-content head-box2 bg-purple-light">
            <el-input
              v-model="input"
              prefix-icon="fa fa-search"
              placeholder="搜索文档"
              size="small"
              clearable
            />
          </div>
        </el-col>
        <el-col :span="6" style="height:60px">
          <div class="grid-content head-box3 bg-purple">
            <!-- 通知图标 -->
            <el-dropdown
              style="height:60px; display: flex; align-items: center;"
              @visible-change="getNoticeList"
            >
              <el-badge is-dot class="item" :hidden="this.noticeList.length == 0">
                <!-- 上面这里的hidden就是判断是否显示小红点的 -->
                <span
                  class="el-dropdown-link"
                  style="height:20px;  display: flex; align-items: center;"
                >
                  <i class="el-icon-bell" style="height:20px;font-size:20px;" />
                </span>
              </el-badge>
              <!-- 通知图标下面的下拉栏 -->
              <el-dropdown-menu slot="dropdown">
                <!-- 这里好像要用嵌套路由来写下面的内容 -->
                <el-row>
                  <el-col :span="12" style="text-align:center; width: 350px">
                    <h5>全部消息</h5>
                  </el-col>
                  <!-- <el-col :span="12" style="float:center;position:relative;top:20px;right:-20px">
                    <el-button type="primary" size="small">全部标记为已读</el-button>
                  </el-col>-->
                </el-row>

                <!-- 消息通知新样式 -->
                <!-- 文件卡片 -->
                <div :key="index" v-for="(notice, index) in noticeList">
                  <el-card shadow="hover">
                    <div class="card-container">
                      <!-- 图标 -->
                      <div class="picture inline-div">
                        <span class="fa fa-file-text-o" style="font-size:25px" />
                      </div>
                      <!-- 文字 -->
                      <div class="word inline-div">
                        <div class="title">{{notice.actor_name + " 邀请我进入 " +notice.target_name}}</div>
                        <div class="details">{{ notice.sent_time }}</div>
                      </div>
                      <!-- 按钮 -->
                      <div style="display: flex; align-items: center;">
                        <el-button
                          size="mini"
                          type="success"
                          icon="el-icon-check"
                          @click="responseInvitation(index, 'Yes')"
                          circle
                        ></el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          icon="el-icon-close"
                          @click="responseInvitation(index, 'No')"
                          circle
                        ></el-button>
                      </div>
                    </div>
                  </el-card>
                </div>

                <!-- <div>
                  <el-table
                    :data="noticeList"
                    border="false"
                    :show-header="false"
                    style="width: 100%"
                  >
                    <el-table-column label="图片" width="50">
                      <template>
                        <img
                          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                          width="40"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="actor_name" label="邀请人" width="70"></el-table-column>
                    <el-table-column prop="邀请你加入" label="邀请信息" width="100"></el-table-column>
                    <el-table-column prop="target_name" label="团队名称"></el-table-column>
                    <el-table-column prop="sent_time" label="时间" width="100"></el-table-column>
                    <el-table-column prop="sent_time" label="时间" width="100"></el-table-column>
                  </el-table>
                </div>-->
              </el-dropdown-menu>
            </el-dropdown>

            <!-- 这里是右上角的头像 -->
            <el-dropdown style="height:60px">
              <span class="el-dropdown-link">
                <div>
                  <el-avatar :size="35" :src="imageUrl" />
                </div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled>{{ username }}</el-dropdown-item>
                <el-dropdown-item disabled>{{ mail_address }}</el-dropdown-item>
                <!-- <el-divider></el-divider> -->
                <!-- <el-dropdown-item >个人信息</el-dropdown-item> -->
                <el-divider>
                  <i class="el-icon-mobile-phone" />
                </el-divider>
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
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区域  default-active="1"没写-->
        <el-menu background-color="#fff" text-color="#535353" active-text-color="#409eff" router>
          <!-- 新建按钮 -->
          <!-- old-code -->
          <!-- <el-menu-item class="ceshi">
              <el-button size="midium" @click="newFile" type="primary" plain>新建文档</el-button>
          </el-menu-item>-->
          <div class="new-doc">
            <el-button size="midium" type="primary" plain @click="canNewDoc();">新建文档</el-button>
          </div>
          <!-- 不分级菜单 -->
          <el-menu-item index="/workingTable">
            <i class="fa fa-archive" style="padding: 0 10px 0 10px" />
            <span slot="title">工作台</span>
          </el-menu-item>
          <!-- 不分级菜单 -->
          <el-menu-item index="/inbox">
            <i class="fa fa-envelope-o" style="padding: 0 10px 0 10px" />
            <span slot="title">收件箱</span>
          </el-menu-item>
          <!-- 分割线 -->
          <div style="margin: 8px 20px; height: 1.5px; background-color: rgb(230, 230, 230);" />
          <!-- 不分级菜单 -->
          <el-menu-item index="/myDesktop">
            <i class="fa fa-desktop" style="padding: 0 10px 0 10px" />
            <span slot="title">我的桌面</span>
          </el-menu-item>

          <!-- 一级菜单 -->
          <el-submenu index="/teamSpace">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="fa fa-cube" style="padding: 0 10px 0 10px" />
              <!-- 文本 -->
              <span>团队空间</span>
              <!-- 新增团队按钮 -->
              <span>
                <i class="add-team fa fa-plus-circle" @click.stop="dialogFormVisible = true" />
              </span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              v-for="(team, i) in teamList"
              :key="i"
              class="second-menu"
              :index="'/teamSpace/'+team.team_id"
            >
              <template slot="title">
                <!-- 图标 -->
                <!-- <i class="el-icon-location"></i> -->
                <!-- 文本 -->
                <span>{{ team.team_name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <!-- 不分级菜单 -->
          <el-menu-item index="/trash">
            <i class="fa fa-trash-o" style="padding: 0 12px 0 11px" />
            <span slot="title">回收站</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 隐藏的新建团队表单 -->
        <el-dialog title="新建团队空间" :visible.sync="dialogFormVisible">
          <el-form ref="teamForm" :model="teamForm">
            <el-form-item prop="name">
              <span style="float: left;">空间名称</span>
              <el-input v-model="teamForm.name" placeholder="请输入" autocomplete="off" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="dialogFormVisible = false; createTeam('teamForm') "
            >确 定</el-button>
          </div>
        </el-dialog>

        <!-- 隐藏的新建文件的表单 -->
        <el-dialog title="新建文档" :visible.sync="newdocVisible">
          <el-form ref="docForm" :model="docForm" label-width="80px">
            <el-form-item label="文档名称">
              <el-input v-model="docForm.name" placeholder="无标题" />
              <!-- <el-button style="text-align: left;">使用模板</el-button> -->
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button style="text-align: left;" @click="newdocVisible=false;use_templates();">使用模板</el-button>
            <el-button @click="newdocVisible = false">取 消</el-button>
            <el-button type="primary" @click="newFile();">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 路由占位符 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      input: "",
      // 默认激活
      activeIndex: "/workingTable",
      dialogFormVisible: false,
      newdocVisible: false,
      // 新建团队时提交的团队名表单
      teamForm: {
        name: "",
      },
      // 存储团队信息
      teamList: [],
      docForm: {
        name: "",
        authority: [],
        // 如果不用在新建的时候设置权限就把上面这个删了
      },
      formLabelWidth: "120px",
      // 改：根据登陆人员的的信息改(可能是表单形式)
      username: "",
      mail_address: "",
      imageUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      // 消息列表
      noticeList: [],
    };
  },
  created: function () {
    this.get_user_info();
    this.getTeamList();
  },
  // activated: function() {
  //   this.getTeamList();
  // },
  beforeUpdate: function () {
    this.get_user_info();
  },
  methods: {
    // 拉取用户名和邮箱地址
    get_user_info() {
      axios.get("http://localhost:8000/ajax/user_info/").then((res) => {
        this.username = res.data.username;
        this.mail_address = res.data.mail_address;
        this.imageUrl = res.data.url;
      });
    },
    createTeam(formName) {
      // 验证表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = Qs.stringify(this.teamForm); // 先用Qs对数据进行处理
          axios
            .post("http://localhost:8000/ajax/create_team/", data)
            .then(this.getTeamList())
            .catch((err) => console.log(err));
        } else {
          alert("表格不能为空");
        }
        // 强制刷新
        // this.$router.go(0);
        // this.activeIndex = "/teamSpace";
      });
    },
    // 获取团队名列表
    async getTeamList() {
      try {
        const resp = await this.get_my_team();
        this.teamList = resp.data.team_list;
      } catch (err) {
        console.log(err);
      }
      // console.log(this.teamList)
      // console.log(this.teamList[0].team_id)
      // console.log(typeof(this.teamList[0].team_id))
    },
    get_my_team() {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/ajax/get_my_team/")
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 判断能否新建文档
    canNewDoc() {
      var team_id = parseInt(this.$route.params.team_id);
      if (typeof(this.$route.params.team_id) === 'undefined') {
        console.log("is nan")
        this.newdocVisible = true;
      } else {
        for (var i = 0; i < this.teamList.length; i++) {
          if (team_id == this.teamList[i].team_id) {
            if (this.teamList[i].level < 4) {
              this.$message({
                showClose: true,
                message: "您的权限不能创建文档",
                type: "error",
              });
              break;
            }else{
              this.newdocVisible = true;
            }
          }
        }
      }
    },
    // 获取消息列表
    getNoticeList() {
      console.log("success");
      axios.get("http://localhost:8000/ajax/get_user_notice/").then((res) => {
        this.noticeList = res.data.notice_list;
      });
    },
    // 从消息列表统意/拒绝邀请
    responseInvitation(index, answer) {
      var data = Qs.stringify({
        notice_id: this.noticeList[index].notice_id,
        answer: answer,
        team_id: this.noticeList[index].target_id,
      });
      console.log(data);
      axios
        .post("http://localhost:8000/ajax/response_invitation/", data)
        .then((res) => {});
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    changeInfo() {
      window.sessionStorage.clear();
      this.$router.push("/myinfo");
    },
    // 暂时用不了，teamList level字段缺失
    async newFile() {
      // var myDate = new Date();
      // 限制必须输入文档标题
      if (this.docForm.name.length == 0) {
        this.$message({
          showClose: true,
          message: "请输入文档标题",
          type: "error",
        });
      } else {
        this.newdocVisible = false;
        window.sessionStorage.clear();
        var doc_id = 0;
        var team_id = parseInt(this.$route.params.team_id);
        var level = 4;
        // console.log(this.teamList)
        if (team_id >= 0) {
          level = this.teamList.find((team) => team.team_id == team_id).level;
        } else {
          team_id = -1;
        }
        // console.log(myDate.toLocaleString());
        // console.log(level)
        try {
          const resp = await this.get_docid();
          console.log(resp);
          const flag = resp.data.flag;
          doc_id = resp.data.doc_id;
          if (flag == "yes") {
            this.$message({
              message: "新建成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "新建文档出错",
              type: "warning",
            });
          }
        } catch (err) {
          console.log(err);
        }
        // console.log(doc_id);
        this.$router.push("/editor/" + doc_id + "/" + team_id + "/" + level);
      }
    },
    get_docid(data) {
      return new Promise((resolve, reject) => {
        var team_id = parseInt(this.$route.params.team_id);
        if (team_id >= 0) {
          console.log("新建团队文档");
        } else {
          team_id = -1;
          console.log("新建个人文档");
        }
        var data = Qs.stringify({
          title: this.docForm.name,
          team_id: team_id,
          // create_time: myDate.toLocaleString(),
        });
        axios
          .post("http://localhost:8000/ajax/create_doc/", data)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    backtoHome() {
      window.sessionStorage.clear();
      this.$router.push("/home");
    },
    use_templates() {
      // this.$message({
        // showClose:true,
      //     message: "请跳转到选择模板页面",
      //     type: "warning",
      //   });
      this.$router.push("/templates");
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #ffffff;
  margin-bottom: 7px;
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
  background-color: #ffffff;
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
}
.el-avatar {
  margin: 10px 15px 10px 30px;
}
.site-name {
  font-size: 20px;
  color: #409eff;
}
.head-box3 {
  display: flex;
  align-items: center;
  height: 60px;
  box-sizing: border-box;
  // 居右对齐
  justify-content: flex-end;
  // border: 1px solid red;
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
  align-items: center;
  // margin: 2.5px 0;
  // background-color: #f9fafc;
}

// 二级菜单样式
.second-menu {
  padding-left: 50px !important;
  color: #7a7d81 !important;
  font-size: 12px !important;
}
// 新增团队按钮
.add-team {
  padding: 0 10px;
}
.add-team:hover {
  transform: scale(1.4);
}
.new-doc {
  width: 199px;
  height: 56px;
  line-height: 56px;
  padding-left: 30px;
  // background-color: blue;
  // text-align: center;
  display: table-cell;
  vertical-align: middle;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
// 卡片样式
.el-card {
  margin: 5px;
}
// 卡片内容样式
.card-container {
  align-items: center;
  display: flex;
  height: 50px;
  width: 300px;
}
.inline-div {
  display: inline-block;
}
.picture {
  box-sizing: border-box;
  align-items: center;
  width: 15%;
}
.word {
  width: 80%;
  text-align: left;
}
.title {
  font-size: 12px;
}
.details {
  margin-top: 3px;
  font-size: 10px;
  color: #999;
}
</style>
