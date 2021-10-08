<template>
  <view class="step-container">
    <view class="step-label">
      业主姓名
    </view>
    <view class="step-input-container">
      <input class="step-input" placeholder="请输入业主姓名"/>
    </view>
    <!-- 选择性别 -->
    <view class="step-label">
      业主姓名
    </view>
    <view class="sex-container">
      <view class="sex-item" :class="{actSex: nowSex === item.value}" v-for="item in gender" :key="item.value">
        <image class="sex-image" :src="item.icon" />
        <text>{{item.label}}</text>
      </view>
    </view>
    <view class="step-label">
      身份证号码
    </view>
    <view class="step-input-container">
      <input class="step-input" placeholder="请输入身份证号码"/>
    </view>
    <view class="step-label">
      手机号码
    </view>
    <view class="step-input-container">
      <input class="step-input" placeholder="请输入手机号码"/>
    </view>

    <!-- 添加家庭成员 -->
    <view class="family-container">
      <view class="user-item">
        <view class="user-info">
          <view class="user-name">
            王继
          </view>
          <view class="user-tel">
            12345678901
          </view>
        </view>
        <view class="user-id">
          3123123123910230132
        </view>
        <image class="user-delete" src="/static/icon/" />
      </view>
      <!-- 添加 -->
      <view class="increase-block">
        <view class="increase-item">
          <image class="increase-icon" src="/static/icons/icon_family_add.png" />
          <text>添加家庭成员信息</text>
        </view>
      </view>
    </view>

    <view class="button-group">
      <view class="button-item" @click="prevStep">
        上一步
      </view>
      <view class="button-item next-button" @click="nextStep">
        下一步
      </view>
    </view>
  </view>
</template>
<script>
// TODO: 删除图标没有
export default {
  emits: ['nextStep', 'prevStep'],
  data() {
    return {
      gender: [
        { label: '男性', icon: '/static/family/family_male.png', value: '1' },
        { label: '女性', icon: '/static/family/family_female.png', value: '2' },
      ],
      nowSex: '1',
    }
  },
  methods: {
    nextStep() {
      this.$emit('nextStep', {}, 'step2Data')
    },
    prevStep() {
      this.$emit('prevStep')
    }
  }
}
</script>
<style lang="scss" scoped>
.step-container {
  margin-top: 10rpx;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 25rpx 30rpx 100rpx 30rpx;
  .step-label {
    font-size: 30rpx;
    font-weight: 500;
    color: #333333;
    margin-bottom: 35rpx;
  }
  .step-input-container {
    width: 100%;
    border-radius: 8rpx;
    border: 1rpx solid #ccc;
    box-sizing: border-box;
    padding: 35rpx 30rpx;
    margin-bottom: 35rpx;
    .step-input {
      width: 100%;
      font-size: 30rpx;
      color: #333;
    }
  }
  .sex-container {
    width: 100%;
    margin-bottom: 35rpx;
    display: flex;
    .sex-item {
      width: 280rpx;
      height: 100rpx;
      border-radius: 50rpx;
      margin-right: 50rpx;
      box-sizing: border-box;
      padding: 0 10rpx;
      @include flexBlock(flex-start, row, center);
      font-size: 30rpx;
      color: #333;
      border: 1rpx solid #ccc;
      .sex-image {
        width: 80rpx;
        height: 80rpx;
        display: block;
        margin-right: 20rpx;
      }
    }
    .actSex {
      border-color: $basic-color;
      color: #fff;
      background: $basic-color;
    }
  }
  // 添加家庭成员
  .family-container {
    width: 100%;
    border: 1rpx dotted $basic-color;
    box-sizing: border-box;
    padding: 35rpx 20rpx;
    background: #FFE7E8;
    margin-top: 15rpx;
    .user-item {
      width: 100%;
      background: $basic-color;
      color: #fff;
      box-sizing: border-box;
      padding: 30rpx;
      font-size: 30rpx;
      position: relative;
      margin-bottom: 20rpx;
      border-radius: 10rpx;
      .user-info {
        display: flex;
        .user-name {
          width: 120rpx;
          margin-right: 15rpx;
          @include textOverflow();
        }
      }
      .user-id {
        margin-top: 10rpx;
        width: 100%;
      }
      .user-delete {
        width: 42rpx;
        height: 42rpx;
        position: absolute;
        right: 30rpx;
        top: 40rpx;
      }
    }

    .increase-block {
      width: 100%;
      box-sizing: border-box;
      padding: 60rpx 135rpx;
      .increase-item {
        border-radius: 20rpx;
        background: $basic-color;
        width: 100%;
        @include flexBlock(flex-start, row, center);
        color: #fff;
        font-size: 32rpx;
        font-weight: 600;
        box-sizing: border-box;
        padding: 22rpx 30rpx;
        .increase-icon {
          width: 35rpx;
          height: 35rpx;
          display: block;
          margin-right: 10rpx;
        }
      }
    }
  }

  .button-group {
    margin-top: 300rpx;
    width: 100%;
    @include flexBlock(space-between);
    .button-item {
      width: 330rpx;
      height: 100rpx;
      background: #CCCCCC;
      border-radius: 20rpx;
      text-align: center;
      line-height: 100rpx;
      font-size: 32rpx;
      color: #fff;
    }
    .next-button {
      background: $basic-color;
    }
  }
}
</style>