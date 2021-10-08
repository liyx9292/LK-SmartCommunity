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

    <Tabbar/>
  </view>
</template>
<script>
import SearchInput from '../../Components/SearchInput'
import GoodsItem from '../../Components/GoodsItem'
import Tabbar from '../../Components/Tabbar.Component'
export default {
  components: {
    SearchInput,
    GoodsItem,
    Tabbar,
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
  padding-bottom: 180rpx;
}
.list {
  width: 720rpx;
  margin-left: 30rpx;
}
</style>