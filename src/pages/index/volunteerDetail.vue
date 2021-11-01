<template>
  <view class="body">
    <SearchInput @submitSearch="submitSearch"/>
    <ActivityCard :isDuration="detail.isDuration" :activityItem="detail"/>
    <view class="activity-detail-container">
      <view class="activity-detail-bar" :class="{isDuration: detail.isDuration}">
        <template v-if="!detail.isDuration">
          <view class="detail-item">
            <view class="detail-item-label">
              总需(人)
            </view>
            <view class="detail-item-num">
              {{detail.need_hands}}
            </view>
          </view>
          <view class="detail-item">
            <view class="detail-item-label">
              报名(人)
            </view>
            <view class="detail-item-num">
              21
            </view>
          </view>
        </template>
        <template v-else>
          <view class="detail-item">
            <view class="detail-item-label">
              总需(人)
            </view>
            <view class="detail-item-num">
              {{detail.need_hands}}
            </view>
          </view>
          <view class="detail-item">
            <view class="detail-item-label">
              报名(人)
            </view>
            <view class="detail-item-num spacial-color">
              23
            </view>
          </view>
          <view class="detail-item">
            <view class="detail-item-label">
              打卡(人)
            </view>
            <view class="detail-item-num special-color">
              12
            </view>
          </view>
        </template>
      </view>
    </view>
    <template v-if="detail.isDuration">
      <view class="activity-status-container">
        <view class="activity-status-bar" v-if="noArriveList.length !== 0">
          <image class="activity-status-icon" src="/static/icons/icon_noArrive.png"/>
          未签到人员
        </view>
        <view class="list">
          <list>
            <cell v-for="item in noArriveList" :key="item">
              <view class="member-bar">
                <view class="member-name">
                  {{item.name}}
                </view>
                <view class="member-phone">
                  {{item.tel}}
                </view>
                <image class="member-image" src="/static/icons/icon_signIn.png" @click="handleSignIn(item)"/>
                <image class="member-image" src="/static/icons/icon_callPhone.png" @click="handlePhoneCall(item)"/>
              </view>
            </cell>
          </list>
        </view>
        <view class="activity-status-bar" v-if="arrivedList.length !== 0">
          <image class="activity-status-icon" src="/static/icons/icon_arrived.png"/>
          已签到人员
        </view>
        <view class="list">
          <list>
            <cell v-for="item in arrivedList" :key="item">
              <view class="member-bar">
                <view class="member-name">
                  {{item.name}}
                </view>
                <view class="member-phone">
                  {{item.tel}}
                </view>
                <image class="member-image" src="/static/icons/icon_signIn.png" />
                <image class="member-image" src="/static/icons/icon_callPhone.png" />
              </view>
            </cell>
          </list>
        </view>
      </view>
    </template>
  </view>
</template>
<script>
import ActivityCard from '../../Components/ActivityCard'
import SearchInput from '../../Components/SearchInput'
export default {
  components: {
    ActivityCard,
    SearchInput,
  },
  data() {
    return {
      pageLoading: false,
      detail: {
        isDuration: true,
      },
      noArriveList: [
        {name: '张三', tel: '13912402301'},
        {name: '李四', tel: '18145027492'},
        {name: '周祥', tel: '15682947650'},
        {name: '刘玉环', tel: '17328301265'},
      ],
      arrivedList: [
        {name: '孟展鸿', tel: '13984735932'},
        {name: '秦霄', tel: '15125938533'},
        {name: '黄光正', tel: '13825749304'},
        {name: '郭子良', tel: '17725748593'},
      ],
    }
  },
  onLoad(e) {
    this.id = e.id
    this.getDetail()
  },
  methods: {
    getDetail() {
      let params = {
        active_id: this.id
      }
      this.services.post('/getActInfo.html', params)
      .then(res => {
        let item = this.utils.getStorage('activeDetail')
        console.log(item)
        this.detail = item
      })
    },
    submitSearch(e) {
      console.log(e)
    },
    handleSignIn(id) {
      uni.showModal({
        title: '代签到',
        content: '是否代签到？',
        success: () => {
          console.log('成功')
        }
      })
    },
    handlePhoneCall() {
      console.log(1)
      uni.makePhoneCall({
        number: '12345678901'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  background: #f7f7f7;
  padding-bottom: 30rpx;
  min-height: 100vh;
}
// 报名人数
.activity-detail-container {
  width: 750rpx;
  background: #fff;
  box-sizing: border-box;
  padding: 30rpx;
  .activity-detail-bar {
    width: 100%;
    border-radius: 8rpx;
    @include flexBlock(space-between);
    background: #FFF5F5;
    padding: 25rpx 0;
    box-sizing: border-box;
    .detail-item {
      width: 200rpx;
      .detail-item-label {
        font-size: 26rpx;
        color: #999;
        text-align: center;
      }
      .detail-item-num {
        font-size: 48rpx;
        font-weight: 600;
        color: #1C89D6;
        width: 100%;
        text-align: center;
        margin-top: 15rpx;
      }
      .special-color {
        color: $basic-color;
      }
    }
    .isDuration {
      background: #F5FBFF;
    }
  }
}

.activity-status-container {
  width: 750rpx;
  .activity-status-bar {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 32rpx;
    color: #333;
    box-sizing: border-box;
    padding: 30rpx;
    overflow: hidden;
    .activity-status-icon {
      width: 32rpx;
      height: 32rpx;
      display: inline-block;
      margin-right: 12rpx;
    }
  }
  .list {
    width: 100%;
    padding: 17rpx 30rpx;
    background: #fff;
  }
  .member-bar {
    width: 100%;
    box-sizing: border-box;
    padding: 17rpx 0;
    @include flexBlock(flex-start, row, center);
    font-size: 30rpx;
    color: #333;
    background: #fff;
    .member-name {
      width: 130rpx;
      @include textOverflow();
      margin-left: 30rpx;
    }
    .member-phone {
      width: 220rpx;
      @include textOverflow();
      margin-right: 70rpx;
    }
    .member-image {
      margin-left: 50rpx;
      width: 70rpx;
      height: 70rpx;
    }
  }
}


</style>