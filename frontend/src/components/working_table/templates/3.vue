<template>
    <div>
        <!-- <el-row>
            <el-col style="float:center;"><div><h2>个人简历模板</h2></div></el-col>
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
        </div> -->

        <div>
            <!-- 个人简历模板 -->
            <div class="total" style="text-align:center;">
                <div class="biaoti" style="border-width:0 0 5px 0;border-style:solid;border-color:#6eaad7;">
                    <h2 style="color:#6eaad7">个人简历</h2>
                </div>
                <div class="biaoti2">
                    <div class="class1">
                        <h1>求职意向</h1>
                    </div>
                    <div class="content1">
                        <h5 style="text-align:left;">意向岗位：</h5>
                        <h5 style="text-align:left;">期望薪酬：</h5>
                        <h5 style="text-align:left;">意向城市：</h5>
                        <h5 style="text-align:left;">目前状态：</h5>
                    </div>
                </div>
                <div class="biaoti2">
                    <div class="class1">
                        <h1>求职意向</h1>
                    </div>
                    <div>
                        <ol>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                        </ol>
                    </div>
                </div>
                <div class="biaoti2">
                    <div class="class1">
                        <h1>工作经历</h1>
                    </div>
                    <div>
                        <ol>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                        </ol>
                    </div>
                </div>
                <div class="biaoti2">
                    <div class="class1">
                        <h1>自我评价</h1>
                    </div>
                    <div>
                        <ol>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                        </ol>
                    </div>
                </div>
                <div class="biaoti2">
                    <div class="class1">
                        <h1>专业技能</h1>
                    </div>
                    <div>
                        <ol>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                        </ol>
                    </div>
                </div>
            </div>

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
.class1{
    color:#6eaad7;
    text-align:left;
    border-width:0 0 3px 0;
    border-style:solid;
    border-color:#6eaad7;
    width: 700px;
    /* background-color: blue; */
}
.biaoti2{
    width: 700px;
    margin: 0 auto;
}
</style>