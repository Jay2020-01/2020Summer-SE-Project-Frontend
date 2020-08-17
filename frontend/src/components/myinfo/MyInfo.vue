<template>
  <div class="myinfo_container">
    <el-card
      class="box-card"
      shadow="hover"
    >
      <div
        slot="header"
        class="clearfix"
      >
        <span>账号信息</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="confirm_modify('registerForm')"
        >
          确认修改
        </el-button>
      </div>
      <div class="text item">
        <el-form
          ref="registerForm"
          :model="registerForm"
          class="register_form"
          label-width="0px"
        >
          <el-container>
            <!-- 将卡片内容分成aside和main -->
            <el-aside width="200px">
              <!-- aside放头像 -->
              <!-- 直接改下面这里的top值可以上下移动头像框 -->
              <!-- 下面的action是上传的地址，这里是直接抄的elementui的组件，可以去“https://element.eleme.cn/#/zh-CN/component/upload”看 -->
              <!-- show-file-list是是否显示已经上传的文件
              on-success是上传成功时的钩子，应该就是上传成功就调用哪个函数
              before-upload上传之前的钩子，参数是上传的文件，返回false且被reject就停止删除 -->
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8000/ajax/image_upload/"
                :headers="myHeaders"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-aside>
            <el-main>
              <!-- 用户名 -->
              <el-form-item
               label
               prop="username"
              >
                <el-input
                v-model="registerForm.username"
                prefix-icon="fa fa-user"
                placeholder="用户名"
                />
              </el-form-item>
              <!-- 密码 -->
              <el-form-item
                label
                prop="password"
              >
                <el-input
                v-model="registerForm.password"
                show-password
                prefix-icon="fa fa-lock"
                placeholder="密码"
                />
              </el-form-item>
              <!-- 手机号 -->
              <el-form-item
                label
                prop="phone_number"
              >
                <el-input
                  v-model="registerForm.phone_number"
                  prefix-icon="fa fa-phone-square"
                  placeholder="手机"
                />
              </el-form-item>
              <!-- 邮箱 -->
              <el-form-item
                label
                prop="mail_address"
              >
                <el-input
                  v-model="registerForm.mail_address"
                  prefix-icon="fa fa-envelope"
                  placeholder="邮箱"
                />
              </el-form-item>
              <!-- 微信号 -->
              <el-form-item
                label
                prop="wechat"
              >
                <el-input
                  v-model="registerForm.wechat"
                  prefix-icon="fa fa-wechat"
                  placeholder="微信"
                />
              </el-form-item>
            </el-main>
          </el-container>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
var token = localStorage.getItem('token')
export default {
  data () {
    return {
      myHeaders: { Authorization: token },
      // 注册表单的数据绑定对象
      registerForm: {
        username: '',
        password: '',
        confirm_password: '',
        phone_number: '',
        mail_address: '',
        wechat: ''
        // 这里好像要增加一个url
      },
      imageUrl:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  created: function () {
    this.getMyInfo()
  },
  methods: {
    getMyInfo () {
      axios.get('http://localhost:8000/ajax/user_info/').then(res => {
        this.registerForm.username = res.data.username
        this.registerForm.phone_number = res.data.phone_number
        this.registerForm.wechat = res.data.wechat
        this.registerForm.mail_address = res.data.mail_address
        this.registerForm.password = res.data.password
        this.imageUrl = res.data.url
      })
    },
    tologin () {
      this.$router.push('/login')
    },
    confirm_modify (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = Qs.stringify(this.registerForm)
          axios.post('http://localhost:8000/ajax/change_info/', data).then(res => {
            this.$router.push('/myinfo')
          })
        } else {
          alert('表格不能为空')
        }
      })
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
}
</script>

<style lang="less" scoped>
  .myinfo_container {
    // 设置背景图片
    background-image: url("../../assets/backgroud-main.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    background-color: #2b4b6b;
    height: 100%;

  }

  .register_form {
    bottom: 5px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {

    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-40%, -50%);
  }
// 上传头像
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>