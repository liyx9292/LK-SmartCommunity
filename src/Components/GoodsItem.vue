<template>
  <view class="goods-item">
    <image src="" class="goods-image"/>
    <view class="goods-info">
      <view class="goods-name">
        {{ goodsItem.name }}
      </view>
      <view class="goods-desc">
        <view class="goods-price">
          <text class="num">{{ goodsItem.integral }}</text>
          积分
        </view>
        <view class="goods-unit">
          12卷/提
        </view>
      </view>
      <view class="goods-button" :class="{disabledButton: goodsItem.disabled}">
        {{ goodsItem.disabled ? '兑换结束' : '立即兑换'}}
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default: {
        name: '卫生纸',
        integral: 20,
        disabled: true,
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.goods-item {
  width: 335rpx;
  background: #fff;
  margin-top: 30rpx;
  margin-right: 20rpx;
  display: inline-block;
  .goods-image {
    width: 335rpx;
    height: 335rpx;
    display: block;
  }
  .goods-info {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx;
    .goods-name {
      font-size: 32rpx;
      color: #333;
      @include textOverflow();
      font-weight: 600;
    }
    .goods-desc {
      @include flexBlock(space-between, row, flex-end);
      margin-top: 10rpx;
      .goods-price {
        color: $basic-color;
        font-size: 26rpx;
        .num {
          font-size: 40rpx;
          font-weight: 600;
        }
      }
      .goods-unit {
        color: #999;
        font-size: 26rpx;
        margin-bottom: 6rpx;
      }
    }
  }
  .goods-button {
    width: 100%;
    border-radius: 8rpx;
    box-sizing: border-box;
    line-height: 60rpx;
    height: 60rpx;
    color: #fff;
    background: $basic-color;
    text-align: center;
    margin-top: 10rpx;
  }
  .disabledButton {
    background: #ccc;
  }
}
</style>