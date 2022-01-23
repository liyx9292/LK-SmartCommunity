<template>
  <view class="body">
    <list>
      <cell v-for="item in list" :key="item">
        <view class="order-item">
          <image src="/static/banner-bg.png" class="order-image"/>
          <!-- <image :src="`${url}${goodsItem.images}`" class="order-image"/> -->
          <view class="order-info">
            <view class="order-name">
              订单名称
            </view>
            <view class="order-status">
              未核销
            </view>
          </view>
        </view>
      </cell>
    </list>
  </view>
</template>
<script>
import config from '@/config'
export default {
  data() {
    return {
      url: config.baseUrl,
      list: [1,2,3],
      nowPage: 1,
      allPage: 1,
      queryType: 'points',
    }
  },
  onLoad() {
    this.getList()
  },
  methods: {
    getList(page = 1) {
      // if (page > this.allPage) return
      // this.services.post('/getOrderList.html')
      // .then(res => {
      //   this.list = res
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  @include body();
  padding-bottom: 50rpx;
  padding-top: 30rpx;
}
.order-item {
  width: 690rpx;
  height: 120rpx;
  margin: 0 auto;
  margin-bottom: 30rpx;
  background: #fff;
  border-radius: 6rpx;
  box-sizing: border-box;
  padding: 20rpx;
  padding-right: 40rpx;
  display: flex;
  .order-image {
    width: 80rpx;
    height: 80rpx;
    display: block;
    margin-right: 30rpx;
  }
  .order-info {
    width: 560rpx;
    .order-name {
      font-size: 24rpx;
      color: #333;
    }
    .order-status {
      margin-top: 20rpx;
      text-align: right;
      font-size: 20rpx;
      color: $basic-color;
    }
  }
}
</style>