<script>
	export default {
		globalData: {
			userInfo: null,
			code:''
		},
		onLaunch: function() {


		},
		onShow: function() {
			var that = this
			if (that.$scope.globalData.userInfo === null) {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						that.$scope.globalData.code=loginRes.code
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								that.$scope.globalData.userInfo = infoRes.userInfo
							}
						});
					}
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
