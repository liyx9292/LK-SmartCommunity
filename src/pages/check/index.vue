<template>
  <view class="body">
    <SearchInput @submitSearch="submitSearch"/>
    
    <!-- 列表 -->
    <view class="list">
      <list>
        <cell v-for="item in list" :key="item">
          <GoodsItem :goodsItem="item" goodsType="check"/>
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
      list: [],
      searchText: '',
    }
  },
  onLoad() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      let params = {
        shop_id: 7,
        keys: this.searchText,
      }
      this.services.get('/getGoodsList.html', params)
      .then(res => {
        this.list = res
      })
    },
    submitSearch(e) {
      this.searchText = e
      this.getGoodsList()
    },
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