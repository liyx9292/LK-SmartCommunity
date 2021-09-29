<template>
  <view class="body">
    <FamilyProgress :nowStep="nowStep" />

    <template v-if="nowStep === 1">
      <Step1 
        :communityList="communityList"
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

const stepKeyValue = {
  step1Data: 1,
  step2Data: 2,
  step3Data: 3,
}
export default {
  components: {
    FamilyProgress,
    Tabbar,
    Step1
  },
  data() {
    return {
      nowStep: 1,
      communityList: [1,2,2,2,1,1],
      step1Data: {},
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