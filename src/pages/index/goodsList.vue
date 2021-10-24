<template>
  <view class="body">
    <SearchInput @submitSearch="submitSearch" />
    
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
      list: [],
      searchText: '',
      shopId: null,
    }
  },
  onLoad(e) {
    this.shopId = e.shopId
    this.getGoodsList()
  },
  methods: {
    submitSearch(e) {
      this.searchText = e
    },
    getGoodsList() {
      let params = {
        shop_id: this.shopId,
        keys: this.searchText,
      }
      this.services.get('/getGoodsList.html', params)
      .then(res => {
        this.list = res
      })
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