<template>
  <view class="step-container">
    <view class="user-block" id="user-block">
      <view class="step-label">
        业主姓名
      </view>
      <view class="step-input-container">
        <input class="step-input" placeholder="请输入业主姓名" maxlength="10" v-model="inputName"/>
      </view>
      <!-- 选择性别 -->
      <view class="step-label">
        性别
      </view>
      <view class="sex-container">
        <view class="sex-item" :class="{actSex: inputGender === item.value}" v-for="item in gender" :key="item.value" @click="switchGender(item.value)">
          <image class="sex-image" :src="item.icon" />
          <text>{{item.label}}</text>
        </view>
      </view>
      <view class="step-label">
        身份证号码
      </view>
      <view class="step-input-container">
        <input class="step-input" placeholder="请输入身份证号码" v-model="inputId" maxlength="18" type="idcard"/>
      </view>
      <view class="step-label">
        手机号码
      </view>
      <view class="step-input-container">
        <input class="step-input" placeholder="请输入手机号码" v-model="inputTel" maxlength="11" type="number"/>
      </view>
      <view class="step-label">
        是否接种疫苗
      </view>
      <view class="sex-container">
        <view class="sex-item yimiao-item" :class="{actSex: inputYimiao === item.value}" v-for="item in yimiaoProgress" :key="item.value" @click="switchGender(item.value, 'inputYimiao')">
          <view>{{item.label}}</view>
        </view>
      </view>
      <view class="step-label">
        接种疫苗剂次
      </view>
      <view class="step-input-container">
        <input class="step-input" placeholder="请输入接种疫苗剂次" v-model="inputYimiaoDesc" maxlength="20"/>
      </view>

      <!-- 添加家庭成员列表 -->
      <view class="family-container">
        <view class="user-item" v-for="(member, index) in familyMember" :key="index">
          <view class="user-info">
            <view class="user-name">
              {{ member[modalDataKey.modalInputName.myKey] }}
            </view>
            <view class="user-tel">
              {{ member[modalDataKey.modalInputTel.myKey] }}
            </view>
          </view>
          <view class="user-id">
            {{ member[modalDataKey.modalInputId.myKey] }}
          </view>
          <image class="user-delete user-edit" src="/static/icons/icon_edit.png" @click="editMember(index)"/>
          <image class="user-delete" src="/static/icons/icon_delete.png" @click="deleteMember(index)"/>
        </view>
        <!-- 添加 -->
        <view class="increase-block">
          <view class="increase-item" @click="switchModal">
            <image class="increase-icon" src="/static/icons/icon_family_add.png" />
            <text>添加家庭成员信息</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 添加模态框 -->
    <view class="modal-block user-block" id="modal-block" v-if="showModal">
      <view class="step-label">
        成员姓名
      </view>
      <view class="step-input-container">
        <input class="step-input" placeholder="请输入业主姓名" v-model="modalInputName" maxlength="10"/>
      </view>
      <view class="step-label">
        性别
      </view>
      <view class="sex-container">
        <view class="sex-item" :class="{actSex: modalInputGender === item.value}" v-for="item in gender" :key="item.value" @click="switchGender(item.value, 'modalInputGender')">
          <image class="sex-image" :src="item.icon" />
          <view>{{item.label}}</view>
        </view>
      </view>
      <view class="step-label">
        手机号码
      </view>
      <view class="step-input-container">
        <input class="step-input" placeholder="请输入手机号码" v-model="modalInputTel" type="number" maxlength="11"/>
      </view>
      <view class="step-label">
        身份证号
      </view>
      <view class="step-input-container">
        <input class="step-input" placeholder="请输入身份证号" v-model="modalInputId" type="idcard" maxlength="18"/>
      </view>
      <view class="step-label">
        是否接种疫苗
      </view>
      <view class="sex-container">
        <view class="sex-item yimiao-item" :class="{actSex: modalInputYimiao === item.value}" v-for="item in yimiaoProgress" :key="item.value" @click="switchGender(item.value, 'modalInputYimiao')">
          <view>{{item.label}}</view>
        </view>
      </view>
      <view class="step-label">
        接种疫苗剂次
      </view>
      <view class="step-input-container">
        <input class="step-input" placeholder="请输入接种疫苗剂次" v-model="modalInputYimiaoDesc" maxlength="20"/>
      </view>
      <button class="modal-button" @click="confirmAddUser">添加成员</button>
    </view>

    <view class="button-group" id="button-group">
      <view class="button-item" @click="prevStep">
        上一步
      </view>
      <view class="button-item next-button" @click="nextStep">
        下一步
      </view>
    </view>
  </view>
