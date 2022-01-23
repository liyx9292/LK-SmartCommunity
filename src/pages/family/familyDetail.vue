<template>
  <scroll-view class="body" scoll-y :scroll-top="scrollTopNum" id="scrollBody">
    <template v-if="userInfo.is_manager === 1 || userInfo.is_manager === 2">
      <view >
        <FamilyProgress :nowStep="nowStep" />

        <template v-if="nowStep === 1">
          <Step1
            @nextStep="nextStep"
          />
        </template>

        <template v-if="nowStep === 2">
          <Step2
            @prevStep="prevStep"
            @nextStep="nextStep"
            @scrollTop="scrollTop"
          />
        </template>

        <template v-if="nowStep === 3">
          <Step3
            @prevStep="prevStep"
            @nextStep="nextStep"
            @returnIndex="returnIndex"
          />
        </template>
      </view>
    </template>
    <template v-else>
      <view class="family-container">
        <view class="user-item" v-for="(member, index) in familyInfo" :key="index">
          <view class="user-info">
            <view class="user-name">
              {{ member.uname }}
            </view>
            <view class="user-tel">
              {{ member.mobile }}
            </view>
          </view>
          <view class="user-id">
            {{ member.idCardNo }}
          </view>
        </view>
        <!-- 添加 -->
        <view class="increase-block">
          <view class="increase-item" @click="switchModal">
            <image class="increase-icon" src="/static/icons/icon_family_add.png" />
            <text>添加家庭成员信息</text>
          </view>
        </view>
      </view>
    </template>

    <Tabbar ref="tabbar"/>
  </scroll-view>
</template>
<script>
import { default as Constants } from '@/Utils/constants'
import FamilyProgress from '../../Components/FamilyProgress'
import Tabbar from '../../Components/Tabbar.Component'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'

const stepKeyValue = {
  step1Data: 1,
  step2Data: 2,
  step3Data: 3,
}
export default {
  components: {
    FamilyProgress,
    Tabbar,
    Step1,
    Step2,
    Step3,
  },
  data() {
    return {
      userInfo: {},
      familyInfo: [],
      scrollTopNum: -1,
      nowStep: 1,
      step1Data: {},
      step2Data: {},
      step3Data: {},
    }
  },
  onLoad() {
    let userInfo = this.utils.getStorage(Constants.USER_INFO)
    this.userInfo = userInfo
    if (userInfo.is_manager === 0) {
      this.familyInfo = userInfo.familyInfo || []
    }
  },
  methods: {
    nextStep(data, stepKey) {
      this[stepKey] = data
      let nowStepNum = stepKeyValue[stepKey]
      if (nowStepNum === 3) {
        // TODO: 3页数据完成提交
        let { oldList, warningList, is_empty_nest } = this.step3Data
        let step2Data = this.step2Data
        let step1Data = this.step1Data
        // 判断家庭组成员是否紧急和老人
        let familyMember = step2Data.familyMember
        let warningUser = {}
        familyMember.forEach((item, index) => {
            item.is_empty_nest = 0
          if (warningList.includes(index)) {
            item.attrType = 1 // 紧急联系人
            warningUser.contact = item.uname
            warningUser.telphone = item.mobile
          }
          if (oldList.includes(index)) {
            item.is_empty_nest = is_empty_nest
            item.attrType = 3
          }
        })
        familyMember.push(step2Data.ownerData)
        let params = {
          ...step1Data,
          ...warningUser,
          info: familyMember,
        }
        this.services.post('/familyAdd.html', params)
        .then(res => {
          this.utils.showToast('提交成功', 'sucess', () => {

          })
        })
      } else {
        this.nowStep = nowStepNum + 1
      }
    },
    prevStep() {
      this.nowStep = this.nowStep - 1
    },
    scrollTop(buttonHeight) {
      const query = uni.createSelectorQuery().in(this);
      query.select('#scrollBody').boundingClientRect(data => {
        console.log(data)
        // debugger
        // this.$emit('scrollTop', offsetTop + data.top)
        this.scrollTopNum = -buttonHeight
      }).exec();
    },
    returnIndex() {
      this.$refs.tabbar.switchPage({path: '/pages/index/index'})
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  @include body();
  padding-bottom: 120rpx;
  overflow: hidden;
}
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
}
</style>