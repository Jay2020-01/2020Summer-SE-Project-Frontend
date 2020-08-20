<template>
  <div>
    <div class="tabs_container">
      <!-- 标签组件 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 标签内容 -->
        <!-- 标签一：团队文档 -->
        <el-tab-pane label="团队文档" name="first">
          <div style="text-align:right">
            <el-dropdown v-if="!isLeader" placement="bottom">
              <!-- 团队的一些操作 -->
              <span class="el-dropdown-link">
                <i class="el-icon-setting el-icon--right" />
                <!-- 下拉图标 -->
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- 选项 -->
                <el-dropdown-item @click.native="exitTeam" style="color:red">
                  <i class="el-icon-delete" />退出团队
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <!-- 测试新卡片 -->
          <el-row>
            <el-col v-for="teamDoc in teamDocs" :key="teamDoc.doc_id" style="width:200px">
              <!-- span是说col标签能够影响的列数 -->
              <el-card
                @click.native="toDoc(teamDoc.doc_id, false)"
                :body-style="{ padding: '0px' }"
                shadow="hover"
              >
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
                      <el-dropdown-item
                        @click.native="toDoc(teamDoc.doc_id, true)"
                        style="border-bottom:1px solid #e5e5e5"
                      >
                        <i class="el-icon-magic-stick" />新标签页打开
                      </el-dropdown-item>
                      <!-- <el-dropdown-item>
                        <i class="el-icon-collection-tag" />收藏
                      </el-dropdown-item>-->
                      <el-dropdown-item style="border-bottom:1px solid #e5e5e5">
                        <i class="el-icon-position" />分享
                      </el-dropdown-item>
                      <el-dropdown-item @click.native="rename_trig(teamDoc.doc_id)">
                        <i class="el-icon-delete" />重命名
                      </el-dropdown-item>
                      <el-dropdown-item
                        @click.native="delete_doc(teamDoc.doc_id)"
                        style="color:red;"
                      >
                        <i class="el-icon-delete" />删除
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
                  <span>{{teamDoc.name}}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 标签二：团队管理 -->
        <el-tab-pane v-if="isLeader" label="团队管理" name="second">
          <div>
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-button
                    round
                    type="primary"
                    plain
                    icon="el-icon-magic-stick"
                    @click="showInvite = true"
                  >邀请成员</el-button>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-button
                    round
                    type="primary"
                    plain
                    icon="el-icon-s-tools"
                    @click="showSettings = true; showTeamates(); getTeamName()"
                  >团队设置</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 隐藏的邀请成员 -->
          <el-dialog class="invite-box" title="邀请成员" :visible.sync="showInvite">
            <el-form ref="formInvite" :model="formInvite">
              <el-form-item prop="name">
                <!-- <span style="float: left;">成员名称</span> -->
                <el-input
                  v-model="formInvite.name"
                  prefix-icon="fa fa-search"
                  placeholder="输入 姓名/邮箱/手机号"
                  autocomplete="off"
                  @change="serchPeople('formInvite')"
                />
              </el-form-item>
            </el-form>
            <!-- 搜索结果展示 -->
            <div>
              <el-row>
                <el-col>
                  <div style="display: flex; align-items: center;">
                    <span style="color: #8a8a8a;">搜索结果</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- 分割线 -->
            <el-divider />
            <!-- 列表展示搜索结果 -->
            <div v-for="(user, index) in userList" :key="index">
              <div style="margin-top: 10px;">
                <el-row style="font-size: 14px; display: flex; align-items: center;">
                  <!-- 头像和用户名 -->
                  <el-col :span="8" style>
                    <div style="display: flex; align-items: center;">
                      <!-- <el-avatar :size="24">头像</el-avatar> -->
                      <span style="margin-left: 15px;">{{ user.username }}</span>
                    </div>
                  </el-col>
                  <!-- 手机号 -->
                  <el-col :span="11" style>
                    <div style="display: flex; align-items: center; ">
                      <span style="color: #8a8a8a;">{{ user.phone_number }}</span>
                    </div>
                  </el-col>
                  <!-- 发送邀请按钮 -->
                  <el-col :span="5">
                    <div style="display: flex; align-items: center;">
                      <el-button
                        type="primary"
                        round
                        plain
                        size="mini"
                        @click="invitePeople(user.username)"
                        :disabled="user.is_join"
                      >{{user.is_join ? "已邀" : "邀请"}}</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showInvite = false">取 消</el-button>
              <el-button type="primary" @click="showInvite = false">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 隐藏的设置成员权限 -->
          <el-dialog title="团队空间设置" :visible.sync="showSettings">
            <!-- 设置团队空间名称 -->
            <el-form :model="formSettings" ref="formSettings">
              <el-form-item prop="name">
                <span style="float: left;">空间名称</span>
                <el-input v-model="formSettings.name" placeholder="请输入" @input="onInput()" autocomplete="off" />
              </el-form-item>
            </el-form>
            <!-- 空间成员展示 -->
            <div>
              <el-row>
                <el-col>
                  <div style="display: flex; align-items: center;">
                    <span style="color: #8a8a8a;">协作者</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- 分割线 -->
            <el-divider />
            <!-- 列表展示团队成员 -->
            <div v-for="(teamate, index) in teamateList" :key="index">
              <div style="margin-top: 10px;">
                <el-row style="font-size: 14px; display: flex; align-items: center;">
                  <!-- 头像和用户名 -->
                  <el-col :span="8" style>
                    <div style="display: flex; align-items: center;">
                      <el-avatar :size="24">头像</el-avatar>
                      <span style="margin-left: 15px;">{{ teamate.username }}</span>
                    </div>
                  </el-col>
                  <!-- 手机号 -->
                  <el-col :span="9" style>
                    <div style="display: flex; align-items: center; ">
                      <span style="color: #8a8a8a;">{{ teamate.phone_number }}</span>
                    </div>
                  </el-col>

                  <!-- 设置权限按钮 -->
                  <el-col :span="5">
                    <div style="display: flex; align-items: center;">
                      <!-- 可以多选权限 -->
                      <el-select
                        @blur="setLevel(teamate.username, valueList[index]);"
                        v-model="valueList[index]"
                        size="mini"
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
                  </el-col>
                  <!-- 删除按钮成员 -->
                  <el-col :span="2" justify="end">
                    <el-button
                      size="small"
                      circle
                      style="border: none;"
                      icon="el-icon-close"
                      @click="deleteTeamate(index)"
                    ></el-button>
                  </el-col>
                </el-row>
              </div>
            </div>

            <!-- 底栏 -->
            <div slot="footer" class="dialog-footer">
              <el-popover placement="top" width="160" v-model="visible">
                <p>确定删除团队吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="visible = false; showSettings = false; deleteTeam();"
                    plain
                  >确定</el-button>
                </div>
                <el-button slot="reference" type="danger" plain style="margin-right: 10px;">删除</el-button>
              </el-popover>
              <el-button @click="showSettings = false">取 消</el-button>
              <el-button
                type="primary"
                @click="showSettings = false; editTeamName('formSettings')"
              >确 定</el-button>
            </div>
          </el-dialog>
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
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      // 判断是否是团队创建者
      isLeader: true,
      // 团队权限
      level: '',
      // “确认删除”显示
      visible: false,
      // “确认删除成员”显示
      visible1: false,
      activeName: "first",
      showInvite: false,
      showSettings: false,
      // 团队名称列表
      teamNameList: [],
      // 搜索表单
      formInvite: {
        name: "",
      },
      teamDocs: [],
      renameVisible: false,
      renamed_doc_id: 0,
      docForm: {
        new_name: "",
      },
      user: {},
      userList: [
      ],
      userNum: "0",
      // 团队成员列表
      teamateList: [
      ],
      teamateNum: "0",
      // 空间名称表单
      formSettings: {},
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
      // 权限列表
      valueList: ["1", "2", "3", "4"],
    };
  },
  created: function () {
    this.getIsLeader();
    this.getDocsInfo();
    this.getTeamName();
  },
  watch: {
    $route: function (to, from) {
      this.teamDocs = [];
      this.getDocsInfo();
    },
  },
  methods: {
    onInput(){
     this.$forceUpdate();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取这个团队的文档信息
    getDocsInfo() {
      console.log(this.$route.params.team_id);
      var data = Qs.stringify({
        team_id: this.$route.params.team_id,
      });
      axios
        .post("http://localhost:8000/ajax/get_team_docs/", data)
        .then((res) => {
          const team_docs_length = res.data.team_docs.length;
          for (let index = 0; index < team_docs_length; index++) {
            this.teamDocs.push({
              doc_id: res.data.team_docs[team_docs_length - index - 1].doc_id,
              name: res.data.team_docs[team_docs_length - index - 1].name,
            });
          }
        });
      console.log(this.teamDocs);
    },
    toDoc(doc_id, in_new_page) {
      // 1级权限时不能打开
      if (this.level <= 1) {
        this.$message({
          showClose: true,
          message: "您没有查看文档的权限",
          type: "error",
        });
      } else {
        var data = Qs.stringify({
          doc_id: doc_id,
        });
        axios.post("http://localhost:8000/ajax/update_browsing/", data);
        if (in_new_page) {
          var routeData = this.$router.resolve({
            name: "editor",
            params: {
              doc_id: doc_id,
              team_id: this.$route.params.team_id,
              level: this.level,
            },
          });
          // console.log(routeData.href)
          window.open(routeData.href, "_blank");
        } else {
          this.$router.push(
            "/editor/" +
              doc_id +
              "/" +
              this.$route.params.team_id +
              "/" +
              this.level
          );
        }
      }
    },
    // 获取是否是团队Leader & 权限
    getIsLeader() {
      var data = Qs.stringify({
        team_id: this.$route.params.team_id,
      });
      console.log(data);
      axios.post("http://localhost:8000/ajax/is_leader/", data).then((res) => {
        this.isLeader = res.data.is_leader;
        this.level = res.data.level;
      });
    },
    // 搜索方法
    serchPeople(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = Qs.stringify({
            name: this.formInvite.name,
            team_id: this.$route.params.team_id,
          });
          axios
            .post("http://localhost:8000/ajax/search_user/", data)
            .then((res) => {
              this.userList = res.data.user_list;
              this.userNum = this.userList.length;
            });
        } else {
          alert("表格不能为空");
        }
      });
    },
    // 邀请新成员方法
    invitePeople(username) {
      var data = Qs.stringify({
        username: username,
        team_id: this.$route.params.team_id,
      });
      console.log(data);
      axios
        .post("http://localhost:8000/ajax/invite_user/", data)
        .then((res) => {
          this.$message({
            showClose: true,
            message: "已成功发送邀请",
            type: "success",
          });
        });
    },
    getTeamList() {
      axios.post("http://localhost:8000/ajax/get_my_team/").then((res) => {
        this.teamList = res.data.team_list;
      });
    },
    // 删除团队方法
    deleteTeam() {
      var data = Qs.stringify({
        team_id: this.$route.params.team_id,
      });
      console.log(data);
      axios
        .post("http://localhost:8000/ajax/delete_my_team/", data)
        .then((res) => {});
      this.$router.push("/home");
      // // 强制刷新
      this.$router.go(0);
    },
    // 获取团队成员列表
    showTeamates() {
      var data = Qs.stringify({
        team_id: this.$route.params.team_id,
      });
      // console.log(data);
      axios
        .post("http://localhost:8000/ajax/get_team_member/", data)
        .then((res) => {
          this.teamateList = res.data.user_list;
          this.teamateNum = this.teamateList.length;
          // 获取权限列表
          this.valueList = [];
          for (var i = 0; i < this.teamateList.length; i++) {
            this.valueList.push(this.teamateList[i].level);
          }
          // console.log(this.valueList);
        });
    },
    // 设置团队成员权限
    setLevel(name, toLevel) {
      var data = Qs.stringify({
        username: name,
        team_id: this.$route.params.team_id,
        level: toLevel,
      });
      console.log(data);
      axios.post("http://localhost:8000/ajax/set_level/", data).then((res) => {
        this.$message({
          showClose: true,
          message: "已设置权限",
          type: "success",
        });
      });
    },
    // 删除团队成员方法
    deleteTeamate(index) {
      var data = Qs.stringify({
        team_id: this.$route.params.team_id,
        username: this.teamateList[index].username,
      });
      console.log(data);
      axios
        .post("http://localhost:8000/ajax/delete_team_member/", data)
        .then((res) => {this.showTeamates()});
      // 强制刷新
      // this.$router.go(0);
    },
    // 成员退出团队
    exitTeam() {
      var data = Qs.stringify({
        team_id: this.$route.params.team_id,
      });
      console.log(data);
      axios
        .post("http://localhost:8000/ajax/exit_team/", data)
        .then((res) => {});
    },
    // 获取团队名称
    getTeamName() {
      var data = Qs.stringify({
        team_id: this.$route.params.team_id,
      });
      console.log(data);
      axios
        .post("http://localhost:8000/ajax/get_team_name/", data)
        .then((res) => {
          this.formSettings.name = res.data.team_name;
        });
    },
    // 修改团队名称
    editTeamName(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = Qs.stringify({
            name: this.formSettings.name,
            team_id: this.$route.params.team_id,
          });
          axios
            .post("http://localhost:8000/ajax/edit_team_name/", data)
            .then((res) => {
              this.getTeamList();
              this.$router.go(0);
            });
        } else {
          alert("表格不能为空");
        }
      });
    },
    delete_doc(doc_id) {
      if (this.level < 4) {
        this.$message({
          showClose: true,
          message: "您没有删除文档的权限",
          type: "error",
        });
      } else {
        var data = Qs.stringify({
          doc_id: doc_id,
        });
        axios
          .post("http://localhost:8000/ajax/delete_doc/", data)
          .then((res) => {
            const flag = res.data.flag;
            if (flag == "yes") {
              // 在文档列表中删除该文档
              var index = this.teamDocs.findIndex(
                (doc) => doc.doc_id === doc_id
              );
              this.teamDocs.splice(index, 1);
              this.$message({
                showClose: true,
                message: "已删除",
                type: "success",
              });
            } else {
              this.$message({
                showClose: true,
                message: "出错了，请重试",
                type: "error",
              });
            }
          });
      }
    },
    rename_trig(doc_id) {
      if (this.level < 4) {
        this.$message({
          showClose: true,
          message: "您没有重命名文档的权限",
          type: "error",
        });
      } else {
        this.renameVisible = true;
        this.renamed_doc_id = doc_id;
        var doc = this.teamDocs.find(
          (doc) => doc.doc_id === this.renamed_doc_id
        );
        this.docForm.new_name = doc.name;
      }
    },
    rename_doc() {
      var doc = this.teamDocs.find((doc) => doc.doc_id === this.renamed_doc_id);
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
// 卡片内容样式
.card-container {
  align-items: center;
  display: flex;
}
.inline-div {
  display: inline-block;
  vertical-align: middle;
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
.el-icon-arrow-down {
  font-size: 12px;
}
// 新卡片样式

.bottom {
  // margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 70%;
  height: auto;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
