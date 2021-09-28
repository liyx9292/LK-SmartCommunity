<template>
  <view class="body">
    <view class="top-tab">
      <view class="top-tab-item"
        v-for="item in tabList"
        :key="item"
        :class="{activeTab: nowTab === item}"
        @click="switchTab(item)"
      >
        {{ item === 'applying' ? '招募中' : '已报名' }}
      </view>
    </view>
    <!-- 招募中 -->
    <template v-if="nowTab === 'applying'">
      <view class="top-container">
        <view class="search-container">
          <view class="input-placeholder" :style="{display: (isFocusSearch || firstSearchText !== '') ? 'none' : 'flex'}">
            <image src="/static/icons/icon_search.png"/>
            <text>请输入内容</text>
          </view>
          <input class="search-input" @focus="focusSearch" @blur="blurSearch" @confirm="submitSearch" @input="e => inputSearch(e, 'firstSearchText')"/>
        </view>
        <view class="tag-container">
          <view class="tag-item" v-for="item in tags" :key="item">
            {{ item }}
          </view>
        </view>
      </view>
      <!-- 列表 -->
      <list class="list">
        <cell v-for="item in applyingList" :key="item">
          <ActivityCard />
        </cell>
      </list>
    </template>

    <!-- 已报名 -->
    <template v-if="nowTab === 'applyed'">
      <view class="top-container">
        <view class="search-container">
          <view class="input-placeholder" :style="{display: (isFocusSearch || firstSearchText !== '') ? 'none' : 'flex'}">
            <image src="/static/icons/icon_search.png"/>
            <text>请输入内容</text>
          </view>
          <input class="search-input" @focus="focusSearch" @blur="blurSearch" @confirm="submitSearch" @input="e => inputSearch(e, 'secondSearchText')"/>
        </view>
      </view>
      <!-- 进行中列表 -->
      <view class="activity-status-container">
        <view class="activity-status-bar">
          <image class="activity-status-icon" src="/static/icons/icon_activityDuration.png"/>
          进行中
        </view>
        <list class="list">
          <cell v-for="item in applyingList" :key="item">
            <ActivityCard :isDuration="true" />
          </cell>
        </list>
      </view>
      <!-- 已结束列表 -->
      <view class="activity-status-container">
        <view class="activity-status-bar">
          <image class="activity-status-icon" src="/static/icons/icon_timeFinished.png"/>
          已完成
        </view>
        <list class="list">
          <cell v-for="item in applyingList" :key="item">
            <ActivityCard :isFinished="true" />
          </cell>
        </list>
      </view>
    </template>
  </view>
</template>
<script>
import ActivityCard from '../../Components/ActivityCard'
const TAG_HISTORIES = 'tag_histories'
export default {
  // TODO: 搜索栏下面的tag从哪里获取 历史记录
  // TODO: 该做已报名， 同时完善公共组件
  components: {
    ActivityCard,
  },
  data() {
    return {
      pageLoading: false,
      tabList: ['applying', 'applyed'],
      nowTab: 'applying',
      tags: [],
      firstSearchText: '',
      secondSearchText: '',
      applyingList: [1,2,3,4],
      isFocusSearch: false, // 是否先是搜索栏字体
    }
  },
  onLoad() {
    this.getTags()
  },
  methods: {
    switchTab(value) {
      if (value === this.nowTab || this.pageLoading) return
      this.nowTab = value
    },
    focusSearch() {
      this.isFocusSearch = true
    },
    blurSearch() {
      this.isFocusSearch = false
    },
    inputSearch(e, key) {
      this[key] = e.detail.value
    },
    submitSearch(e) {
      let value = e.detail.value
      // TODO: 接口

      this.saveTags(value)
      this.getTags()
    },
    getTags() {
      let tags = this.utils.getStorage(TAG_HISTORIES) || []
      this.tags = tags
    },
    saveTags(data) {
      let tags = this.utils.getStorage(TAG_HISTORIES) || []
      let isFindIndex = tags.findIndex(item => item === data)
      if (tags.length >= 8 && isFindIndex === -1) {
        tags.splice(tags.length - 1, 1)
      } else if (isFindIndex>= 0) {
        tags.splice(isFindIndex, 1)
      }
      tags.unshift(data)
      this.utils.setStorage(TAG_HISTORIES, tags)
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  width: 100%;
  min-height: 100vh;
  background: #f7f7f7;
  padding-top: 90rpx;
  position: relative;
}
.top-tab {
  width: 100%;
  background: #fff;
  height: 90rpx;
  box-sizing: border-box;
  padding: 0 100rpx;
  @include flexBlock(space-between);
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  .top-tab-item {
    width: 150rpx;
    height: 90rpx;
    position: relative;
    color: #999;
    font-size: 32rpx;
    line-height: 90rpx;
    text-align: center;
  }
  .activeTab {
    color: $basic-color;
    &::after {
      content: '';
      position: absolute;
      bottom: -3rpx;
      width: 50rpx;
      height: 6rpx;
      background: $basic-color;
      left: 50rpx;
      border-radius: 3rpx;
    }
  }
}
// 招募中
.top-container {
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 20rpx 0rpx 20rpx 30rpx;
  .search-container {
    width: 690rpx;
    height: 80rpx;
    border-radius: 8rpx;
    background: #f7f7f7;
    box-sizing: border-box;
    padding: 24rpx;
    position: relative;
    .input-placeholder {
      margin: 0 auto;
      width: 200rpx;
      display: flex;
      align-items: center;
      font-size: 28rpx;
      color: #999;
      image {
        width: 34rpx;
        height: 34rpx;
        display: inline-block;
        margin-right: 10rpx;
      }
    }
    .search-input {
      width: 100%;
      font-size: 28rpx;
      color: #333;
      position: absolute;
      left: 24rpx;
      top: 22rpx;
    }
  }
  .tag-container {
    width: 705rpx;
    .tag-item {
      display: inline-block;
      margin-right: 15rpx;
      padding: 10rpx 20rpx;
      font-size: 28rpx;
      background: #FFEDEE;
      opacity: 0.5;
      color: $basic-color;
      margin-top: 20rpx;
      border-radius: 8rpx;
    }
  }
}

// 已报名
.activity-status-container {
  width: 750rpx;
  .activity-status-bar {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 32rpx;
    color: #333;
    box-sizing: border-box;
    padding: 30rpx 30rpx 10rpx 30rpx;
    .activity-status-icon {
      width: 32rpx;
      height: 32rpx;
      display: inline-block;
      margin-right: 12rpx;
    }
  }
}
</style>