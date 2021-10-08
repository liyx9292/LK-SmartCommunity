<template>
  <view class="step-container">
    <!-- 紧急联系人 -->
    <view class="block">
      <view class="label">
        设置紧急联系人（选择前请核对手机号码）
      </view>
      <view class="user-container">
        <view class="user-item" :class="{actUser: item === 1}" v-for="item in [1,2,3]" :key="item">
          <view class="user-name">
            张三
          </view>
          <view class="user-tel">
            12345678901
          </view>
        </view>
      </view>
    </view>
    <!-- 紧急联系人 -->
    <view class="block">
      <view class="label">
        家中是否有70岁以上需要特殊关怀的老人
      </view>
      <view class="user-container">
        <view class="user-item special-user" :class="{actUser: item === 1}" v-for="item in [1,2,3]" :key="item">
          <view class="user-name">
            张三
          </view>
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
export default {
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.step-container {
  width: 100%;
  padding-bottom: 50rpx;
  .block {
    margin-top: 10rpx;
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    padding: 25rpx 30rpx 30rpx 30rpx;
    .label {
      width: 100%;
      font-size: 30rpx;
      color: #333;
      margin-bottom: 5rpx;
    }
    .user-container {
      width: 660rpx;
      display: flex;
      flex-wrap: wrap;
      .user-item {
        margin-top: 30rpx;
        width: 300rpx;
        margin-right: 30rpx;
        border: 1rpx solid #EDEDED;
        font-size: 30rpx;
        color: #333;
        box-sizing: border-box;
        padding: 20rpx;
        @include flexBlock(center, column);
        view {
          text-align: center;
          width: 100%;
        }
        .user-tel {
          margin-top: 15rpx;
        }
      }
      .actUser {
        background: #FFE7E8;
        border: 1rpx dotted $basic-color;
      }
      .special-user {
        .user-name {
          height: 70rpx;
          line-height: 70rpx;
        }
      }
    }
  }

  .button-group {
    margin: 0 auto;
    margin-top: 100rpx;
    width: 690rpx;
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