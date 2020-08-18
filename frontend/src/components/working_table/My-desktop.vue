<template>
  <div class="tabs_container">
    <!-- 标签组件 -->
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <!-- 标签内容 -->
      <el-tab-pane
        label="我的桌面"
        name="first"
      >
        <!-- 下面这个是选择“平铺”还是“列表”的两个按钮 -->
        <div style="text-align:right">
          <i
            class="el-icon-menu"
            value="平铺"
            @click="topingpu"
          />
          <i
            class="el-icon-s-operation"
            value="列表"
            @click="toliebiao"
          />
        </div>

        <!-- 如果是平铺就是下面这些 -->
        <!-- 测试新卡片 -->
        <el-row v-if="pingpu">
          <el-col
            v-for="o in 8"
            :key="o"
            :span="5"
            style="width:200px"
          >
            <!-- span是说col标签能够影响的列数 -->
            <el-card
              :body-style="{ padding: '0px' }"
              shadow="hover"
            >
              <div
                class="bottom clearfix"
                style="text-align:right"
              >
                <el-dropdown placement="bottom">
                  <!-- 操作图标 -->
                  <div class="card-pic">
                    <span class="el-dropdown-link">
                      <i class="el-icon-setting el-icon--right" />

                      <!-- 下拉图标 -->
                    </span>
                  </div>
                  <el-dropdown-menu
                    slot="dropdown"
                    placement="bottom"
                  >
                    <!-- 选项 -->
                    <el-dropdown-item style="border-bottom:1px solid #e5e5e5"><i class="el-icon-magic-stick"></i>新标签页打开</el-dropdown-item>
                    <el-dropdown-item><i class="el-icon-collection-tag"></i>收藏</el-dropdown-item>
                    <el-dropdown-item style="border-bottom:1px solid #e5e5e5"><i class="el-icon-position"></i>分享</el-dropdown-item>
                    <el-dropdown-item><i class="el-icon-delete"></i>重命名</el-dropdown-item>
                    <el-dropdown-item style="color:red;"><i class="el-icon-delete"></i>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <!-- <center>
              图标
                <div class="picture inline-div">
                  <span class="fa fa-file-text-o" style="font-size:50px"></span>
                </div>
              </center>-->
              <i
                class="el-icon-document"
                style="font-size:50px"
              />

              <div class="tile" style="padding: 14px;">
                <span>一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</span>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 如果是选择列表就展示下面这些 -->
        <el-table
          v-if="liebiao"
          :data="tableData"
          height="520"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="文件名"
            width="900"
          />
          <el-table-column
            prop="author"
            label="创建者"
            width="180"
          />
          <el-table-column
            prop="lasttime"
            label="更新时间"
          />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      pingpu: true,
      liebiao: false,
      tableData: [
        {
          name: '一分钟，了解金刚石文档',
          author: '921049836',
          lasttime: '今天23：29'
        },
        {
          name: '一分钟，了解金刚石文档',
          author: '921049836',
          lasttime: '今天23：29'
        },
        {
          name: '一分钟，了解金刚石文档',
          author: '921049836',
          lasttime: '今天23：29'
        },
        {
          name: '一分钟，了解金刚石文档',
          author: '921049836',
          lasttime: '今天23：29'
        },
        {
          name: '一分钟，了解金刚石文档',
          author: '921049836',
          lasttime: '今天23：29'
        },
        {
          name: '一分钟，了解金刚石文档',
          author: '921049836',
          lasttime: '今天23：29'
        },
        {
          name: '一分钟，了解金刚石文档',
          author: '921049836',
          lasttime: '今天23：29'
        }
      ]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    topingpu: function () {
      this.pingpu = true
      this.liebiao = false
    },
    toliebiao: function () {
      this.pingpu = false
      this.liebiao = true
    }
  }
}
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
  height: 150px;
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
.el-icon-menu {
  cursor: pointer;
}
.el-icon-menu:hover {
  transform: scale(1.3);
}
.el-icon-s-operation {
  cursor: pointer;
}
.el-icon-s-operation:hover {
  transform: scale(1.3);
}
// 控制文档名称显示两行
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
