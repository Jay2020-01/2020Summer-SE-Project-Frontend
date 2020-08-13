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
                <i class="el-icon-setting el-icon--right"></i>
                <!-- 下拉图标 -->
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- 选项 -->
                <el-dropdown-item>
                  <i class="el-icon-magic-stick"></i>协作
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="el-icon-s-tools"></i>设置
                </el-dropdown-item>
                <el-divider></el-divider>
                <el-dropdown-item style="color:red">
                  <i class="el-icon-delete"></i>删除
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
                        <i class="el-icon-setting el-icon--right"></i>
                        <!-- 下拉图标 -->
                      </span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <!-- 选项 -->
                      <el-dropdown-item>
                        <i class="el-icon-magic-stick"></i>新标签页打开
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <i class="el-icon-delete"></i>删除
                      </el-dropdown-item>
                      <el-dropdown-item>其他操作请补充</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <!-- <center>
              图标
                <div class="picture inline-div">
                  <span class="fa fa-file-text-o" style="font-size:50px"></span>
                </div>
                </center>-->
                <i class="el-icon-document" style="font-size:50px"></i>

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
                  <el-button round type="primary" @click="showInvite = true" plain icon="el-icon-magic-stick">邀请成员</el-button>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-button round type="primary" @click="showSettings = true" plain icon="el-icon-s-tools">团队设置</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
            <!-- 隐藏的邀请成员 -->
            <el-dialog class="invite-box" title="邀请成员" :visible.sync="showInvite">
              <el-form :model="formInvite">
                <el-form-item>
                  <!-- <span style="float: left;">成员名称</span> -->
                  <el-input v-model="formInvite.name" prefix-icon="fa fa-search" placeholder="输入 姓名/邮箱/手机号" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="showInvite = false">取 消</el-button>
                <el-button type="primary" @click="showInvite = false">确 定</el-button>
              </div>
            </el-dialog>
            <!-- 隐藏的设置成员权限 -->
            <el-dialog title="邀请成员" :visible.sync="showSettings">
              <el-form :model="formSettings">
                <el-form-item>
                  <span style="float: left;">成员名称</span>
                  <el-input v-model="formSettings.name" placeholder="请输入" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
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
export default {
  data() {
    return {
      activeName: "first",
      showInvite: false,
      showSettings: false,
      formInvite: {
        name: "",
      },
      formSettings: {
        name: "",
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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