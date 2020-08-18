<template>
    <div class="w">
    <!-- 排版 -->
    <h1>选择你的模板</h1>
    <el-row :gutter="40">
        <!-- 上面这个gutter是改变模板卡片之间的间隔 -->
        <el-col style="width:200px">
            <el-card :body-style="{ padding: '0px' } " shadow="hover">
                <!-- <img src="../../assets/templates_photos/v1.png" class="image" style="width:200px;height:120px;"> -->
                <el-image
                    style="width:200px;height:120px;"
                    :src="require('../../assets/templates_photos/v1.png')"
                    :preview-src-list="srclist"
                ></el-image>
                <div style="padding: 14px;">
                    <span>备考计划模板</span>
                    <div class="bottom clearfix">
                        <el-button type="text" class="button" @click="template1">看看这个</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col style="width:200px">
            <el-card :body-style="{ padding: '0px' }">
                <!-- <img src="../../assets/templates_photos/v2.png" class="image" style="width:200px;height:120px;"> -->
                <el-image
                    style="width:200px;height:120px;"
                    :src="require('../../assets/templates_photos/v2.png')"
                    :preview-src-list="srclist"
                ></el-image>
                <div style="padding: 14px;">
                    <span>读书笔记模板</span>
                    <div class="bottom clearfix">
                        <el-button type="text" class="button" @click="template2">看看这个</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col style="width:200px">
            <el-card :body-style="{ padding: '0px' }">
                    <!-- <img src="../../assets/templates_photos/v3.png" class="image" style="width:200px;height:120px;"> -->
                    <el-image
                    style="width:200px;height:120px;"
                    :src="require('../../assets/templates_photos/v3.png')"
                    :preview-src-list="srclist"
                ></el-image>
                    <div style="padding: 14px;">
                    <span>个人简历模板</span>
                    <div class="bottom clearfix">
                        <el-button type="text" class="button" @click="template3">操作按钮</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col style="width:200px">
            <el-card :body-style="{ padding: '0px' }">
                    <!-- <img src="../../assets/templates_photos/v4.png" class="image" style="width:200px;height:120px;"> -->
                    <el-image
                    style="width:200px;height:120px;"
                    :src="require('../../assets/templates_photos/v4.png')"
                    :preview-src-list="srclist"
                ></el-image>
                    <div style="padding: 14px;">
                    <span>梦想计划清单</span>
                    <div class="bottom clearfix">
                        <el-button type="text" class="button" @click="template4">操作按钮</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                srclist:[
                    require('../../assets/templates_photos/v1.png'),
                    require('../../assets/templates_photos/v2.png'),
                    require('../../assets/templates_photos/v3.png'),
                    require('../../assets/templates_photos/v4.png'),
                ]
            }
        },
        methods:{
            template1(){
                window.sessionStorage.clear()
                this.$router.push('/template1')
            },
            template2(){
                window.sessionStorage.clear()
                this.$router.push('/template2')
            },
            template3(){
                window.sessionStorage.clear()
                this.$router.push('/template3')
            },
            template4(){
                window.sessionStorage.clear()
                this.$router.push('/template4')
            },

        },
    }
</script>
<style>
/* 布局测试 */
.ceshi{
    background: #99a9bf;
    border-color: black;
}
.el-card:hover {
  cursor: pointer;
  border: 1px solid #409eff;
}
</style>