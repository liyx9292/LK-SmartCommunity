<template>
  <view class="step1-container">
    
    <view class="form-item">
      <view class="form-item-label">
        所住小区
      </view>
      <view class="form-item-container">
        <picker class="form-item-select" @change="bindPickerChange" :value="index" :range="communityList">
          <view class="uni-input">{{array[index]}}</view>
        </picker>
        <image class="select-arrow" src="/static/icons/family_downArrow.png" />
      </view>
    </view>

    <view class="form-item">
      <view class="form-item-label">
        所住楼栋
      </view>
      <view class="form-item-container">
        <input class="form-item-input" placeholder="请输入楼栋号"/>
        <view class="input-end">
          号楼
        </view>
      </view>
    </view>

    <view class="form-item">
      <view class="form-item-label">
        所住单元
      </view>
      <view class="form-item-container">
        <input class="form-item-input" placeholder="请输入单元号"/>
        <view class="input-end">
          单元
        </view>
      </view>
    </view>

    <view class="form-item">
      <view class="form-item-label">
        房间号
      </view>
      <view class="form-item-container">
        <input class="form-item-input" placeholder="请输入房间号"/>
        <view class="input-end">
          室
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    communityList: {
      type: Array,
      default: [],
    },

  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.step1-container {
  width: 100%;
  background: #fff;
  padding: 25rpx 30rpx;
  box-sizing: border-box;
  margin-top: 10rpx;
  .form-item {
    width: 100%;
    margin-bottom: 35rpx;
    .form-item-label {
      font-size: 30rpx;
      color: #333;
    }
    .form-item-container {
      width: 100%;
      height: 100rpx;
      margin-top: 35rpx;
      border-radius: 8rpx;
      border: 1rpx solid #ccc;
      position: relative;
      box-sizing: border-box;
      padding: 0 30rpx;
      font-size: 30rpx;
      color: #333;
      @include flexBlock(space-between, row, center);
      .form-item-select {
        height: 100rpx;
        line-height: 100rpx;
        width: 100%;
      }
      .select-arrow {
        position: absolute;
        width: 30rpx;
        height: 18rpx;
        top: 41rpx;
        right: 30rpx;
        z-index: 2;
      }
      .form-item-input {
        
      }
    }
  }
}
</style>