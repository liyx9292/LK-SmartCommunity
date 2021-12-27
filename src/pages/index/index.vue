<template>
	<view class="body">
		<!-- 顶部banner -->
		<view class="top-banner" autoplay duration="5000">
			<!-- <swiper-item> -->
				<view class="banner-item">
					<image class="banner-image" src="../../static/banner-bg.png"/>
				</view>
			<!-- </swiper-item> -->
			<view class="banner-tips" :style="{paddingTop: `${statusHeight}rpx`}">
				文明行为银行
			</view>
		</view>

		<!-- 4个按钮 -->
		<view class="button-group">
			<view class="button-item" v-for="(item, index) in buttonGroup" :key="item.id" @click="jumpPage(item)">
				<image class="button-image" :src="`../../static/index/index_buttons_${index + 1}.png`" />
				<view class="button-text">
					{{item.label}}
				</view>
			</view>
		</view>

		<!-- 资讯信息 -->
		<!-- <view class="tips-block">
			<view class="tips-container">
				<view class="tips-left-background"/>
				<view class="tips-left-text">
					资讯信息
				</view>
				<view class="tips-right-background"/>
				<swiper class="tips-right-swiper">
					<swiper-item>
						<view class="tips-item">
							关于新冠肺炎的报告
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view> -->

		<!-- 新闻列表 -->
		<list class="news-list">
			<cell v-for="item in newsList" :key="item.id">
				<view class="news-item" :class="{soloImageNews: item.images.length === 1}" @click="jumpNews(item)">
					<template v-if="item.images.length !== 1">
						<view class="news-title">
							<view v-if="item.isTop" class="news-title-top">
								置顶
							</view>
							<text>{{item.title}}</text>
						</view>
						<view class="news-time-bar">
							<image class="news-time-icon" src="../../static/icons/icon_time.png" />
							<text>{{item.create_time}}</text>
						</view>
						<view class="news-images-container">
							<image class="news-image-item" v-for="(imageItem, index) in item.images" :key="index" :src="imageItem" mode="widthFix"/>
						</view>
					</template>
					<template v-else>
						<view class="news-left">
							<view class="news-title">
								<view v-if="item.isTop" class="news-title-top">
									置顶
								</view>
								<text>{{item.title}}</text>
							</view>
							<view class="news-time-bar">
								<image class="news-time-icon" src="../../static/icons/icon_time.png" />
								<text>{{item.create_time}}</text>
							</view>
						</view>
						<view class="news-right">
							<image class="news-image-item" :src="item.images[0]" mode="widthFix"/>
						</view>
					</template>
				</view>
			</cell>
		</list>
		<Tabbar/>
	</view>
</template>

<script>
  import Tabbar from '@/Components/Tabbar.Component.vue'
	import config from '@/config'
	import { default as Constants } from '@/Utils/constants'
	export default {
		components: {
			Tabbar,
		},
		data() {
			return {
				statusHeight: 0,
				banners: [],
				buttonGroup: [
					{ id: 1, label: '志愿者申请', path: '/pages/index/volunteerApply' },
					{ id: 2, label: '活动报名', path: '/pages/index/activityApply' },
					{ id: 3, label: '积分商城', path: '/pages/index/intShop' },
					{ id: 4, label: '文明户管理', path: '/pages/index/civilizedBuild/build' },
				],
				tips: [],
				newsList: [],
			}
		},
		onLoad() {
			let statusHeight = this.utils.getStorage('statusBarHeight')
    	this.statusHeight = statusHeight
			this.getNews()
		},
		methods: {
			jumpPage(item) {
				if (item.id === 1) {
					let userInfo = this.utils.getStorage(Constants.USER_INFO)
					if (userInfo.is_volunteer === 2) {
						this.utils.showModal('', '您已经是志愿者', false)
						return
					} else if (userInfo.is_volunteer === 1) {
						this.utils.showModal('审核中', '请等待审核结果', false)
						return
					}
				} else if (item.id === 4) {
					this.utils.showModal('提示', '该功能未开放')
					return
				}
				this.utils.jumpPage(item.path)
			},
			getNews() {
				this.services.request('/getNewsList.html')
				.then(res => {
					res.forEach(item => {
						item.images = [`${config.baseUrl}${item.thumb}`]
					})
					this.newsList = res
				})
			},
			jumpNews(item) {
				this.utils.setStorage('newsDetail', item)
				this.utils.jumpPage('/pages/index/newsDetail')
			}
		}
	}
