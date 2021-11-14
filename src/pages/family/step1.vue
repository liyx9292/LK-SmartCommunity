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
          range-key="name"
        >
          <text>{{communityList[communityIndex].name}}</text>
        </picker>
        <image class="select-arrow" src="/static/icons/family_downArrow.png" />
      </view>
    </view>

    <view class="form-item">
      <view class="form-item-label">
        所住楼栋
      </view>
      <view class="form-item-container">
        <picker
          class="form-item-select"
          mode="selector"
          @change="bindBuildChange"
          :range="buildList"
          :value="buildIndex"
          range-key="quartersName"
        >
          <text>{{buildList[buildIndex].quartersName}}</text>
        </picker>
        <image class="select-arrow" src="/static/icons/family_downArrow.png" />
      </view>
    </view>

    <view class="form-item" v-for="item in inputList" :key="item.keyName">
      <view class="form-item-label">
        {{ item.text }}
      </view>
      <view class="form-item-container">
        <picker class="form-item-input" :mode="item.label === 'unit' ? 'selector' : 'multiSelector' " :range="buildTree[`${item.label}NumArr`]" @change="e => pickerChange(e, item.label)" :disabled="![`${item.label}Num`]" :value="[`${item.label}Value`]">
          {{ inputData[`${item.label}Value`] || '请选择' }}
        </picker>
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
  // { label: 'build', keyName: 'buildNumber', palceholder: '请输入楼栋号', text: '所住楼栋', endText: '号楼' },
  { label: 'unit', keyName: 'unitNumber', palceholder: '请输入单元号', text: '所住单元', endText: '单元' },
  { label: 'room', keyName: 'houseNumber', palceholder: '请输入房间号', text: '房间号', endText: '室' },
]
export default {
  props: {
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
      communityList: [],
      buildIndex: 0,
      buildList: [],
      inputData: {
        buildValue: null,
        unitValue: null,
        roomValue: null,
      },
      focusInputKey: '',
      unitNum: null,
      floorNum: null,
      roomNum: null,
      unitValue: null,
      roomValue: null,
    }
  },
  computed: {
    buildTree() {
      let obj = {}
      obj.unitNumArr = this.unitNum ? this.getNumberArr(this.unitNum) : []
      let roomArr = this.roomNum ? this.getNumberArr(this.roomNum, true) : []
      let floorArr = this.floorNum ? this.getNumberArr(this.floorNum) : []
      obj.roomNumArr = [floorArr, roomArr]
      return obj
    }
  },
  mounted() {
    this.getCommunityList()
  },
  methods: {
    getCommunityList() {
      this.services.get(`/getBuildingList.html?pid=0`)
      .then(res => {
        let data = res.data
        data.forEach(item => {
          item.name = item.quartersName
        })
        this.communityList = data
        let firstId = data[0] && data[0].id
        if (firstId) this.getBuildList(firstId)
      })
    },
    getBuildList(id) {
      this.services.get(`/getBuildingList.html?pid=${id}`)
      .then(res => {
        let data = res.data
        this.buildList = data
        this.bindBuildChange({ detail: { value: 0 }})
      })
    },
    input(e, keyName) {
      this.inputData[keyName] = e.detail.value
    },
    focusInput(keyName = '') {
      this.focusInputKey = keyName
    },
    bindPickerChange(e) {
      let index = e.detail.value
      let item = this.communityList[index]
      this.communityIndex = index
      this.getBuildList(item.id)
    },
    pickerChange(e, label) {
      let arr = this.buildTree[`${label}NumArr`]
      let value = null
      if (label === 'unit') {
        let index = parseInt(e.detail.value)
        value = arr[index]
      } else if (label === 'room') {
        let [floorIndex, roomIndex] = e.detail.value
        let floorValue = arr[0][floorIndex]
        let roomValue = arr[1][roomIndex]
        value = `${floorValue}${roomValue}`
      }
      this.inputData[`${label}Value`] = value
    },
    bindBuildChange(e) {
      let index = e.detail.value
      let item = this.buildList[index]
      this.buildIndex = index
      this.unitNum = item.units
      this.roomNum = item.household
      this.floorNum = item.floors
      this.inputData = {
        ...this.inputData,
        buildValue: item.quartersName
      }
    },
    next() {
      try {
        let inputData = this.inputData
        let params = this.validator(inputData)
        params.quartersName = this.communityList[this.communityIndex].quartersName
        params.buildNumber = this.buildList[this.buildIndex].quartersName
        this.$emit('nextStep', params, 'step1Data')
      } catch (e) {
        uni.showModal({
          title: '数据不完整',
          content: `请将${e.text}填写完整`,
          showCancel: false,
        })
      }
    },
    validator(inputData) {
      let obj = {}
      for(let i = 0 ; i < form_keyValue.length; i++) {
        let label = `${form_keyValue[i].label}Value`;
        let data = inputData[label]
        if (!data) {
          throw form_keyValue[i]
        }
        obj[form_keyValue[i].keyName] = data
      }

      return obj
    },
    getNumberArr(num, addZero = false) {
      let arr = []
      for(let i = 1; i <= num; i++) {
        let num = i
        if (addZero) {
          num < 10 ? num = `0${num}` : null
        }
        arr.push(num)
      }
      return arr
    }
  },
  watch: {
    step1Data: (newValue, oldValue) => {

    },
    communityIndex() {
      this.inputData = {
        buildValue: null,
        unitValue: null,
        roomValue: null,
      }
      this.buildIndex = null
    },
    buildIndex() {
      this.inputData = {
        ...inputData,
        unitValue: null,
        roomValue: null,
      }
      this.unitValue = null
      this.roomValue = null
    },
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
        width: 500rpx
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