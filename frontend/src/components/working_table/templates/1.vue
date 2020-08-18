<template>
    <div>
        <div>
            <!-- 健身管理模板 -->
            <div class="total" style="text-align:center;">
                <div class="biaoti" style="border-width:0 0 5px 0;border-style:solid;border-color:#6eaad7;">
                    <h2 style="color:#6eaad7">健身管理</h2>
                </div>
                <div class="biaoti2">
                    <div class="class1">
                        <h1>日期：</h1>
                    </div>
                </div>
                <div class="biaoti2">
                    <div class="class1" style="text-align:center;">
                        <h1>饮食记录</h1>
                    </div>
                    <div class="content1">
                        <ol>
                            <h5 style="text-align:left;color:#6eaad7;">早餐：</h5>
                            <h5 style="text-align:left;color:#6eaad7;">午餐：</h5>
                            <h5 style="text-align:left;color:#6eaad7;">晚餐：</h5>
                            <h5 style="text-align:left;color:#6eaad7;">零食饮料：</h5>
                            <h5 style="text-align:left;color:#6eaad7;">喝水杯数：</h5>
                            <h5 style="text-align:left;color:#6eaad7;">其他：</h5>
                        </ol>
                    </div>
                </div>
                <div class="biaoti2">
                    <div class="class1" style="text-align:center;">
                        <h1>运动记录</h1>
                    </div>
                    <div>
                        <ol>
                            <h5 style="text-align:left;color:#6eaad7;">下午7:00</h5>
                            <h5 style="text-align:left;color:#6eaad7;">下午7:15</h5>
                            <h5 style="text-align:left;color:#6eaad7;">下午7:30</h5>
                            <h5 style="text-align:left;color:#6eaad7;">下午7:45</h5>
                            <h5 style="text-align:left;color:#6eaad7;">下午8:00</h5>
                            <h5 style="text-align:left;color:#6eaad7;">下午8:15</h5>
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