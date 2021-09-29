<template>
  <view class="body">
    <list>
      <cell v-for="item in communityList" :key="item">
        <view class="community-item" @click="jumpUnit(item)">
          <view class="community-name">
            社区名称
          </view>
          <view class="build-label">
            服务楼栋分布
          </view>
          <view class="build-container">
            <view class="build-item" v-for="item in [1,2,3,4,5]" :key="item">
              <view class="build-num">
                01
              </view>
              <view class="build-unit">
                栋
              </view>
            </view>
          </view>
        </view>
      </cell>
    </list>
  </view>
</template>
<script>
export default {
  data() {
    return {
      communityList: [1,2,3,4]
    }
  },
  methods: {
    jumpUnit(item) {
      console.log(1)
      this.utils.jumpPage(`/pages/index/civilizedBuild/unit`)
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  @include body();
  padding-bottom: 50rpx;
}
.community-item {
  width: 750rpx;
  background: #fff;
  box-sizing: border-box;
  padding: 60rpx 0 80rpx 30rpx;
  margin-bottom: 30rpx;
  .community-name {
    font-size: 36rpx;
    color: #333;
    font-weight: 600;
  }
  .build-label {
    margin-top: 70rpx;
    color: #333;
    font-size: 32rpx;
    font-weight: 600;
  }
  .build-container {
    width: 720rpx;
    .build-item {
      margin-top: 40rpx;
      margin-right: 35rpx;
      width: 108rpx;
      box-sizing: border-box;
      padding: 38rpx 0;
      background: #F2F2F2;
      border-radius: 10rpx;
      display: inline-block;
      .build-num {
        width: 100%;
        text-align: center;
        font-size: 36rpx;
        color: #333;
        font-weight: 600;
      }
      .build-unit {
        width: 100%;
        text-align: center;
        font-size: 28rpx;
        color: #999;
        font-weight: 600;
        margin-top: 8rpx;
      }
    }
  }
}
</style>