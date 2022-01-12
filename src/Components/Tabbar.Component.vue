<template>
  <view class="tabbar-block">
    <view class="tabbar-item"
      v-for="(item, index) in tabList"
      :key="index"
      :class="{activeItem: nowPath === item.path, centerTab: item.id === 3}"
      @click="switchPage(item)"
    >
      <view class="tabbar-image-block" v-if="item.id !== 3">
        <image class="tabbar-image" :src="nowPath === item.path ? item.selectIcon : item.icon"/>
      </view>
      <view class="tabbar-image-block bigImage" v-if="item.id === 3">
        <view class="scene-circle">
          <image class="tabbar-image" :src="item.icon"/>
        </view>
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
          { id: 1, label: '主页', icon: '/static/tab/tab_index.png', selectIcon: '/static/tab/tab_index_act.png', path: '/pages/index/index' },
          { id: 2, label: '家庭信息', icon: '/static/tab/tab_family.png', selectIcon: '/static/tab/tab_family_act.png', path: '/pages/family/familyDetail' },
          { id: 3, label: '扫码打卡', icon: '/static/tab/tab_scene.png', selectIcon: '', path: '' },
          { id: 4, label: '购物核销', icon: '/static/tab/tab_check.png', selectIcon: '/static/tab/tab_check_act.png', path: '/pages/check/index' },
          { id: 5, label: '我的', icon: '/static/tab/tab_user.png', selectIcon: '/static/tab/tab_user_act.png', path: '/pages/user/user' },
        ],
        nowPath: '/pages/index/index'
      }
    },
    mounted() {
      let pageInfo = getCurrentPages()
      this.nowPath = `/${pageInfo[0].route}`
    },
    methods: {
      switchPage(tab) {
        if (tab.id === 3) {
          // 扫码打卡方法
          uni.scanCode({
            onlyFromCamera: true,
            success: res => {
              this.utils.jumpPage(`/${res.path}`)
            }
          })
        // } else if ([2].includes(tab.id)) {
        //   this.utils.showModal('提示', '该功能未开放')
        } else {
          if (tab.path === this.nowPath) return
          this.utils.jumpPage(tab.path, true)
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
      width: 48px;
      height: 48rpx;
      position: absolute;
      bottom: 40rpx;
      left: 0rpx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .tabbar-image {
        width: 48rpx;
        height: 48rpx;
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
      .scene-circle {
        width: 100rpx;
        height: 100rpx;
        background: $basic-color;
        border-radius: 50rpx;
        position: absolute;
        left: 6rpx;
        top: 5rpx;
        @include flexBlock(center, column, center);
      }
      .tabbar-image {
        width: 53rpx;
        height: 53rpx;
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>
