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
      <!-- 房间 -->
      <view class="room-list">
        <view class="room-item"
          v-for="(item, index) in roomList"
          :key="item.family_id"
          @click="jumpRoom(index)"
        >
          <view class="room-num">
            {{ item.houseNumber }}
          </view>
          <view class="room-unit">
            室
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { default as Constants } from '@/Utils/constants'
const infoLabelKey = [
  { label: '小区', keyName: 'quartersName' },
  { label: '楼栋', keyName: 'buildStr' },
  { label: '服务人', keyName: 'manager' },
]
export default {
  data() {
    return {
      unitInfo: infoLabelKey,
      detail: {
        quartersName: '',
        buildNumber: '',
        manager: '',
      },
      roomList: [],
      userInfo: null
    }
  },
  onLoad() {
    let buildInfo = this.utils.getStorage(Constants.CIVILIZED_DATA)
    let userInfo = this.utils.getStorage(Constants.USER_INFO)
    let detail = buildInfo.BuildInfo
    detail.manager = userInfo.uname
    this.roomList = buildInfo.list
    this.detail = detail
  },
  methods: {
    jumpRoom(index) {
      let item = this.roomList[index]
      this.utils.setStorage(Constants.CIVILIZED_ROOM, item)
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
  .room-list {
    width: 720rpx;
    .room-item {
      width: 108rpx;
      background: #F2F2F2;
      border-radius: 10rpx;
      box-sizing: border-box;
      padding: 37rpx 0;
      margin-right: 35rpx;
      margin-top: 30rpx;
      margin-bottom: 10rpx;
      display: inline-block;
      .room-num {
        width: 100%;
        text-align: center;
        font-size: 36rpx;
        color: #333;
        font-weight: 600;
      }
      .room-unit {
        margin-top: 8rpx;
        font-size: 28rpx;
        color: #999;
        text-align: center;
      }
    }
  }
}
</style>