</script>
<style lang="scss">
.body {
	padding-bottom: 150rpx;
	min-height: 100vh;
}
.top-banner {
	width: 750rpx;
	height: 350rpx;
	background: #ccc;
	// position: relative;
	display: block;
	.banner-item {
		width: 750rpx;
		height: 350rpx;
		display: block;
		.banner-image {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
	.banner-tips {
		position: absolute;
		left: 20rpx;
		top: 20rpx;
		font-size: 30rpx;
		color: #fff;
	}
}
.button-group {
	width: 690rpx;
	height: 180rpx;
	background: #FFFFFF;
	box-shadow: 0px 0px 15rpx 0px rgba(112, 104, 226, 0.15);
	border-radius: 20rpx;
	margin: 0 auto;
	margin-top: -45rpx;
	display: flex;
	box-sizing: border-box;
	justify-content: space-between;
	padding: 25rpx;
	z-index: 9;
	.button-item {
		width: 120rpx;
		.button-image {
			width: 98rpx;
			height: 98rpx;
			display: block;
			margin: 0 auto;
		}
		.button-text {
			width: 100%;
			text-align: center;
			font-size: 24rpx;
			color: #333333;
			margin-top: 5rpx;
		}
	}
}

.tips-block {
	width: 690rpx;
	height: 60rpx;
	margin: 0 auto;
	margin-top: 40rpx;
	background: $basic-color;
	position: relative;
	overflow: hidden;
	.tips-container {
		width: 1000rpx;
		height: 100%;
	}
	.tips-left-background {
		width: 172rpx;
		height: 100%;
		background: $basic-color;
		transform:skew(-15deg);
		overflow: hidden;
		display: inline-block;
	}
	.tips-left-text {
		position: absolute;
		width: 172rpx;
		height: 100%;
		color: #fff;
		font-size: 32rpx;
		text-align: center;
		font-weight: 600;
		line-height: 60rpx;
		left: 0;
		top: 0;
	}
	.tips-right-background {
		width: 528rpx;
		height: 100%;
		transform:skew(-15deg);
		background: #f7f5f5;
		margin-left: 10rpx;
		overflow: hidden;
		display: inline-block;
	}
	.tips-right-swiper {
		position: absolute;
		right: -20rpx;
		top: 0;
		width: 518rpx;
		height: 60rpx;
		box-sizing: border-box;
		color: $basic-color;
		font-size: 26rpx;
		line-height: 60rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

.news-list {
	width: 690rpx;
	margin: 0 auto;
	.news-item {
		width: 690rpx;
		padding: 30rpx 0;
		margin: 0 auto;
		border-top: 1rpx solid #EDEDED;
		display: flex;
		flex-wrap: wrap;
		.news-title {
			width: 100%;
			font-size: 30rpx;
			color: #333;
			.news-title-top {
				display: inline-block;
				width: 46rpx;
				height: 30rpx;
				background: #D61C22;
				border-radius: 4rpx;
				font-size: 20rpx;
				color: #fff;
				padding: 0 4rpx;
				text-align: center;
				margin-right: 6rpx;
			}
		}
		.news-time-bar {
			width: 100%;
			font-size: 28rpx;
			color: #999;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			.news-time-icon {
				width: 28rpx;
				height: 28rpx;
				margin-right: 10rpx;
				display: inline-block;
			}
		}
		.news-images-container {
			width: 705rpx;
			height: 170rpx;
			margin-top: 20rpx;
			display: flex;
		}
		.news-image-item {
			width: 220rpx;
			height: 170rpx;
			margin-right: 15rpx;
			display: block;
		}
		// soloImage
		.news-left {
			width: 440rpx;
			margin-right: 30rpx;
			.news-title {
				height: 130rpx;
				overflow: hidden;
			}
			.news-time-bar {
				margin-top: 10rpx !important;
			}
		}
		.news-right {
			width: 220rpx;
			height: 170rpx;
			overflow: hiddennews-images-container;
			.news-image-item {
				margin-right: 0rpx !important;
			}
		}
	}
	.soloImageNews {
		.news-title {

		}
	}
}
</style>
