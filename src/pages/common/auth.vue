<template>
  <view class="body">
    <view class="logo-container">
      <image class="logo-img" src="/static/index/logo.png" />
    </view>
    <button class="button" open-type="getUserInfo" @getuserinfo="getUserInfo">点击授权登录</button>
    <view class="modal">
      <view class="modal-block">
        <view class="title">
          <image class="title-icon" src="/static/index/logo.png" />
          <view class="title-big">
            智慧社区
          </view>
          <view class="title-small">
            申请使用
          </view>
        </view>
        <view class="tel-text">
          您的手机号
        </view>
        <button class="button modal-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">一键获取手机号</button>
      </view>
    </view>
  </view>
</template>
<script>
import { default as Constants } from '@/Utils/constants'
export default {
  data() {
    return {

    }
  },
  methods: {
    getUserInfo(res) {
      let okIndex = res.detail.errMsg.indexOf('ok')
      if (okIndex >= 0) {
        let userInfo = res.detail.userInfo
        this.utils.setStorage(Constants.USER_INFO, userInfo)
        this.utils.jumpPage('/pages/index/index', true)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>