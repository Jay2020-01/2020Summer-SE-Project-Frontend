<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {

    }
  },
  created () {
    var _this = this
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.response.status === 401) {
          console.log('request error, token error')
          _this.$store.dispatch('logout')
            .then(() => {
              _this.$router.push('/login')
            })
        }
        throw err
      })
    })
  }
}
</script>

<style>
</style>
