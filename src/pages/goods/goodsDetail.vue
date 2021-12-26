<template>
  <view class="body">
    <!-- 图片 -->
    <swiper class="image-swiper">
      <swiper-item v-for="item in images" :key="item">
        <image class="image-item" :src="`${url}${goodsDetail.images}`"/>
      </swiper-item>
    </swiper>
    <!-- 详细信息 -->
    <view class="infomation">
      <view class="title-bar">
        <view class="title">
          {{ goodsDetail.goods_name }}
        </view>
        <view class="price">
          <text class="num">{{ handlePrice }}</text>
          积分
        </view>
      </view>

      <view class="check-desc" v-if="pageType === 'check'">
        <view class="check-label">
          核销码：
        </view>
        <view class="check-code">
          123
        </view>
      </view>

    </view>

    <button class="button" :class="{ disbaledButton: goodsDetail.stock_nums === 0 }" @click="submit">{{ goodsDetail.stock_nums === 0 ? '库存不足' : pageType === 'integral' ? '立即兑换' : '点击核销' }}</button>
    
  </view>
</template>
<script>
// TODO: 核销和积分流程
// 商品名称过长怎么显示
// 内容过少是真的吗
// @pageType: {integral} {check}
import config from '@/config'
export default {
  data() {
    return {
      url: config.baseUrl,
      id: '',
      goodsDetail: {},
      pageType: 'check',
      images: [1,2,3],
    }
  },
  onLoad(e) {
    this.id = e.id
    this.pageType = e.goodsType
    this.getDetail()
  },
  methods: {
    getDetail() {
      let params = {
        id: this.id,
      }
      this.services.get('/getGoodsDetail.html', params)
      .then(res => {
        this.goodsDetail = res
      })
    },
    submit() {
      if (this.goodsDetail.stock_nums === 0) return
      if (this.pageType === 'integral') {
        this.duihuan()
      } else {
        this.checkGoods()
      }
    },
    duihuan() {
      uni.showModal({
        title: '确定兑换',
        content: '是否兑换这个商品',
        success: () => {
          // return
          let params = {
            goods_id: this.id,
            goods_num: 1,
          }
          this.services.post('/orders.html', params)
          .then(res => {
            this.utils.showToast('兑换成功', 'success', '', 2500)
          })
          .catch(rej => {
            this.utils.showToast(rej.data.msg, 'error', '', 2500)
          })
        },
      })
    },
    checkGoods() {
      uni.showModal({
        title: '确定核销',
        content: '是否核销这个商品',
        success: () => {
          this.utils.showToast('核销成功', 'success', '', 2500)
        },
      })
    },
  },
  computed: {
    handlePrice() {
      let price = this.goodsDetail.price || '0'
      return parseFloat(price)
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  @include body();
  padding-bottom: 150rpx;
}
.image-swiper {
  width: 100%;
  height: 750rpx;
  .image-item {
    width: 750rpx;
    height: 750rpx;
  }
}
.infomation {
  width: 100%;
  box-sizing: border-box;
  padding: 25rpx 30rpx;
  background: #fff;
  .title-bar {
    @include flexBlock(space-between, row, flex-end);
    .title {
      font-size: 32rpx;
      color: #333;
      font-weight: 600;
    }
    .price {
      color: $basic-color;
      font-size: 26rpx;
      .num {
        font-size: 40rpx;
        font-weight: 600;
      }
    }
  }
  .check-desc {
    margin-top: 35rpx;
    font-size: 26rpx;
    color: #333;
    @include flexBlock(flex-start, row, flex-end);
    .check-code {
      color: #FF4242;
      font-size: 36rpx;
      font-weight: 600;
      margin-bottom: -4rpx;
    }
  }
}
.button {
  width: 690rpx;
  height: 100rpx;
  background: $basic-color;
  border-radius: 20rpx;
  line-height: 100rpx;
  text-align: center;
  font-weight: 600;
  color: #fff;
  font-size: 32rpx;
  position: fixed;
  bottom: 50rpx;
  left: 30rpx
}
.disbaledButton {
  color: #fff;
  background: #CCCCCC;
}
</style>