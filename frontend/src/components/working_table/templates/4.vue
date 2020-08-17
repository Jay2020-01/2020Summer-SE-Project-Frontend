<template>
    <div>
        <el-row>
            <el-col style="float:center;"><div><h2>梦想计划清单</h2></div></el-col>
            <el-col style="float:center;position:relative;left:290px;">
                <div>
                    <el-button @click="back">返回</el-button>
                    <el-button>就用这个了</el-button>
                </div>
            </el-col>
        </el-row>
        <div style="float:center;position:relative;left:-270px;">
            <h4 style="display:inline-block;">模板亮点:</h4>
            <h6 style="display:inline-block;">比较好用,使用之后能够明显提高成绩</h6>
        </div>

        <!-- 梦想计划清单 -->
        <div id="title">
        <el-container style="background-color:#ebf4fc;">
            <el-header style="border-width:0 0 5px 0;border-style:solid;border-color:#6eaad7;">
                <h2 style="color:#6eaad7">梦想计划清单</h2>
            </el-header>
            <el-main>
                <el-container>
                    <el-header>
                        <h3 style="color:#6eaad7;text-align:left;border-width:0 0 3px 0;border-style:solid;border-color:#6eaad7;">2021年</h3>
                    </el-header>
                    <el-main style="height:200px;">
                        <h5 style="color:#6eaad7;text-align:left;">年度计划：</h5>
                    </el-main>
                </el-container>
                <el-container>
                    <el-header>
                        <h3 style="color:#6eaad7;text-align:left;border-width:0 0 3px 0;border-style:solid;border-color:#6eaad7;">2023年</h3>
                    </el-header>
                    <el-main style="height:200px;">
                        <h5 style="color:#6eaad7;text-align:left;">三年计划：</h5>
                    </el-main>
                </el-container>
                <el-container>
                    <el-header>
                        <h3 style="color:#6eaad7;text-align:left;border-width:0 0 3px 0;border-style:solid;border-color:#6eaad7;">2025年</h3>
                    </el-header>
                    <el-main style="height:200px;">
                        <h5 style="color:#6eaad7;text-align:left;">五年计划：</h5>
                    </el-main>
                </el-container>
            </el-main>
        </el-container>
        </div>
    </div>
</template>
<script>
    export default {
        methods:{
            back(){
                window.sessionStorage.clear()
                this.$router.push('/templates')
            }
        }
    }
</script>
<style>
.paragraph {
    border-bottom: 1px solid #929292;
    list-style: none;
    height: 28px;
    line-height: 28px;
     margin: 0 0 0 -20px;
}
.last {
    margin-bottom: 30px;
 }
#title{
    width:780px;
    margin: 0 auto;
    border: 1px solid #cce0f1;
}
</style>