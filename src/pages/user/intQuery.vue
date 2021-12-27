<template>
  <view class="body">
    <list>
      <cell v-for="item in list" :key="item">
        <view class="int-detail">
          <view class="int-info">
            <view class="int-info-left">
              <view class="int-date">
                2021年9月18日 13:14:14
              </view>
              <view class="int-title">
                交通执法志愿者岗位
              </view>
            </view>
            <view class="int-info-right">
              <view class="int-num">
                +32
              </view>
              <view class="int-label">
                积分
              </view>
            </view>
          </view>
          <!-- 理由 -->
          <view class="int-reason">
            <view class="int-reason-text">
              加分理由
              <text>参加志愿者活动</text>
            </view>
            <view class="int-reason-image-container" v-if="item < 2">
              <image class="int-image" src="" v-for="(item, index) in [1,2,3,4]" :key="index"/>
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
      list: [],
      nowPage: 1,
      allPage: 1,
      queryType: 'points',
    }
  },
  onLoad(options) {
    let { type } = options
    this.queryType = type
    this.getList()
  },
  methods: {
    getList(page = 1) {
      let params = {
        type: this.queryType === 'points' ? 'p' : 'f'
      }
      if (page > this.allPage) return
      this.services.get('/getPointsList.html', params)
      .then(res => {
        this.list = res.data
        this.nowPage = page
        this.allPage = Math.ceil(res.total / res.per_page)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  @include body();
  padding-bottom: 50rpx;
}
.int-detail {
  width: 750rpx;
  background: #fff;
  box-sizing: border-box;
  padding: 30rpx 30rpx 20rpx 30rpx;
  margin-top: 10rpx;
  .int-info {
    @include flexBlock(space-between, row, center);
    width: 100%;
    .int-info-left {
      color: #333;
      .int-date {
        font-size: 28rpx;
        color: #333;
      }
      .int-title {
        margin-top: 36rpx;
        font-size: 30rpx;
        font-weight: 600;
      }
    }
    .int-info-right {
      .int-num {
        font-size: 48rpx;
        color: $basic-color;
        font-weight: 600;
        text-align: center;
      }
      .int-label {
        width: 100%;
        text-align: center;
        font-size: 28rpx;
        color: #999;
      }
    }
  }
  .int-reason {
    width: 690rpx;
    border-radius: 10rpx;
    background: #FFFAFA;
    box-sizing: border-box;
    padding: 36rpx 20rpx;
    margin-top: 30rpx;
    border-radius: 10rpx;
    .int-reason-text {
      width: 100%;
      font-size: 30rpx;
      color: #ADA0A0;
      text {
        display: inline-block;
        margin-left: 6rpx;
        color: #333;
        font-size: 28rpx;
        font-weight: 600;
      }
    }
    .int-reason-image-container {
      width: 680rpx;
      .int-image {
        margin-top: 30rpx;
        margin-right: 20rpx;
        width: 150rpx;
        height: 150rpx;
        display: inline-block;
      }
    }
  }
}
</style>