</template>
<script>
import { default as Constants } from '@/Utils/constants'
const modalDataKey = {
  modalInputName: { myKey: 'uname', label: '姓名' },
  modalInputGender: { myKey: 'sex', label: '性别' },
  modalInputTel: { myKey: 'mobile', label: '电话号码' },
  modalInputId: { myKey: 'idCardNo', label: '身份证号' },
  modalInputYimiao: { myKey: 'is_vacc', label: '接种疫苗' },
  modalInputYimiaoDesc: { myKey: 'vacc_times', label: '接种备注' },
}
let buttonHeight = 0
export default {
  emits: ['nextStep', 'prevStep', 'scrollTop'],
  data() {
    return {
      modalDataKey,
      gender: [
        { label: '男性', icon: '/static/family/family_male.png', value: '1' },
        { label: '女性', icon: '/static/family/family_female.png', value: '2' },
      ],
      yimiaoProgress: [
        { label: '已接种', value: 1 },
        { label: '未接种', value: 0 },
      ],
      inputName: '',
      inputGender: '',
      inputTel: '',
      inputId: '',
      inputYimiao: '',
      inputYimiaoDesc: '',
      nowSex: '1',
      showModal: false,
      familyMember: [],
      modalInputName: '',
      modalInputGender: '',
      modalInputTel: '',
      modalInputId: '',
      modalInputYimiao: '',
      modalInputYimiaoDesc: '',
      editIndex: null,
    }
  },
  mounted() {
    const query = uni.createSelectorQuery().in(this);
    query.select('#button-group').boundingClientRect(data => {
      buttonHeight = data.height
    }).exec();
    this.init()
  },
  methods: {
    init() {
      let step2Data = this.utils.getStorage(Constants.STEP2DATA)
      console.log('初始化step2', step2Data)
      if (step2Data) {
        this.familyMember = step2Data.familyMember || []
        let ownerData = step2Data.ownerData
        for (let inputKey in modalDataKey) {
          let keyName = modalDataKey[inputKey].myKey
          inputKey = inputKey.substring(5, inputKey.length)
          inputKey = inputKey.replace('I', 'i')
          this[inputKey] = ownerData[keyName]
        }
      }
    },
    nextStep() {
      let ownerData = this.inputRealData
      let result = this.validateUser(ownerData)
      if (!result.isPass) {
        if (result.errMsg) {
          uni.showToast({
            title: result.errMsg,
            icon: 'error',
            mask: true,
          })
        }
        return
      }
      if (this.familyMember.length === 0) {
        this.utils.showModal('信息不足','至少要有一位家庭成员')
        return
      }
      let step2Data = { ownerData, familyMember: this.familyMember }
      this.utils.setStorage(Constants.STEP2DATA, step2Data)
      this.$emit('nextStep', step2Data, 'step2Data')
    },
    prevStep() {
      this.$emit('prevStep')
    },
    switchGender(e, key) {
      if (key) {
        this[key] = e
      } else {
        this.inputGender = e
      }
    },
    switchModal(e) {
      let { offsetTop } = e.target
      let showValue = this.showModal
      this.showModal = !showValue
      if (showValue) return
      this.$emit('scrollTop', buttonHeight)

    },
    defaultModalData() {
      for (let i in modalDataKey) {
        this[i] = ''
      }
    },
    confirmAddUser() {
      let data = this.modalRealData
      let result = this.validateUser(data)
      if (!result.isPass) {
        if (result.errMsg) {
          uni.showToast({
            title: result.errMsg,
            icon: 'error',
            mask: true,
          })
        }
        return
      }
      data.attrType = 1
      if (this.editIndex || this.editIndex === 0) {
        this.deleteMember(this.editIndex)
      }
      this.familyMember.push(data)
      this.showModal = false
      this.editIndex = null
      this.defaultModalData()
    },
    validateUser(data, pretext = '') {
      let isPass = true
      let errMsg = ''
      for (let i in modalDataKey) {
        let keyName = modalDataKey[i].myKey
        let label = modalDataKey[i].label
        switch(i) {
          case 'tel':
            let res = this.reg.validateTel(data[keyName])
            if (!res) isPass = false
            if (!data[keyName]) {
              isPass = false
              errMsg = `${pretext}${label}不能空`
            }
          default:
            let value = data[keyName]
            if (!value && value !== 0) {
              isPass = false
              errMsg = `${pretext}${label}不能空`
            }
        }
      }
      return {isPass , errMsg}
    },
    deleteMember(index) {
      let memberArr = this.familyMember
      memberArr.splice(index, 1)
      this.familyMember = memberArr
    },
    editMember(index) {
      let memberItem = this.familyMember[index]
      for (let i in modalDataKey) {
        let keyName = modalDataKey[i].myKey
        this[i] = memberItem[keyName]
      }
      this.showModal = true
      this.editIndex = index
    }
  },
  computed: {
    modalRealData() {
      let realData = {}
      for (let i in modalDataKey) {
        let keyName = modalDataKey[i].myKey
        realData[keyName] = this[i]
      }
      realData.attrType = 2
      return realData
    },
    inputRealData() {
      let realData = {}
      for (let i in modalDataKey) {
        let keyName = modalDataKey[i].myKey
        let inputKey = i
        inputKey = inputKey.substring(5, inputKey.length)
        inputKey = inputKey.replace('I', 'i')
        realData[keyName] = this[inputKey]
      }
      return realData
    },
  }
}
</script>
<style lang="scss" scoped>
.step-container {
  width: 100%;
  box-sizing: border-box;
  // height: calc(100vh - 380rpx);
  // overflow: hidden;
  .user-block {
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    padding: 25rpx 30rpx 100rpx 30rpx;
    margin-top: 10rpx;
  }
  .step-label {
    font-size: 30rpx;
    font-weight: 500;
    color: #333333;
    margin-bottom: 35rpx;
  }
  .step-input-container {
    width: 100%;
    border-radius: 8rpx;
    border: 1rpx solid #ccc;
    box-sizing: border-box;
    padding: 35rpx 30rpx;
    margin-bottom: 35rpx;
    .step-input {
      width: 100%;
      font-size: 30rpx;
      color: #333;
    }
  }
  .sex-container {
    width: 100%;
    margin-bottom: 35rpx;
    display: flex;
    .sex-item {
      width: 280rpx;
      height: 100rpx;
      border-radius: 50rpx;
      margin-right: 50rpx;
      box-sizing: border-box;
      padding: 0 10rpx;
      @include flexBlock(flex-start, row, center);
      font-size: 30rpx;
      color: #333;
      border: 1rpx solid #ccc;
      .sex-image {
        width: 80rpx;
        height: 80rpx;
        display: block;
        margin-right: 20rpx;
      }
    }
    .yimiao-item {
      justify-content: center;
    }
    .actSex {
      border-color: $basic-color;
      color: #fff;
      background: $basic-color;
    }
  }
  // 添加家庭成员
  .family-container {
    width: 100%;
    border: 1rpx dotted $basic-color;
    box-sizing: border-box;
    padding: 35rpx 20rpx;
    background: #FFE7E8;
    margin-top: 15rpx;
    .user-item {
      width: 100%;
      background: $basic-color;
      color: #fff;
      box-sizing: border-box;
      padding: 30rpx;
      font-size: 30rpx;
      position: relative;
      margin-bottom: 20rpx;
      border-radius: 10rpx;
      .user-info {
        display: flex;
        .user-name {
          width: 120rpx;
          margin-right: 15rpx;
          @include textOverflow();
        }
      }
      .user-id {
        margin-top: 10rpx;
        width: 100%;
      }
      .user-delete {
        width: 42rpx;
        height: 42rpx;
        position: absolute;
        right: 30rpx;
        top: 40rpx;
      }
      .user-edit {
        width: 42rpx;
        height: 42rpx;
        position: absolute;
        right: 80rpx;
        top: 40rpx;
      }
    }

    .increase-block {
      width: 100%;
      box-sizing: border-box;
      padding: 60rpx 135rpx;
      .increase-item {
        border-radius: 20rpx;
        background: $basic-color;
        width: 100%;
        @include flexBlock(flex-start, row, center);
        color: #fff;
        font-size: 32rpx;
        font-weight: 600;
        box-sizing: border-box;
        padding: 22rpx 30rpx;
        .increase-icon {
          width: 35rpx;
          height: 35rpx;
          display: block;
          margin-right: 10rpx;
        }
      }
    }
  }

  .button-group {
    width: 100%;
    background: #fff;
    @include flexBlock(space-between);
    padding: 30rpx 30rpx 30rpx 30rpx;
    box-sizing: border-box;
    margin-top: 10rpx;
    .button-item {
      width: 330rpx;
      height: 100rpx;
      background: #CCCCCC;
      border-radius: 20rpx;
      text-align: center;
      line-height: 100rpx;
      font-size: 32rpx;
      color: #fff;
    }
    .next-button {
      background: $basic-color;
    }
  }

  .modal-block {
    margin-top: 10rpx;
    .modal-button {
      width: 330rpx;
      height: 100rpx;
      line-height: 100rpx;
      color: #fff;
      background: $basic-color;
      margin-top: 40rpx;
    }
  }
}
</style>