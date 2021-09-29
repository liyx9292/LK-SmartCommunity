<template>
  <view class="step1-container">
    
    <view class="form-item">
      <view class="form-item-label">
        所住小区
      </view>
      <view class="form-item-container">
        <picker
          class="form-item-select"
          mode="selector"
          @change="bindPickerChange"
          :range="communityList"
          :value="communityIndex"
        >
          <text>{{communityList[communityIndex]}}</text>
        </picker>
        <image class="select-arrow" src="/static/icons/family_downArrow.png" />
      </view>
    </view>

    <view class="form-item" v-for="item in inputList" :key="item.keyName">
      <view class="form-item-label">
        {{ item.text }}
      </view>
      <view class="form-item-container" :class="{focusInput: focusInputKey === item.keyName}">
        <input class="form-item-input" :placeholder="item.placeholder" v-model="inputData[item.keyName]" @focus="focusInput(item.keyName)" @blur="focusInput('')"/>
        <view class="input-end">
          {{ item.endText }}
        </view>
      </view>
    </view>

    <button class="nextButton" @click="next">下一步</button>
  </view>
</template>
<script>
const form_keyValue = [
  { label: 'build', keyName: 'build', palceholder: '请输入楼栋号', text: '所住楼栋', endText: '号楼' },
  { label: 'unit', keyName: 'unit', palceholder: '请输入单元号', text: '所住单元', endText: '单元' },
  { label: 'room', keyName: 'room', palceholder: '请输入房间号', text: '房间号', endText: '室' },
]
export default {
  props: {
    communityList: {
      type: Array,
      default: [],
    },
    step1Data: {
      type: Object,
      default: {}
    }
  },
  emits: ['nextStep'],
  data() {
    return {
      inputList: form_keyValue,
      communityIndex: 0,
      inputData: {},
      focusInputKey: '',
    }
  },
  methods: {
    bindPickerChange(e) {
      console.log(e)
    },
    input(e, keyName) {
      this.inputData[keyName] = e.detail.value
    },
    focusInput(keyName = '') {
      this.focusInputKey = keyName
    },
    next() {
      try {
        let inputData = this.inputData
        this.validator(inputData)
        this.$emit('nextStep', inputData, 'step1Data')
      } catch (e) {
        uni.showModal({
          title: '数据不完整',
          content: `请将${e.text}填写完整`,
          showCancel: false,
        })
      }
    },
    validator(inputData) {
      for(let i = 0 ; i < form_keyValue.length; i++) {
        let keyName = form_keyValue[i].keyName;
        if (!inputData[keyName]) {
          throw form_keyValue[i]
        }
      }
    }
  },
  watch: {
    communityList: (newValue, oldValue) => {
      console.log('---test---')
      console.log(newValue)
    },
    step1Data: (newValue, oldValue) => {

    }
  }
}
</script>
<style lang="scss" scoped>
.step1-container {
  width: 100%;
  background: #fff;
  padding: 25rpx 30rpx 50rpx 30rpx;
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
    .focusInput {
      box-shadow: 0rpx 0rpx 4rpx $basic-color;
      border-color: $basic-color;
    }
  }
}

.nextButton {
  background: $basic-color;
  font-size: 32rpx;
  color: #fff;
}
</style>