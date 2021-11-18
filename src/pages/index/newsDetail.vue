<template>
  <view class="body">
    <view class="content">
      <rich-text :nodes="content" @click="clickPage"/>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      detail: {},
      content: '',
    }
  },
  onLoad() {
    let newsDetail = this.utils.getStorage('newsDetail')
    let newContent = newsDetail.content.replace(/\<img/gi, '<img style="width: 100%; height: auto" ')
    this.content = newContent
    this.detail = newsDetail
  },
  methods: {
    clickPage(e) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  width: 100%;
}
.content {
  width: 720rpx;
  margin: 0 auto;
}
</style>