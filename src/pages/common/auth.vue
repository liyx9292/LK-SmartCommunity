<template>
  <view class="body">
    <view class="logo-container">
      <image class="logo-img" src="/static/index/logo.png" />
    </view>
    <button class="button" open-type="getUserInfo" @click="getUserProfile">点击授权登录</button>
  </view>
</template>
<script>
import { default as Constants } from '@/Utils/constants'
export default {
  data() {
    return {
      loginCode: '',
    }
  },
  onLoad() {
    this.utils.wxLogin()
    .then(code => {
      this.loginCode = code
    })
  },
  methods: {
    getUserProfile() {
      uni.getUserProfile({
        desc: '需要授权您的微信信息',
        success: res => {
          this.utils.setStorage(Constants.USER_LOGIN_DATA, res)
          this.utils.login(res)
          .then(res => {
            this.utils.jumpPage('/pages/index/index', true)
          })
        },
        fail(res) {
          console.log(res)
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.body {
  width: 100%;
  height: 100vh;
  background: #fff;
  position: relative;
  box-sizing: border-box;
  padding-top: 200rpx;
  .logo-container {
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx;
    overflow: hidden;
    margin: 0 auto;
    margin-bottom: 140rpx;
    .logo-img {
      width: 100%;
      height: 100%;
    }
  }
  .button {
    width: 690rpx;
    height: 100rpx;
    background: $basic-color;
    margin: 0 auto;
    color: #fff;
    border-color: $basic-color;
    line-height: 100rpx;
  }
}
</style>