<template>
  <view class="body">
    <FamilyProgress :nowStep="nowStep" />

    <template v-if="nowStep === 1">
      <Step1
        :communityList="communityList"
        @nextStep="nextStep"
      />
    </template>

    <template v-if="nowStep === 2">
      <Step2
        @prevStep="prevStep"
        @nextStep="nextStep"
      />
    </template>

    <template v-if="nowStep === 3">
      <Step3
        @prevStep="prevStep"
        @nextStep="nextStep"
      />
    </template>



    <Tabbar />
  </view>
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
      nowStep: 1,
      communityList: [1,2,2,2,1,1],
      step1Data: {},
      step2Data: {},
    }
  },
  methods: {
    test() {
      this.communityList = [1,2,3,4,5]
    },
    nextStep(data, stepKey) {
      this[stepKey] = data
      let nowStepNum = stepKeyValue[stepKey]
      if (nowStepNum === 3) {
        // TODO: 3页数据完成提交
      } else {
        this.nowStep = nowStepNum + 1
      }
    },
    prevStep() {
      this.nowStep = this.nowStep - 1
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  @include body();
  padding-bottom: 120rpx;
}
</style>