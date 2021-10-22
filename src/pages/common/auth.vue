<template>
  <view class="body">
    <view class="logo-container">
      <image class="logo-img" src="/static/index/logo.png" />
    </view>
    <button class="button" open-type="getUserInfo" @getuserinfo="getUserInfo">点击授权登录</button>
    <view class="modal" v-if="isShowModal">
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
      isShowModal: false,
    }
  },
  methods: {
    getUserInfo(res) {
      let { userInfo } = res.detail
      if (userInfo) {
        this.utils.setStorage(Constants.USER_INFO, userInfo)
        this.isShowModal = true
      }
    },
    switchShowModal() {
      let showValue = this.isShowModal
      this.isShowModal = !showValue
    },
    getPhoneNumber(e) {
      console.log(e)
      debugger
      let { detail } = e.detail
      this.utils.jumpPage('/pages/index/index', true)
    }
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

  .modal {
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 100vh;
    @include flexBlock(flex-end, column);
    .modal-block {
      width: 100%;
      background: #fff;
      border-radius: 20rpx 20rpx 0 0;
      box-sizing: border-box;
      padding: 24rpx 30rpx 70rpx 30rpx;
      .title {
        @include flexBlock(flex-start, row, flex-end);
        width: 100%;
        .title-icon {
          width: 50rpx;
          height: 50rpx;
          display: block;
          margin-right: 15rpx;
        }
        .title-big {
          font-size: 32rpx;
          color: #333;
          margin-right: 18rpx;
          font-weight: 600;
        }
        .title-small {
          font-size: 28rpx;
          color: #333;
        }
      }
      .tel-text {
        font-size: 28rpx;
        color: #333;
        margin-top: 55rpx;
      }
      .modal-button {
        margin-top: 70rpx;
      }
    }
  }
}
</style>