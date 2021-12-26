<template>
  <view class="goods-item" @click="jumpPage">
    <image :src="`${url}${goodsItem.images}`" class="goods-image"/>
    <view class="goods-info">
      <view class="goods-name">
        {{ goodsItem.goods_name }}
      </view>
      <view class="goods-desc">
        <view class="goods-price">
          <text class="num">{{ handlePrice }}</text>
          积分
        </view>
        <view class="goods-unit">
          {{ unitStr }}
        </view>
      </view>
      <view class="goods-button" :class="{disabledButton: goodsItem.disabled || goodsItem.stock_nums === 0}">
        {{ goodsItem.stock_nums === 0 ? '库存不足' : goodsItem.disabled ? '兑换结束' : '立即兑换'}}
      </view>
    </view>
  </view>
</template>
<script>
import config from '@/config'
export default {
  data() {
    return {
      url: config.baseUrl,
    }
  },
  props: {
    goodsItem: {
      type: Object,
      default: {
        goods_name: '卫生纸',
        integral: 20,
        disabled: true,
        spec_type: '',
      }
    },
    goodsType: {
      type: String,
      default: 'integral'
    }
  },
  methods: {
    jumpPage() {
      let goodsItem = this.goodsItem
      if (goodsItem.stock_nums === 0 || goodsItem.disabled) return
      let id = goodsItem.goods_id
      let goodsType = this.goodsType
      this.utils.jumpPage(`/pages/goods/goodsDetail?id=${id}&goodsType=${goodsType}`)
    }
  },
  computed: {
    unitStr() {
      return (this.goodsItem.spec_type || '').replace(/\s/g, '/')
    },
    handlePrice() {
      let price = this.goodsItem.price || '0'
      return parseFloat(price)
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