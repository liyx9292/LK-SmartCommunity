<template>
  <view class="body">
    <FamilyProgress :nowStep="nowStep" />

    <Step1 />
    <Tabbar />
  </view>
</template>
<script>
import FamilyProgress from '../../Components/FamilyProgress'
import Tabbar from '../../Components/Tabbar.Component'
import Step1 from './step1'
export default {
  components: {
    FamilyProgress,
    Tabbar,
    Step1
  },
  data() {
    return {
      nowStep: 1,
      
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  @include body();
  padding-bottom: 170rpx;
}
</style>