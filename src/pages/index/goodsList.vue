<template>
  <view class="body">
    <SearchInput />
    
    <!-- 列表 -->
    <view class="list">
      <list>
        <cell v-for="item in list" :key="item">
          <GoodsItem />
        </cell>
      </list>
    </view>
  </view>
</template>
<script>
import SearchInput from '../../Components/SearchInput'
import GoodsItem from '../../Components/GoodsItem'
export default {
  components: {
    SearchInput,
    GoodsItem,
  },
  data() {
    return {
      pageLoading: false,
      list: [1,1,1,1,1,1],
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  padding-bottom: 50rpx;
}
.list {
  width: 720rpx;
  margin-left: 30rpx;
}
</style>