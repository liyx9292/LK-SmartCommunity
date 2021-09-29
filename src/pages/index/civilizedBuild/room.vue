<template>
  <view class="body">
    <view class="unit-container">
      <view class="unit-info">
        <view class="unit-info-bar" v-for="item in unitInfo" :key="item.keyName">
          <view class="unit-info-label">
            {{ item.label }}
          </view>
          <view class="unit-info-value">
            {{ detail[item.keyName] }}
          </view>
        </view>
      </view>
      <!-- 住户信息 -->
      <view class="live-label">
        文明户信息
      </view>
      <view class="live-container">
        <view class="live-info-block">
          户主：<text>户主名字</text>
        </view>
        <view class="live-info-block">
          居住人数：<text>3人</text>
        </view>
      </view>
    </view>

    <!-- 加分弹框 -->
    <view class="modal">
      <view class="modal-block">
        <image class="close-modal" src=""/>
        <view class="modal-title">
          加分理由
        </view>
        <view class="input-container">
          <input class="modal-input" placeholder="请输入分数"/>
        </view>
        <button class="modal-button">上报</button>
      </view>
    </view>
    <!-- 减分弹框 -->
    <view class="modal">
      <view class="modal-block">
        <image class="close-modal" src=""/>
        <view class="modal-title">
          加分理由
        </view>
        <view class="input-container">
          <input class="modal-input" placeholder="请输入分数"/>
        </view>
        <button class="modal-button">上报</button>
      </view>
    </view>
  </view>
</template>
<script>
// TODO: 加分弹窗 只有分数 没有理由
// TODO: 减分弹窗 理由标签从哪里获取, 图片最多几张
const infoLabelKey = [
  { label: '小区', keyName: 'community' },
  { label: '楼栋', keyName: 'build' },
  { label: '服务人', keyName: 'manager' },
  { label: '房间', keyName: 'room' }
]
export default {
  data() {
    return {
      unitInfo: infoLabelKey,
      detail: {
        community: '信达小区',
        build: '02栋',
        manager: '王王王',
        room: '102'
      },
      roomList: [1,2,3,4,5,6]
    }
  },
  methods: {
    jumpRoom(item) {
      this.utils.jumpPage('/pages/index/civilizedBuild/room')
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  @include body();
}
.unit-container {
  width: 750rpx;
  background: #fff;
  box-sizing: border-box;
  padding: 30rpx 0 100rpx 30rpx;
  .unit-info {
    width: 690rpx;
    box-sizing: border-box;
    background: #F2F2F2;
    padding: 15rpx 30rpx;
    .unit-info-bar {
      width: 100%;
      @include flexBlock(space-between, row, center);
      .unit-info-label {
        font-size: 28rpx;
        color: #999;
      }
      .unit-info-value {
        font-size: 32rpx;
        color: #333;
        font-weight: 600;
        margin-top: 15rpx;
        margin-bottom: 15rpx;
      }
    }
  }
  .live-label {
    margin-top: 50rpx;
    font-size: 36rp;
    color: #333;
    font-weight: 600;
  }
  .live-container {
    width: 690rpx;
    height: 100rpx;
    background: #FFE7E8;
    border: 1rpx dotted $basic-color;
    box-sizing: border-box;
    padding: 0 30rpx;
    margin-top: 37rpx;
    .live-info-block {
      width: 50%;
      font-size: 32rpx;
      color: #333;
      display: inline-block;
      line-height: 100rpx;
      text {
        font-weight: 600;
      }
    }
  }
}
</style>