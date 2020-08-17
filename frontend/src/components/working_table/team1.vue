<template>
  <div>
    <div class="tabs_container">
      <!-- 标签组件 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 标签内容 -->
        <!-- 标签一：团队文档 -->
        <el-tab-pane label="团队名称1" name="first">
          <div style="text-align:right">
            <el-dropdown placement="bottom">
              <!-- 团队的一些操作 -->
              <span class="el-dropdown-link">
                <i class="el-icon-setting el-icon--right" />
                <!-- 下拉图标 -->
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- 选项 -->
                <el-dropdown-item>
                  <i class="el-icon-magic-stick" />协作
                </el-dropdown-item>
                <el-dropdown-item style="border-bottom:1px solid #e5e5e5">
                  <i class="el-icon-s-tools" />设置
                </el-dropdown-item>
                <el-dropdown-item style="color:red">
                  <i class="el-icon-delete" />删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <!-- 测试新卡片 -->
          <el-row>
            <el-col v-for="o in 8" :key="o" style="width:200px">
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
                        <i class="el-icon-magic-stick" />新标签页打开
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <i class="el-icon-collection-tag" />收藏
                      </el-dropdown-item>
                      <el-dropdown-item style="border-bottom:1px solid #e5e5e5">
                        <i class="el-icon-position" />分享
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <i class="el-icon-delete" />重命名
                      </el-dropdown-item>
                      <el-dropdown-item style="color:red;">
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
                  <span>钻石文档</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 标签二：团队管理 -->
        <el-tab-pane label="团队管理" name="second">
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
                    @click="showSettings = true; showTeamates();"
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
                      <el-avatar :size="24">头像</el-avatar>
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
            <el-form :model="formSettings">
              <el-form-item>
                <span style="float: left;">空间名称</span>
                <el-input v-model="formSettings.name" placeholder="请输入" autocomplete="off" />
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
                  <el-col :span="11" style>
                    <div style="display: flex; align-items: center; ">
                      <span style="color: #8a8a8a;">{{ teamate.phone_number }}</span>
                    </div>
                  </el-col>
                  <!-- 设置权限按钮 -->
                  <el-col :span="5">
                    <div style="display: flex; align-items: center;">
                      <!-- 可以多选权限 -->
                      <el-select @blur="setLevel(teamate.username, valueList[index]);" v-model="valueList[index]" size="mini" placeholder="权限选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
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
                    @click="visible = false; deleteTeam();"
                    plain
                  >确定</el-button>
                </div>
                <el-button slot="reference" type="danger" plain style="margin-right: 10px;">删除</el-button>
              </el-popover>
              <el-button @click="showSettings = false">取 消</el-button>
              <el-button type="primary" @click="showSettings = false">确 定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      // “确认删除”显示
      visible: false,
      activeName: "first",
      showInvite: false,
      showSettings: false,
      // 团队名称列表
      teamNameList: [],
      // 搜索表单
      formInvite: {
        name: "",
      },
      user: {},
      userList: [
        { id: '001', username: 'name1', phone_number: '123456', is_join: true },
        { id: '002', username: 'name2', phone_number: '123456', is_join: false }
      ],
      userNum: "0",
      // 团队成员列表
      teamateList: [
        { id: '001', username: 'n1', phone_number: '123456', level: '1' },
        { id: '002', username: 'n2', phone_number: '123456', level: '2' },
        { id: '003', username: 'n3', phone_number: '123456', level: '3' },
        { id: '004', username: 'n4', phone_number: '123456', level: '4' },
      ],
      teamateNum: "0",
      // 空间名称表单
      formSettings: {
        name: "团队名称1",
      },
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
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 搜索方法
    serchPeople(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = Qs.stringify({
            name: this.formInvite.name,
            team_id: this.$route.params.team_id,});
          axios.post("http://localhost:8000/ajax/search_user/", data).then((res) => {
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
      axios.post("http://localhost:8000/ajax/invite_user/", data).then((res) => {});
    },
    // 删除团队方法
    deleteTeam() {
      var data = Qs.stringify({
        team_id: this.$route.params.team_id,
      });
      console.log(data);
      axios.post("http://localhost:8000/ajax/delete_my_team/", data).then((res) => {});
      this.$router.push('/home');
      // 强制刷新
      this.$router.go(0);
    },
    // 获取团队成员列表
    showTeamates() {
      var data = Qs.stringify({
        team_id: this.$route.params.team_id,
      });
      // console.log(data);
      axios.post("http://localhost:8000/ajax/get_team_member/", data).then((res) => {
        this.teamateList = res.data.user_list;
        this.teamateNum = this.teamateList.length;
        // 获取权限列表
        this.valueList = [];
        for(var i = 0; i < this.teamateList.length; i++){
          this.valueList.push(this.teamateList[i].level);
        }
        // console.log(this.valueList);
      });
    },
    // 设置团队成员权限
    setLevel(name, toLevel){
      var data = Qs.stringify({
        username: name,
        team_id: this.$route.params.team_id,
        level: toLevel,
      });
      console.log(data);
      axios.post("http://localhost:8000/ajax/set_level/", data).then((res) => {

      });
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
  // margin: 0px 20px 0px 20px;//左侧的边距
  width: 100px;
  height: auto;
  margin: 20px;
}
.el-card .card-pic {
  visibility: hidden;
}
.el-card:hover {
  cursor: pointer;
  border: 1px solid #42b983;
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
