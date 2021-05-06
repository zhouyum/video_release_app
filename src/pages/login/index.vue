<template>
	<view class="main_app">
		<view class="logo_wrap">
			<image src="../../static/images/logo.png"></image>
		</view>
		<view class="formClass">
			<view class="cu-form-group">
				<input placeholder="请输入手机号" type="number" v-model="phone"></input>
			</view>
			<view class="cu-form-group">
				<input placeholder="请输入验证码" type="number" v-model="verify_code"></input>
				<button :disabled="disabled" class='cu-btn bg-reds radius1' @click="sendCode">{{codeText}}</button>
			</view>
		</view>
		<view class="checkClass">
			<image @click="check" :src="ischeck?'../../static/images/checkActive.png':'../../static/images/check.png'">
			</image>
			<text class="title1">已同意并阅读</text>
			<text class="title2">全然可鉴用户协议及隐私政策</text>
		</view>
		<view class="btnWrap" @click="submitForm">
			<button class="cu-btn block bg-reds margin-tb-sm lg radius2" :disabled="isSubmit">
				<text class="cuIconfont-spin" :class="[submit?'cuIcon-loading2':'']"></text> 登录</button>
		</view>
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
				disabled: false,
				isSubmit: false,
				ischeck: false
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
			check() {
				this.ischeck = !this.ischeck
			},
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
			submitForm() {
				if (this.verify_code === '') {
					uni.showToast({
						title: '请输入验证码',
						duration: 1000,
						icon: "none"
					})
				} else if (this.ischeck === false) {
					uni.showToast({
						title: '请勾选同意全然可鉴用户协议及隐私政策',
						duration: 1000,
						icon: "none"
					})
				} else {
					api.wechatLogin({
						code: getApp().globalData.code,
						encryptedData: getApp().globalData.encryptedData,
						iv: getApp().globalData.iv,
						login_phone: this.phone,
						sms_code: this.verify_code
					}).then(data => {
						uni.setStorageSync('companyItemInfoList', data.companyItemInfoList)
						uni.setStorageSync('login_token', data.login_token)
						uni.setStorageSync('user_id', data.user_id)
						uni.redirectTo({
							url: '../home/home'
						})
					})
				}
			},
		}

	}
</script>

<style lang="scss" scoped>
	.logo_wrap {
		width: 100%;
		display: flex;
		justify-content: center;

		image {
			width: 238upx;
			height: 33upx;
			margin-top: 161upx;
		}
	}

	.formClass {
		margin-top: 156upx;
		margin-left: 46upx;
		margin-right: 46upx;
		height: 290upx;
		margin-top: 117rpx;
		background-color: #FFFFFF;
		border-radius: 25upx;
	}

	.checkClass {
		margin-top: 39upx;
		display: flex;
		align-items: center;
		justify-items: center;

		image {
			width: 30upx;
			height: 30upx;
			margin-left: 42upx;
		}

		.title1 {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #313131;
			line-height: 13upx;
			margin-left: 19upx;
		}

		.title2 {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #4199FF;
			line-height: 13upx;
		}
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

	.btnWrap {
		margin: 143upx 46upx;
	}
</style>
