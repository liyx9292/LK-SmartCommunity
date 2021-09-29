<template>
  <view class="progress-container">
    <view class="progress-bar">
      <view class="progress-item"
        v-for="item in progressData"
        :key="item.id"
        :class="{isEnd: item.id < nowStep, isNow: item.id === nowStep, firstStep: item.id === 1}"
      >
        <view class="item-step-circle">
          <view class="item-step-num" v-if="item.id >= nowStep">
            {{ item.id }}
          </view>
          <image class="item-step-end" v-if="item.id < nowStep" src="/static/icons/icon_family_success.png"/>
        </view>
        <view class="item-status">
          {{ item.id > nowStep ? '未开始' : item.id === nowStep ? '进行中' : '已完成' }}
        </view>
        <view class="item-label">
          {{ item.label }}
        </view>
        <!--  -->
        
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    nowStep: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      progressData: [
        { id: 1, label: '住户信息' },
        { id: 2, label: '家庭成员' },
        { id: 3, label: '其他信息' },
      ],
    }
  }
}
</script>
<style lang="scss" scoped>
.progress-container {
  width: 750rpx;
  box-sizing: border-box;
  padding: 50rpx 0rpx;
  background: #fff;
  .progress-bar {
    width: 100%;
    @include flexBlock(space-between, row, center);
    .progress-item {
      position: relative;
      width: 200rpx;
      .item-step-circle {
        width: 50rpx;
        height: 50rpx;
        border-radius: 25rpx;
        margin: 0 auto;
        box-sizing: border-box;
        @include flexBlock(center, column ,center);
        border: 1rpx solid #CCCCCC;
        color: #999;
        font-size: 32rpx;
        position: relative;
        .item-step-end {
          width: 54rpx;
          height: 54rpx;
          position: absolute;
          top: -4rpx;
          height: -2rpx;
        }
      }
      .item-status {
        width: 100%;
        text-align: center;
        font-size: 32rpx;
        font-weight: 600;
        color: #999;
        margin-top: 14rpx;
      }
      .item-label {
        width: 100%;
        text-align: center;
        font-size: 28rpx;
        color: #999;
        margin-top: 15rpx;
      }
      &::after {
        content: '';
        position: absolute;
        width: 180rpx;
        height: 2rpx;
        background: #ccc;
        top: 25rpx;
        left: -130rpx;
      }
    }
    .isEnd {
      .item-step-circle {
        border: unset !important;
      }
      .item-status {
        color: #333 !important;
      }
      &::after {
        background: $basic-color !important;
      }
    }
    .isNow {
      .item-step-circle {
        background: $basic-color;
        color: #fff !important;
        border: unset !important;
      }
      .item-status {
        color: #333 !important;
      }
      .item-label {
        color: #333 !important;
      }
      &::after {
        background: $basic-color;
      }
    }
    .firstStep {
      &::after {
        background: #fff !important;
      }
    }
  }
}
</style>