<template>
  <view class="top-container">
    <view class="search-container">
      <view class="input-placeholder" :style="{display: (isFocusSearch || searchText !== '') ? 'none' : 'flex'}">
        <image src="/static/icons/icon_search.png"/>
        <text>{{placeholder}}</text>
      </view>
      <input class="search-input" @focus="focusSearch" @blur="blurSearch" @confirm="submitSearch" v-model="searchText" @input="e => inputSearch(e, 'secondSearchText')"/>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入内容',
    },
  },
  emits: ['submitSearch'],
  data() {
    return {
      searchText: '',
      isFocusSearch: false,
    }
  },
  methods: {
    focusSearch() {
      this.isFocusSearch = true
    },
    blurSearch() {
      this.isFocusSearch = false
    },
    inputSearch(e, key = 'searchText') {
      this[key] = e.detail.value
    },
    submitSearch(e) {
      let value = e.detail.value
      this.$emit('submitSearch', value)
    }
  }
}
</script>
<style lang="scss" scoped>
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
}
</style>