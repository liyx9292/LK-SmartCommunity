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

    <view class="button-group">
      <view class="button-item" @click="showModal('decrease')">减分</view>
      <view class="button-item increase-button" @click="showModal('increase')">加分</view>
    </view>

    <!-- 加分弹框 -->
    <view class="modal" v-if="modalType === 'increase'" @click="closeModal">
      <view class="modal-block" @click.stop="stopPop">
        <image class="close-modal" src=""/>
        <view class="modal-title">
          加分情况
        </view>
        <view class="input-container">
          <input class="modal-input" placeholder="请输入分数"/>
        </view>
        <button class="modal-button">上报</button>
      </view>
    </view>
    <!-- 减分弹框 -->
    <view class="modal decrease-modal" v-if="modalType === 'decrease'" @click="closeModal">
      <view class="modal-block decrease-block" @click.stop="stopPop">
        <image class="close-modal" src=""/>
        <view class="input-container">
          <input class="modal-input" placeholder="请输入所扣分数"/>
        </view>
        <view class="input-label">
          请输入减分理由
        </view>
        <view class="input-container text-area">
          <textarea placeholder="请输入减分理由"/>
        </view>
        <view class="reason-block">
          <view class="reason-item">
            乱扔垃圾
          </view>
        </view>
        <!-- 上传图片 -->
        <view class="image-container">
          <view class="image-item" v-for="(item, index) in imageUpload" :key="index">
            <image class="image-item-img" :src="item"/>
          </view>
          <view class="image-item upload-image" v-if="imageUpload.length < 3">
            <image class="upload-image-img" src="/static/index/upload_image.png" @click="chooseImage"/>
          </view>
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
      roomList: [1,2,3,4,5,6],
      modalType: '',
      modalDetail: {
        int: null,
        reason: '',
      },
      imageUpload: [],
    }
  },
  methods: {
    showModal(type = 'increase') {
      this.modalType = type
    },
    closeModal() {
      this.modalType = ''
      this.modalDetail.int = null
      this.modalDetail.reason = ''
      this.imageUpload = []
    },
    stopPop() {},
    chooseImage() {
      console.log(1)
      uni.chooseImage({
        count: 1,
        success: res => {
          let src = res.tempFilePaths[0]
          this.imageUpload.push(src)
        }
      })
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

.button-group {
  width: 690rpx;
  position: absolute;
  bottom: 200rpx;
  left: 30rpx;
  @include flexBlock(space-between, row, center);
  .button-item {
    width: 330rpx;
    height: 100rpx;
    border-radius: 20rpx;
    color: #fff;
    background: #ccc;
    line-height: 100rpx;
    text-align: center;
  }
  .increase-button {
    margin-left: 30rpx;
    background: $basic-color;
  }
}

// 弹框
.modal {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  @include flexBlock(center, column, center);
  .modal-block {
    width: 570rpx;
    margin: 0 auto;
    background: #fff;
    border-radius: 20rpx;
    box-sizing: border-box;
    padding: 60rpx 40rpx 90rpx 40rpx;
    .close-modal {
      width: 24rpx;
      height: 24rpx;
      position: absolute;
      right: 30rpx;
      top: 30rpx;
    }
    .modal-title {
      width: 100%;
      text-align: center;
      font-size: 36rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 45rpx;
    }
    .input-container {
      width: 100%;
      background: #f7f7f7;
      border-radius: 8rpx;
      box-sizing: border-box;
      padding: 30rpx;
    }
    .modal-input {
      width: 100%;
      font-size: 30rpx;
    }
    .modal-button {
      width: 340rpx;
      height: 90rpx;
      background: $basic-color;
      border-radius: 45rpx;
      color: #fff;
      margin-top: 60rpx;
    }
  }
  .decrease-block {
    width: 100%;
    position: relative;
    bottom: -20rpx;
    padding: 60rpx 30rpx;
    .input-label {
      width: 100%;
      margin-top: 35rpx;
      margin-bottom: 30rpx;
      font-size: 26rpx;
      color: #333;
    }
    .text-area {
      width: 100%;
      height: 150rpx;
    }
    .reason-block {
      width: 100%;
      .reason-item {
        margin-top: 30rpx;
        margin-right: 15rpx;
        padding: 5rpx 20rpx;
        background: $basic-color;
        opacity: 0.2;
        border-radius: 20rpx;
        display: inline-block;
        color: #fff;
      }
    }
    .image-container {
      width: 100%;
      display: flex;
      .image-item {
        width: 210rpx;
        height: 210rpx;
        display: inline-block;
        border-radius: 10rpx;
        margin-right: 15rpx;
        overflow: hidden;
        @include flexBlock(center, column);
        background: #f7f7f7;
        margin-top: 30rpx;
        .image-item-img {
          width: 100%;
          height: 100%;
        }
        .upload-image-img {
          width: 142rpx;
          height: 142rpx;
          margin: 0 auto;
          display: block;
        }
      }
    }
  }
}

.decrease-modal {
  justify-content: flex-end;
}
</style>