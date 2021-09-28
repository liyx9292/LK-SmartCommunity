<template>
  <view class="card" @click="jumpDetail">
    <!-- 图片 -->
    <view class="card-image-block" :class="{finishedCard: isFinished}">
      <image class="card-image" :src="activityItem.image"/>
    </view>
    <view class="card-right">
      <view class="card-title">
        {{activityItem.title}}
      </view>
      <view class="card-info">
        <view class="card-desc">
          <view class="desc-bar">
            <image class="desc-icon" src="/static/icons/icon_users.png" />
            <text>50人</text>
          </view>
          <view class="desc-bar">
            <image class="desc-icon" src="/static/icons/icon_time.png" />
            <text>08:00至17:00</text>
          </view>
          <view class="desc-bar">
            <image class="desc-icon" src="/static/icons/icon_date.png" />
            <text>2021年08月23日</text>
          </view>
        </view>
        <template v-if="!isFinished">
          <view class="card-integral">
            <text class="number">15</text>
            <text>分/时</text>
            <view v-if="isDuration" class="clickButton">
              点击查看
            </view>
          </view>
        </template>
        <template v-else>
          <view class="card-integral finished-integral">
            <view class="int-get-number">
              <text class="number">15</text>
              <text>分</text>
            </view>
            <view class="int-get-text">
              获得
            </view>
            <image class="item-finished-image" src="/static/index/index_apllyFinished.png"/>
          </view>
        </template>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props:{
    activityItem: {
      type: Object,
      default: {
        image: '',
        title: '我是标题',
      }
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
    isDuration: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    jumpDetail() {
      let id = this.activityItem.id || 0
      if (this.isFinished) return
      this.utils.jumpPage(`/pages/index/volunteerDetail?id=${id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  width: 750rpx;
  margin-top: 10rpx;
  background: #fff;
  box-sizing: border-box;
  padding: 30rpx;
  display: flex;
  .card-image-block {
    width: 170rpx;
    height: 170rpx;
    border-radius: 8rpx;
    overflow: hidden;
    .card-image {
      width: 100%;
      height: 100%;
    }
  }
  .card-right {
    width: 500rpx;
    margin-left: 20rpx;
    .card-title {
      @include textOverflow();
      font-size: 34rpx;
      color: #444;
      font-weight: 600;
      height: 34rpx;
      line-height: 34rpx;
    }
    .card-info {
      width: 100%;
      position:relative;
      .card-desc {
        width: 100%;
        margin-top: 10rpx;
        .desc-bar {
          width: 100%;
          font-size: 28rpx;
          color: #999;
          overflow: hidden;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .desc-icon {
            width: 30rpx;
            height: 30rpx;
            display: inline-block;
            margin-right: 10rpx;
          }
          text {
            display: inline-block;
          }
        }
      }
      .card-integral {
        position: absolute;
        right: 15rpx;
        top: 0rpx;
        font-size: 26rpx;
        color: $basic-color;
        min-width: 100rpx;
        .number {
          font-size: 40rpx;
          font-weight: 600;
        }
        .clickButton {
          width: 100%;
          text-align: center;
          padding: 5rpx 10rpx;
          margin-top: 15rpx;
          font-size: 26rpx;
          color: #fff;
          border-radius: 8rpx;
          background: $basic-color;
          box-sizing: border-box;
          position: relative;
          left: -8rpx;
        }

      }
    }
  }
}

// finished
.finishedCard {
  filter: grayscale(100%);
}
.finished-integral {
  color: #999999 !important;
  .int-get-number {
    width: 100%;
    text-align: center;
  }
  .int-get-text {
    text-align: center;
    font-size: 26rpx;
  }
  .item-finished-image {
    width: 130rpx;
    height: 130rpx;
    position: absolute;
    z-index: 9;
    right: -30rpx;
    top: 0;
  }
}
</style>