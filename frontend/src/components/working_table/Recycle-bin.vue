<template>
  <div class="tabs_container">
    <!-- 标签组件 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 标签内容 -->
      <el-tab-pane label="回收站" name="first">
        <!-- 清空回收站是否确认的显示 -->
        <h6>这里是为了显示清空回收站按钮选择的哪一个，并方便以绑定事件,之后请删除</h6>
        <h5>点击了"{{qingkong}}"</h5>
        <!-- 清空回收站图标与弹出框 -->

        <div style="text-align:right">
        <el-button type="danger" title="清空回收站" @click="open" ><i class="el-icon-delete"></i></el-button>
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
        over -->

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
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      qingkong: "还没点",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    confirm() {
      this.qingkong = "确定";
    },
    // open
    open() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.qingkong="清空回收站";
          // 这里就是以后绑定事件写代码的地方
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
  height: auto;
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
.el-popconfirm{
  background-color: blue;
}
.ceshi2{
  background-color: blue;
  border-width: 2px;
  border-color: blue;
}
</style>