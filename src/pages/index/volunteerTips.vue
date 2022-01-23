<template>
  <view class="modal-all" v-if="showModal">
    <view class="container">
      <view class="title">
        志愿服务办法
      </view>
      <view class="article-body">
        <view class="article-text">
          为进一步弘扬新民风，调动辖区党员、居民参与志愿服务的主动性，不断完善志愿服务工作制度，健全志愿服务回馈体系，推动社区志愿服务工作形成良性循环，实现志愿服务工作制度化、常态化，现结合实际，制定《长淮街道火车站社区志愿服务积分管理办法》（以下简称办法）。
        </view>
        <view class="article-lil-title">
          一、积分制度
        </view>
        <view class="article-text">
          1.对参与积分管理的社区志愿者及文明户每人（户）发放一本火车站社区《公益银行》存折，根据每季度文明户评选结果经公示无异议和对每次参与志愿服务活动后社区文明办负责人进行认定并进行记载，根据提供服务的时间、内容、质量等为志愿者量化积分。所得积分累计额可免费兑换或折扣享受相应的物资或相应的服务。
        </view>
        <view class="article-text">
          2.时间银行是储存志愿者身份信息、志愿服务备案记录和积分交易服务平台，志愿者可在火车站社区文明行为银行支行各兑换点进行兑换自己所需物品或服务。
        </view>
        <view class="article-text">
          3.所有户或个人的积分可用于兑换服务和物品，每次兑换时须按照积分兑换规则进行消分。“服务”是指由社区、志愿服务组织、社会组织、企业、合作商家等提供的服务。“物品”是指将积分以一分为一元抵用现金到社区文明行为银行物品兑换点随意兑换相应的物品，积分不够的费用由兑换者自行承担。
        </view>
        <view class="article-text">
          4.志愿者积分可实行家庭内部转移，如子女的积分可转移到父母的账户中，供父母享受积分兑换相应的服务或物资。
        </view>
        <view class="article-text">
          5.每一次志愿服务都需进行服务评价和监督评价，评价分为满意、基本满意、不满意三个等次，若志愿者在当次志愿服务过程当中未按执行标准服务他人，被评为不满意或导致他人投诉的，经志愿服务组织认定为志愿者本人责任的,该次志愿服务不予积分。
        </view>
        <view class="article-lil-title">
          二、适用范围
        </view>
        <view class="article-text">
          组织关系在本辖区的社区党员，来社区报到领岗的在职党员、所有热心公益事业的居民群众志愿者、社区各志愿服务组织等。
        </view>
        <view class="article-lil-title">
          三、实施流程
        </view>
        <view class="article-text">
          1.申请：凡是符合条件的志愿者，可来社区进行相应的基本信息登记。
        </view>
        <view class="article-text">
          2.认定：对拟参与积分管理的志愿者，经社区党委和社区文明实践站协商认定后，发放火车站社区《公益银行》存折。
        </view>
        <view class="article-text">
          3.积分：社区对照《办法》，对志愿者每次参与志愿服务情况进行登记，并记录相应的积分。
        </view>
        <view class="article-text">
          4.兑换：社区以月度优秀志愿者评选为契机，组织开展积分兑换，志愿者积分达到一定额度，可以携带积分兑换手册到社区超市自由选择自己想要的物品或者服务，积分不够的费用由兑换者自行承担。
        </view>
        <view class="article-text">
          4.兑换：社区以月度优秀志愿者评选为契机，组织开展积分兑换，志愿者积分达到一定额度，可以携带积分兑换手册到社区超市自由选择自己想要的物品或者服务，积分不够的费用由兑换者自行承担。
        </view>
        <view class="article-text">
          5.公示：坚持公开、公正、公平原则，每半年社区通过公开栏对所有参与志愿服务积分管理的志愿者积分及兑换情况进行公示，接受党员群众监督。
        </view>
        <view class="article-lil-title">
          四、不受理或暂缓受理情况
        </view>
        <view class="article-text">
          有下列情形之一者，不受理或暂缓受理。
        </view>
        <view class="article-text">
          1.当年有违法违纪行为，被上级党组织通报的
        </view>
        <view class="article-text">
          2.正在接受党组织和国家机关审查的
        </view>
        <view class="article-text">
          3.不按时交纳党费的
        </view>
        <view class="article-text">
          4.核实认为不适合参与该活动的其他情况
        </view>
      </view>
      <view class="group-button">
        <view class="button-item" @click="jumpPage(false)">
          拒绝
        </view>
        <view class="button-item agree" @click="jumpPage(true)">
          同意
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['jumpPage'],
  data() {
    return {

    }
  },
  methods: {
    jumpPage(bool) {
      this.$emit('jumpPage', bool)
    }
  }
}
</script>
<style lang="scss" scoped>
.modal-all {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .container {
    width: 720rpx;
    height: 80%;
    border-radius: 10rpx;
    background: #fff;
    margin: 0 auto;
    .title {
      width: 100%;
      font-size: 48rpx;
      font-weight: 600;
      color: #333;
      text-align: center;
      height: 80rpx;
      line-height: 80rpx;
    }
    .article-body {
      overflow: scroll;
      box-sizing: border-box;
      height: calc(100% - 160rpx);
      box-sizing: border-box;
      padding: 20rpx 20rpx;
      border-top: 1rpx solid #999;
      border-bottom: 1rpx solid #999;
      text-indent: 56rpx;
      font-size: 28rpx;
    }
    .group-button {
      width: 100%;
      height: 80rpx;
      display: flex;
      font-size: 40rpx;
      font-weight: 600;
      color: #333;
      .button-item {
        width: 50%;
        text-align: center;
        height: 80rpx;
        line-height: 80rpx;
      }
      .agree {
        color: $basic-color;
        border-left: 1rpx solid #999;
      }
    }
  }
}
</style>