<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header
      height="60px"
      direction="horizontal"
    >
      <el-row
        type="flex"
        class="row-bg"
      >
        <el-col
          :span="6"
          :offset="0"
        >
          <div class="grid-content head-box1 bg-purple">
            <!-- 头像区域 -->
            <el-avatar
              icon="fa fa-diamond"
              style="color: #409eff; background-color: #fff !important; cursor:pointer;"
              :size="40"
              @click.native="backtoHome"
            >
              logo
            </el-avatar>
            <span class="site-name">钻石文档</span>
          </div>
        </el-col>
        <el-col
          :span="5"
          :offset="7"
        >
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
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-bell" style="height:60px;font-size:25px;"></i>
              </span>
              <!-- 通知图标下面的下拉栏 -->
              <el-dropdown-menu slot="dropdown">
                <!-- 这里好像要用嵌套路由来写下面的内容 -->
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                  <el-menu-item>全部消息</el-menu-item>
                  <el-menu-item>未读消息</el-menu-item>
                  <el-menu-item><el-button>全部标为已读</el-button></el-menu-item>
                </el-menu>
              </el-dropdown-menu>
            </el-dropdown>

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
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区域  default-active="1"没写-->
        <el-menu
          background-color="#fff"
          text-color="#535353"
          active-text-color="#409eff"
          default-active="1"
          router
        >
          <!-- 新建按钮 -->
          <!-- old-code -->
          <!-- <el-menu-item class="ceshi">
              <el-button size="midium" @click="newFile" type="primary" plain>新建文档</el-button>
          </el-menu-item>-->
          <div class="new-doc">
            <el-button
              size="midium"
              type="primary"
              plain
              @click="newFile"
            >
              新建文档
            </el-button>
          </div>
          <!-- 不分级菜单 -->
          <el-menu-item index="1">
            <i
              class="fa fa-archive"
              style="padding: 0 10px 0 10px"
            />
            <span slot="title">工作台</span>
          </el-menu-item>
          <!-- 不分级菜单 -->
          <el-menu-item index="2">
            <i
              class="fa fa-envelope-o"
              style="padding: 0 10px 0 10px"
            />
            <span slot="title">收件箱</span>
          </el-menu-item>
          <!-- 分割线 -->
          <div style="margin: 8px 20px; height: 1.5px; background-color: rgb(230, 230, 230);" />
          <!-- 不分级菜单 -->
          <el-menu-item index="3">
            <i
              class="fa fa-desktop"
              style="padding: 0 10px 0 10px"
            />
            <span slot="title">我的桌面</span>
          </el-menu-item>

          <!-- 一级菜单 -->
          <el-submenu index="4">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i
                class="fa fa-cube"
                style="padding: 0 10px 0 10px"
              />
              <!-- 文本 -->
              <span>团队空间</span>
              <!-- 新增团队按钮 -->
              <span>
                <i
                  class="add-team fa fa-plus-circle"
                  @click.stop="dialogFormVisible = true"
                />
              </span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              class="second-menu"
              index="4-1"
            >
              <template slot="title">
                <!-- 图标 -->
                <!-- <i class="el-icon-location"></i> -->
                <!-- 文本 -->
                <span>团队名称1</span>
              </template>
            </el-menu-item>
            <el-menu-item
              class="second-menu"
              index="4-2"
            >
              <template slot="title">
                <!-- 图标 -->
                <!-- <i class="el-icon-location"></i> -->
                <!-- 文本 -->
                <span>团队名称2</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <!-- 不分级菜单 -->
          <el-menu-item index="5">
            <i
              class="fa fa-trash-o"
              style="padding: 0 12px 0 11px"
            />
            <span slot="title">回收站</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 隐藏的新建团队表单 -->
        <el-dialog
          title="新建团队空间"
          :visible.sync="dialogFormVisible"
        >
          <el-form
            ref="teamForm"
            :model="teamForm"
          >
            <el-form-item prop="name">
              <span style="float: left;">空间名称</span>
              <el-input
                v-model="teamForm.name"
                placeholder="请输入"
                autocomplete="off"
              />
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogFormVisible = false">
              取 消
            </el-button>
            <el-button
              type="primary"
              @click="dialogFormVisible = false; createTeam('teamForm') "
            >
              确 定
            </el-button>
          </div>
        </el-dialog>
        <!-- 路由占位符 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
export default {
  data () {
    return {
      input: '',
      dialogFormVisible: false,
      teamForm: {
        name: ''
      },
      formLabelWidth: '120px',
      //改：根据登陆人员的的信息改(可能是表单形式)
      username: '檠莲焰',
      mail_address: '921049836@qq.com',
    }
  },
  methods: {
    createTeam (formName) {
      // 验证表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = Qs.stringify(this.teamForm) // 先用Qs对数据进行处理
          axios.post('ajax/create_team/', data).then().catch(err => console.log(err))
        } else {
          alert('表格不能为空')
        }
      })
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    changeInfo () {
      window.sessionStorage.clear()
      this.$router.push('/myinfo')
    },
    newFile () {
      window.sessionStorage.clear()
      this.$router.push('/editor')
    },
    backtoHome () {
      window.sessionStorage.clear()
      this.$router.push('/home')
    }
  }
}
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
.add-team:hover{
  transform: scale(1.4);
}
.new-doc{
  width:199px;
  height:56px;
  line-height: 56px;
  // background-color: blue;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
