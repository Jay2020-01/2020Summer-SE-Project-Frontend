<template>
    <div>
        <el-row>
            <el-col style="float:center;"><div><h2>备考计划模板</h2></div></el-col>
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

        <!-- 备考计划模板 -->
    <div id="title">
        <el-row class="table1">
            <el-col><div>单科复习进度</div></el-col>
        </el-row>
        <el-row class="table2">
            <el-col><div style="text-align : left;">备考科目1：</div></el-col>
        </el-row>
        <el-row class="table3">
            <el-col style="width:156px;border:1px solid #6eaad7;"><div>日期</div></el-col>
            <el-col style="width:156px;border:1px solid #6eaad7;"><div>备考章节</div></el-col>
            <el-col style="width:156px;border:1px solid #6eaad7;"><div>今日复习任务</div></el-col>
            <el-col style="width:156px;border:1px solid #6eaad7;"><div>今日完成情况</div></el-col>
            <el-col style="width:156px;border:1px solid #6eaad7"><div>备注</div></el-col>
        </el-row>
        <el-row class="table4">
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
        </el-row>
        <el-row class="table4">
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
        </el-row>
        <el-row class="table4">
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
        </el-row>
        <el-row class="table2">
            <el-col><div style="text-align : left;">备考科目2：</div></el-col>
        </el-row>
        <el-row class="table3">
            <el-col style="width:156px;border:1px solid #6eaad7;"><div>日期</div></el-col>
            <el-col style="width:156px;border:1px solid #6eaad7;"><div>备考章节</div></el-col>
            <el-col style="width:156px;border:1px solid #6eaad7;"><div>今日复习任务</div></el-col>
            <el-col style="width:156px;border:1px solid #6eaad7;"><div>今日完成情况</div></el-col>
            <el-col style="width:156px;border:1px solid #6eaad7"><div>备注</div></el-col>
        </el-row>
        <el-row class="table4">
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
        </el-row>
        <el-row class="table4">
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
        </el-row>
        <el-row class="table4">
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
        </el-row>
        <el-row class="table2">
            <el-col><div style="text-align : left;">备考科目3：</div></el-col>
        </el-row>
        <el-row class="table3">
            <el-col style="width:156px;border:1px solid #6eaad7;"><div>日期</div></el-col>
            <el-col style="width:156px;border:1px solid #6eaad7;"><div>备考章节</div></el-col>
            <el-col style="width:156px;border:1px solid #6eaad7;"><div>今日复习任务</div></el-col>
            <el-col style="width:156px;border:1px solid #6eaad7;"><div>今日完成情况</div></el-col>
            <el-col style="width:156px;border:1px solid #6eaad7"><div>备注</div></el-col>
        </el-row>
        <el-row class="table4">
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
        </el-row>
        <el-row class="table4">
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
        </el-row>
        <el-row class="table4">
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
        </el-row>
        <el-row class="table2">
            <el-col><div style="text-align : left;">备考科目4：</div></el-col>
        </el-row>
        <el-row class="table3">
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>日期</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>备考章节</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>今日复习任务</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>今日完成情况</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7"><div>备注</div></el-col>
        </el-row>
        <el-row class="table4">
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
        </el-row>
        <el-row class="table4">
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
        </el-row>
        <el-row align="middle" class="table4">
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
            <el-col style="min-height:1px;width:156px;border:1px solid #6eaad7;"><div>：</div></el-col>
        </el-row>
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
.table1{
    background-color:#6eaad7;
    width:780px;
    margin: 0 auto;
}
.table2{
    background-color:#cce0f1;
    width:780px;
    margin: 0 auto;
    /* border:1px solid #6eaad7; */
}
.table3{
    width:780px;
    margin: 0 auto;
    background-color: #cce0f1;
}
.table4{
    margin: 0 auto;
    width: 782px;
    /* border: 1px solid black; */
}
#title{
    width:780px;
    margin: 0 auto;
    border: 1px solid #cce0f1;
}
</style>