<template>
  <view class="body">
    <view class="top-background">
      <image class="top-bg-image" src="/static/index/index_volunteer.png"/>
      <view class="top-text">
        请填写您的真实信息
      </view>
    </view>
    <!-- 表单 -->
    <form @submit="submitForm">
      <view class="form">
        <view class="form-item">
          <view class="form-label">
            姓名
          </view>
          <input class="form-input" name="uname" placeholder="请输入姓名"/>
        </view>
        <view class="form-item">
          <view class="form-label">
            手机号
          </view>
          <input class="form-input" name="mobile" :value="mobile" type="number" maxlength="11" disabled/>
          <button v-if="!mobile" class="getPhoneNumber" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
        </view>
        <view class="form-item">
          <view class="form-label">
            身份证号
          </view>
          <input class="form-input" name="idCardNo" placeholder="请输入身份证号" type="idcard" maxlength="18"/>
        </view>
        <view class="form-item">
          <view class="form-label">
            家庭住址
          </view>
          <input class="form-input" name="address" placeholder="请输入家庭住址" maxlength="50"/>
        </view>
      </view>
      <button form-type="submit" class="submit-button" :disabled="submitLoading">提交</button>
    </form>
    <!-- 授权手机号 -->
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
        
      </view>
    </view>
  </view>
</template>
<script>
export default {
// TODO finish: 手机号的修改, 默认锁死，点击修改才能修改
  data() {
    return {
      submitLoading: false,
      uname: '',
      mobile: '',
    }
  },
  methods: {
    submitForm(e) {
      this.submitLoading = true
      let data = e.detail.value
      this.services.post('/applyVolunteer', data)
      .then(res => {
        this.utils.showToast('提交成功', 'success', () => uni.navigateBack(), 2500)
      })
      .catch(res => {
        this.submitLoading = false
      })
    },
    getPhoneNumber(e) {
      let detail = e.detail
      if (!detail.iv) {
        this.utils.jumpPage('/pages/index/index', true)
        return
      }
      this.services.post('/getPhone.html', detail)
      .then(res => {
        this.mobile = res.phoneNumber
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  background: #f2f2f2;
  min-height: 100vh;
  padding-bottom: 30rpx;
}
.top-background {
  width: 100%;
  height: 300rpx;
  @include flexBlock(flex-start, column);
  background: $basic-color;
  .top-bg-image {
    width: 138rpx;
    height: 104rpx;
    display: block;
    margin: 0 auto;
  }
  .top-text {
    font-size: 32rpx;
    text-align: center;
    width: 100%;
    color: #FFE8E9;
    margin-top: 28rpx;
  }
}
// 表单
.form {
  width: 690rpx;
  background: #FFFFFF;
  border-radius: 20rpx;
  box-sizing: border-box;
  padding: 20rpx 50rpx;
  margin: 0 auto;
  margin-top: -100rpx;
  .form-item {
    width: 100%;
    border-bottom: 1rpx solid #EDEDED;
    padding: 30rpx 0;
    position: relative;
    .form-label {
      font-size: 30rpx;
      color: #333;
    }
    .form-input {
      margin-top: 35rpx;
      font-size: 30rpx;
      color: #333;
    }
  }
}
.form .form-item:last-child {
  border-bottom: unset !important;
}
.submit-button {
  width: 690rpx;
  height: 100rpx;
  color: #333;
  background: $basic-color;
  color: #fff;
  margin-top: 90rpx;
  border-radius: 20rpx;
}
.getPhoneNumber {
  position: absolute;
  font-size: 24rpx;
  color: $basic-color;
  bottom: 14rpx;
  left: -10rpx;
  z-index: 2;
  background: #fff;
  &::after {
    border: unset !important;
  }
}
</style>