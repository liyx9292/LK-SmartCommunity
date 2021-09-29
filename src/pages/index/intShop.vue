<template>
  <view class="body">
    <!-- tab -->
    <view class="top-tab">
      <view class="top-tab-item"
        v-for="item in tabList"
        :key="item"
        :class="{activeTab: nowTab === item.value}"
        @click="switchTab(item)"
      >
        {{ item.label }}
      </view>
    </view>

    <SearchInput />

    <view class="list">
      <list>
        <cell v-for="(item, index) in list" :key="index">
          <view class="shop-item" @click="jumpShop(item)">
            <image class="shop-image" src="" />
            <view class="shop-info">
              <view class="shop-name">
                永辉超市
              </view>
              <view class="shop-time desc-bar">
                <view class="shop-open" :class="{shopIsOpen: item.isOpen}">
                  {{item.isOpen ? '营业' : '关门'}}
                </view>
                09:00-22:00
              </view>
              <view class="desc-bar shop-location">
                <image class="location-icon" src="/static/icons/icon_location.png" />
                这是地址
              </view>
            </view>
          </view>
        </cell>
      </list>
    </view>
  </view>

</template>
<script>
import SearchInput from '../../Components/SearchInput'
export default {
  // TODO finish: 营业时间与未营业时的样式 灰色显示
  components: {
    SearchInput,
  },
  data() {
    return {
      pageLoading: false,
      tabList: [
        { value:'SHYP', label: '生活用品' },
        { value:'SHFW', label: '生活服务' },
        { value:'YLJK', label: '医疗健康' },
      ],
      nowTab: 'SHYP',
      list: [1,1,1,1,1,1],
    }
  },
  methods: {
    switchTab(item) {
      if (this.nowTab === item.value || this.pageLoading) return
      this.nowTab = item.value
    },
    jumpShop(shop) {
      this.utils.jumpPage(``)
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  background: #f7f7f7;
  min-height: 100vh;
  padding-top: 100rpx;
  padding-bottom: 40rpx;
}
.top-tab {
  width: 100%;
  background: #fff;
  height: 100rpx;
  box-sizing: border-box;
  @include flexBlock();
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  .top-tab-item {
    height: 100rpx;
    position: relative;
    color: #333;
    font-size: 28rpx;
    line-height: 100rpx;
    text-align: center;
    box-sizing: border-box;
    padding: 0 30rpx;
  }
  .activeTab {
    color: $basic-color;
    &::after {
      content: '';
      position: absolute;
      bottom: -2rpx;
      width: 80rpx;
      height: 4rpx;
      background: $basic-color;
      left: 50%;
      border-radius: 2rpx;
      margin-left: -25%;
    }
  }
}

.list {
  width: 710rpx;
  margin-left: 30rpx;
  .shop-item {
    margin-right: 20rpx;
    width: 335rpx;
    background: #fff;
    margin-top: 30rpx;;
    display: inline-block;
    .shop-image {
      width: 335rpx;
      height: 335rpx;
      display: block;
    }
    .shop-info {
      width: 100%;
      box-sizing: border-box;
      padding: 20rpx;
      .shop-name {
        width: 100%;
        font-size: 32rpx;
        color: #333;
        @include textOverflow();
        margin-bottom: 10rpx;
        font-weight: 600;
      }
      .desc-bar {
        margin-top: 10rpx;
        font-size: 28rpx;
        color: #333;
        @include textOverflow();
        @include flexBlock(flex-start, row, center);
      }
      .shop-time {
        .shop-open {
          padding: 0 4rpx;
          font-size: 18rpx;
          color: #fff;
          background: #eee;
          border-radius: 4rpx;
          margin-right: 6rpx;
        }
        .shopIsOpen {
          background: $basic-color;
        }
      }
      .shop-location {
        font-size: 26rpx;
        .location-icon {
          width: 22rpx;
          height: 28rpx;
          margin-right: 6rpx;
        }
      }
    }
  }
}
</style>