<script>
	import constants from '@/Utils/constants'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success:res => {
					// 计算顶部栏高度
					// 屏幕实际尺寸(screenWidth)/750rpx=目标元素尺寸/结果(实际px)
					let statusHeightRpx = (750 * res.statusBarHeight / res.screenWidth).toFixed(2)
					this.utils.setStorage('statusBarHeight', statusHeightRpx)
				}
			})
			this.utils.requestUserInfo()
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
      })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
