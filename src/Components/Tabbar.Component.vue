<template>
  <view class="tabbar-block">
    <view class="tabbar-item"
      v-for="(item, index) in tabList"
      :key="index"
      :class="{activeItem: nowPath === item.path, centerTab: item.id === 3}"
      @tap="switchPage(item)"
    >
      <view class="tabbar-image-block" :class="{bigImage: item.id === 3}">
        <image class="tabbar-image" :src="nowPath === item.path ? item.selectIcon : item.icon"/>
      </view>
      <view class="tabbar-item-text">
        {{item.label}}
      </view>
    </view>

  </view>
</template>
<script>
  export default {
    data() {
      return {
        tabList: [
          { id: 1, label: '主页', icon: '', selectIcon: '', path: '/index' },
          { id: 2, label: '家庭信息', icon: '', selectIcon: '', path: '' },
          { id: 3, label: '扫码打卡', icon: '', selectIcon: '', path: '' },
          { id: 4, label: '购物核销', icon: '', selectIcon: '', path: '' },
          { id: 5, label: '我的', icon: '', selectIcon: '', path: '' },
        ],
        nowPath: '/index'
      }
    },

    methods: {
      switchPage(tab) {
        if (tab.id === 3) {
          // 扫码打卡方法
        } else {
          if (tab.path === this.nowPath) return

        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.tabbar-block {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100rpx;
  display: flex;
  justify-content: space-around;
  background: #fff;
  box-shadow: 0rpx -4rpx 10rpx rgba(0, 0, 0, 0.2);
  .tabbar-item {
    color: #B2B8BF;
    font-size: 22rpx;
    width: 100rpx;
    position: relative;
    .tabbar-image-block {
      width: 42rpx;
      height: 42rpx;
      position: absolute;
      bottom: 30rpx;
      left: 29rpx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .tabbar-image {
        width: 42rpx;
        height: 42rpx;
        margin: 0 auto;
      }
    }
    .tabbar-item-text {
      width: 100%;
      text-align: center;
      box-sizing: border-box;
      padding-top: 65rpx;
    }
  }
  .activeItem {
    color: $basic-color;
  }
  .centerTab {
    width: 110rpx;
    .tabbar-image-block {
      width: 110rpx;
      height: 110rpx;
      background: #fff;
      box-shadow: 0rpx -8rpx 6rpx rgba(0, 0, 0, 0.08);
      border-radius: 110rpx;
      left: 2rpx;
      bottom: 40rpx;
      .tabbar-image {
        width: 105rpx;
        height: 105rpx;
      }
    }
  }
}
</style>
