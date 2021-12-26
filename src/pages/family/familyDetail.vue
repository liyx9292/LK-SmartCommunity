<template>
  <scroll-view class="body" scoll-y :scroll-top="scrollTopNum" id="scrollBody">
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



    <Tabbar ref="tabbar"/>
  </scroll-view>
</template>
<script>
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
      scrollTopNum: -1,
      nowStep: 1,
      step1Data: {},
      step2Data: {},
      step3Data: {},
    }
  },
  onLoad() {

  },
  methods: {
    nextStep(data, stepKey) {
      this[stepKey] = data
      let nowStepNum = stepKeyValue[stepKey]
      if (nowStepNum === 3) {
        // TODO: 3页数据完成提交
        let { oldList, warningList } = this.step3Data
        let step2Data = this.step2Data
        let step1Data = this.step1Data
        // 判断家庭组成员是否紧急和老人
        let familyMember = step2Data.familyMember
        let warningUser = {}
        familyMember.forEach((item, index) => {
          if (warningList.includes(index)) {
            item.attrType = 1 // 紧急联系人
            warningUser.contact = item.uname
            warningUser.telphone = item.mobile
          }
          if (oldList.includes(index)) {
            item.attrType = 3
          }
        })
        familyMember.push(step2Data.ownerData)
        let params = {
          ...step1Data,
          ...warningUser,
          info: familyMember
        }
        this.services.post('/familyAdd.html', params)
        .then(res => {
          console.log(res)
          debugger
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
</style>