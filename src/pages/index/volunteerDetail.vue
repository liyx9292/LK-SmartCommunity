<template>
  <view class="body">
    <template v-if="detail.active_id">
      <!-- <SearchInput @submitSearch="submitSearch" v-if="nowTab === 'applyed'"/> -->
      <ActivityCard :isDuration="detail.isDuration" :activityItem="detail" :isDetail="true" />
      <view class="activity-detail-container">
        <view class="activity-detail-bar" :class="{isDuration: detail.is_active === 1 && nowTab === 'applyed'}">
          <template v-if="detail.is_active !== 1 || nowTab !== 'applyed'">
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
                {{ detail.userList.length || 0 }}
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
                {{ detail.userList.length || 0 }}
              </view>
            </view>
            <view class="detail-item">
              <view class="detail-item-label">
                打卡(人)
              </view>
              <view class="detail-item-num special-color">
                {{ detail.signList.length || 0}}
              </view>
            </view>
          </template>
        </view>
      </view>
      <template v-if="detail.is_active === 1 && nowTab === 'applyed' && userInfo.is_manager === 2">
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
                    {{item.uname}}
                  </view>
                  <view class="member-phone">
                    {{item.mobile}}
                  </view>
                  <image class="member-image" src="/static/icons/icon_signIn.png" @click="memberSignIn(item)" v-if="userInfo.is_manager === 2"/>
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
                    {{item.uname}}
                  </view>
                  <view class="member-phone">
                    {{item.mobile}}
                  </view>
                  <image class="member-image" src="/static/icons/icon_callPhone.png" @click="makePhoneCall(item.mobile)" />
                </view>
              </cell>
            </list>
          </view>
        </view>
      </template>
      <!--  -->
      <button class="nextButton" @click="userSign" v-if="nowTab === 'applying' && detail.is_active !== 2">{{alreadySign ? '取消报名' : '立即报名'}}</button>
      <!-- <view @click="pauseClick">暂时签到</view> -->
    </template>
  </view>
</template>
<script>
import ActivityCard from '../../Components/ActivityCard'
import SearchInput from '../../Components/SearchInput'
import { default as Constants } from '@/Utils/constants'
export default {
  components: {
    ActivityCard,
    SearchInput,
  },
  data() {
    return {
      id: null,
      nowTab: '',
      userInfo: {},
      pageLoading: false,
      detail: {
        isDuration: true,
      },
      alreadySign: false,
      noArriveList: [],
      arrivedList: [],
    }
  },
  onLoad(e) {
    this.id = e.id
    this.nowTab = e.nowTab
    if (e.scene || e.q) {
      let scene = decodeURIComponent(e.scene);	// scene解码
      let arrPara = scene.split("&");
      let sceneParams = {}
      for (let i in arrPara) {
        let dataArr = arrPara[i].split(":");	// 拆分参数的名称和值
        sceneParams[dataArr[0]] = dataArr[1]
      }
      if (Object.keys(sceneParams).length > 0) {
        this.id = sceneParams.oid
        let params = {
          active_id: sceneParams.oid,
          orderType: 0,
        }
        this.services.post('/signOrder.html', params)
        .then(res => {
          this.utils.showToast('签到成功', 'success', '', 2500)
          this.nowTab = 'applyed'
          this.getDetail()
        })
      }
    }
    if (e.isSign) {
      let params = {
        active_id: e.id,
        orderType: 0,
      }
      this.services.post('/signOrder.html', params)
      .then(res => {
        this.utils.showToast('签到成功', 'success', '', 2500)
        this.getDetail()
      })
    }
    this.getUserInfo()
    this.getDetail()
  },
  methods: {
    getUserInfo() {
      this.userInfo = this.utils.getStorage(Constants.USER_INFO)
    },
    getDetail() {
      let params = {
        active_id: this.id
      }
      this.services.post('/getActInfo.html', params)
      .then(res => {
        let userList = res.userList
        let alreadySign = false;
        let arrivedList = []
        let noArriveList = []
        userList.forEach(user => {
          if (user.user_id === this.userInfo.user_id) alreadySign = true
          if (res.signList.includes(user.user_id)) {
            arrivedList.push(user)
          } else {
            noArriveList.push(user)
          }
        })

        this.detail = res
        this.alreadySign = alreadySign ? true : false
        this.arrivedList = arrivedList
        this.noArriveList = noArriveList
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
    memberSignIn(member) {
      this.utils.showModal('代签到', '该人员是否已到场', true, () => {
        let params = {
          active_id: this.id,
          user_id: member.user_id,
          orderType: 1,
        }
        this.services.post('/signOrder.html', params)
        .then(res => {
          this.utils.showToast('代签到成功', 'success', '', 2500)
          this.getDetail()
        })
      }, 2500)
    },
    makePhoneCall(tel) {
      uni.makePhoneCall({
        number: tel
      })
    },
    userSign() {
      let params = {
        active_id: this.detail.active_id,
        is_cancel: this.alreadySign ? 1 : 0,
      }
      this.services.post('/joinActives.html', params)
      .then(res => {
        let msg = this.alreadySign ? '取消成功' : '报名成功'
        this.alreadySign = !this.alreadySign
        this.utils.showToast(msg, 'success', '', 2500)
        this.getDetail()
      })
    },
    pauseClick() {
      let params = {
        active_id: this.detail.active_id,
        orderType: 0,
      }
      this.services.post('/signOrder.html', params)
      .then(res => {
        this.utils.showToast('签到成功', 'success', '', 2500)
        this.getDetail()
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
    box-sizing: border-box;
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

.nextButton {
  background: $basic-color;
  font-size: 32rpx;
  color: #fff;
  width: 690rpx;
  position: absolute;
  bottom: 30rpx;
  left: 30rpx;
}

</style>