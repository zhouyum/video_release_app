<template>
	<view class="main_app">
		<view class="logo_wrap"></view>
		<form>
			<view class="cu-form-group">
				<input placeholder="请输入手机号" type="number" v-model="phone"></input>
			</view>
			<view class="cu-form-group">
				<input placeholder="请输入验证码" type="number" v-model="verify_code"></input>
				<button :disabled="disabled" class='cu-btn bg-blue round' @click="sendCode">{{codeText}}</button>
			</view>
			<view class="padding-xl" @click="submitForm">
				<button class="cu-btn block bg-blue margin-tb-sm lg">
					<text class="cuIconfont-spin" :class="[submit?'cuIcon-loading2':'']"></text> 登录</button>
			</view>
		</form>
		<view class="footer">全然可见 重庆市格鲁机构@www.baidu.com</view>
	</view>
</template>

<script>
	import api from '../../api/api.js'
	export default {
		data() {
			return {
				submit: false,
				codeText: '获取验证码',
				phone: '',
				verify_code: '',
				time: 60,
				disabled: false
			}
		},
		onShow() {
			// setTimeout(function() {
			// 	uni.reLaunch({
			// 		url: '../home/home'
			// 	})
			// }, 3000)
		},
		methods: {
			sendCode() {
				if (this.phone != '') {
					api.checkPhone({
						login_phone: this.phone
					}).then(data => {
						console.log(data)
						if (data.status === '1') {
							api.sendCodeForForgetLoginPwd({
								phone_num: this.phone,
								sms_type: "userLogin"
							}).then(data => {
								this.time = 60
								this.timer()
							})
						} else {
							uni.showToast({
								title: '手机号未入库',
								duration: 1000,
								icon: "none"
							})
						}
					})
				} else {
					uni.showToast({
						title: '请输入手机号',
						duration: 1000,
						icon: "none"
					})
				}
			},
			timer() {
				if (this.time > 0) {
					this.disabled = true;
					this.time--;
					this.codeText = this.time + "秒后重新获取";
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.codeText = "获取验证码";
					this.disabled = false;
				}
			},
			submitForm(){
				if(this.verify_code===''){
					uni.showToast({
						title: '请输入验证码',
						duration: 1000,
						icon: "none"
					})
				}else{
					api.wechatLogin({
						code:getApp().globalData.code,
						encryptedData:getApp().globalData.encryptedData,
						iv:getApp().globalData.iv,
						login_phone:this.phone,
						sms_code:this.verify_code
					}).then(data=>{
						uni.setStorageSync('companyItemInfoList',data.companyItemInfoList)
						uni.setStorageSync('login_token',data.login_token)
						uni.setStorageSync('user_id',data.user_id)
						uni.redirectTo({
							url:'../home/home'
						})
					})
				}
			},
		}

	}
</script>

<style lang="scss" scoped>
	.logo_wrap {
		width: 80%;
		margin: 10% 10%;
		height: 300upx;
		border: 1px solid #333333;
	}

	.footer {
		width: 100%;
		height: 160upx;
		position: absolute;
		bottom: 0;
		color: #999999;
		text-align: center;
		line-height: 160upx;
		font-size: 24upx;
	}
</style>
