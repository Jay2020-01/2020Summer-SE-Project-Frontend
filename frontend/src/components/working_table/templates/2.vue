<template>
    <div>
        <!-- <el-row>
            <el-col style="float:center;"><div><h2>读书笔记模板</h2></div></el-col>
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
            <!-- 读书笔记模板 -->
            <div class="total">
                <div class="beijing">
                    <div style="text-align:left;">
                        <div style="margin-left:40px;">
                            <h1>书籍背景</h1>
                            <h5>书名:</h5>
                            <h5>作者:</h5>
                            <h6>出版社:</h6>
                            <h6>阅读日期:</h6>
                        </div>
                    </div>
                </div>
                <div class="zhaichao">
                    <div class="title1">
                        <h1>好句摘抄</h1>
                    </div>
                    <div class="content1">
                        <ol>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph last"><h3></h3></li>
                        </ol> 
                    </div>
                </div>
                <div class="pizhu">
                    <div class="title1">
                        <h1>批注感悟</h1>
                    </div>
                    <div class="content1">
                        <ol>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                        </ol> 
                    </div>
                </div>
                <div class="zongjie">
                    <div class="title1">
                        <h1>读书总结</h1>
                    </div>
                    <div class="content1">
                        <ol>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
                            <li class="paragraph"><h3></h3></li>
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
.total{
    width:780px;
    margin: 0 auto;
    background-color: #ebf4fc;
    border: 1px solid #cce0f1;
}
.beijing{
    background-color: #6eaad7;
}
.title1{
    background-color: #cce0f1;
}
</style>