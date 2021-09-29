<template>
  <view class="body">
    <view class="top">
      <image class="top-background" src="/static/user/page_top.png" />
      <view class="top-container">
        <!-- 顶部栏 -->
        <view class="navigate-bar" :style="{paddingTop: `${statusHeight}rpx`}">
          个人资料
        </view>
        <!-- 用户信息 -->
        <view class="user-block">
          <view class="user-avatar-container">
            <image class="user-avatar" />
          </view>
          <view class="user-info">
            <view class="user-name">
              用户名字
            </view>
            <view class="user-tags">
              <view class="tag-item">
                <image class="tag-background" src="/static/user/tag_background.png" />
                <view class="tag-text">
                  文明户认证
                </view>
              </view>
            </view>
          
          </view>
        </view>

        <!-- 积分信息 -->
        <view class="int-bar">
          <view class="int-item" v-for="item in intKeys" :key="item.keyName" @click="jumpIntQuery">
            <view class="int-num">
              123
            </view>
            <view class="int-label">
              {{ item.label }}
            </view>
          </view>
        </view>
      </view>
    
      <!-- 志愿者证明 -->
      <view class="prove">
        <image class="prove-background" src="/static/user/bar_background.png"/>
        <view class="prove-container">
          <image class="prove-image" src="/static/user/user_love.png" />
          <view class="prove-desc">
            安徽省合肥市瑶海区长淮街道火车站社区志愿者证
          </view>
        </view>
      </view>
    </view>

    <!-- 底部信息 -->
    <view class="version-info">
      <view>
        安徽省合肥市瑶海区长淮街道火车站社区
      </view>
      <view>
        智慧社区-居民信用银行体系v1.0
      </view>
      <view style="margin-top: 24rpx">
        研发单位：合肥猎科网络科技有限责任公司
      </view>
    </view>

    <Tabbar />
  </view>
</template>
<script>
// TODO: 未登录的头像
import Tabbar from '../../Components/Tabbar.Component'
export default {
  components: {
    Tabbar,
  },
  data() {
    return {
      statusHeight: 0,
      intKeys: [
        { label: '拥有积分', keyName: 'hasInt' },
        { label: '志愿者积分', keyName: 'volunteerInt' },
        { label: '文明户积分', keyName: 'civilizedInt' },
      ],
    }
  },
  onLoad() {
    let statusHeight = this.utils.getStorage('statusBarHeight')
    this.statusHeight = statusHeight
  },
  methods: {
    jumpIntQuery() {
      this.utils.jumpPage(`/pages/user/intQuery`)
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  @include body();
}
.top {
  width: 100%;
  height: 475rpx;
  position: relative;
  .top-background {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .top-container {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .navigate-bar {
      height: 80rpx;
      width: 100%;
      line-height: 80rpx;
      text-align: center;
      font-size: 36rpx;
      color: #fff;
    }
    // 用户信息
    .user-block {
      width: 100%;
      box-sizing: border-box;
      padding: 0 30rpx;
      @include flexBlock(flex-start, row, center);
      .user-avatar-container {
        width: 120rpx;
        height: 120rpx;
        border-radius: 60rpx;
        overflow: hidden;
        margin-right: 30rpx;
        .user-avatar {
          width: 120rpx;
          height: 120rpx;
        }
      }
      .user-info {
        padding: 10rpx 0;
        .user-name {
          font-size: 36rpx;
          color: #fff;
          font-weight: 600;
        }
        .user-tags {
          margin-top: 25rpx;
          .tag-item {
            position: relative;
            width: 156rpx;
            height: 42rpx;
            margin-right: 15rpx;
            .tag-background {
              width: 156rpx;
              height: 42rpx;
            }
            .tag-text {
              position: absolute;
              left: 40rpx;
              top: 8rpx;
              z-index: 2;
              font-size: 20rpx;
              color: #9B4A1D;
              font-weight: 600;
            }
          }
        }
      }
    }
    
    // 积分信息
    .int-bar {
      width: 100%;
      box-sizing: border-box;
      padding: 0 60rpx;
      margin-top: 10rpx;
      @include flexBlock(space-between);
      .int-item {
        width: 200rpx;
        color: #fff;
        .int-num {
          width: 100%;
          text-align: center;
          font-size: 45rpx;
          font-weight: 600;
        }
        .int-label {
          width: 100%;
          text-align: center;
          font-size: 28rpx;
        }
      }
    }
  }
}

// 志愿者证明
.prove {
  position: relative;
  top: -70rpx;
  width: 690rpx;
  margin: 0 auto;
  height: 160rpx;
  .prove-background {
    width: 690rpx;
    height: 160rpx;
  }
  .prove-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 690rpx;
    height: 160rpx;
    @include flexBlock(flex-start, row, center);
    box-sizing: border-box;
    padding: 30rpx;
    .prove-image {
      width: 90rpx;
      height: 90rpx;
      display: block;
      margin-right: 20rpx;
    }
    .prove-desc {
      font-size: 28rpx;
      color: #9B4A1D;
      width: 520rpx;
      line-height: 40rpx;
      font-weight: 600;
    }
  }
}

// 底部信息
.version-info {
  width: 100%;
  position: absolute;
  bottom: 170rpx;
  color: #ccc;
  font-size: 24rpx;
  text-align: center;
  view {
    margin-bottom: 8rpx;
  }
}
</style>