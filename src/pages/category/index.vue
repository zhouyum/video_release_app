<template>
	<view class="main_app">
		<view class="searchClass">
			<image src="../../static/images/search.png"></image>
			<input placeholder="搜索" />
		</view>
		<view class="wrap">最近访问</view>
		<view class="btn_wrap">
			<view class="cu-button">
				<image src="../../static/images/location.png"></image>
				<text>重庆</text>
			</view>
		</view>
		<view class="wrap">城市</view>
		<view class="btn_wrap">
			<view :class="[index==='1'?'active':'cu-button']">
				<text>上海</text>
			</view>
			<view class="cu-button space">
				<text>昆明</text>
			</view>
			<view class="cu-button space">
				<text>深圳</text>
			</view>
		</view>
		<view class="wrap">公司</view>
		<view class="btn_wrap">
			<view :class="[index==='1'?'active':'cu-button']">
				<text>万科</text>
			</view>
			<view class="cu-button space">
				<text>金茂</text>
			</view>
			<view class="cu-button space">
				<text>东原</text>
			</view>
		</view>
		<view class="wrap">项目</view>
		<view class="btn_wrap">
			<view :class="[index==='1'?'active':'cu-button']">
				<text>月湾</text>
			</view>
			<view class="cu-button space">
				<text>江上明月</text>
			</view>
			<view class="cu-button space">
				<text>鹅岭峰</text>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../api/api.js'
	export default {
		data() {
			return {
				index: '1'
			}
		},
		onShow() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.searchClass {
		background: #ECECEE;
		border-radius: 26upx;
		margin-left: 40upx;
		margin-right: 40upx;
		height: 53upx;
		display: flex;
		align-items: center;

		image {
			width: 20upx;
			height: 20upx;
			margin-left: 26upx;
		}

		input {
			margin-left: 21rpx;
		}
	}

	.wrap {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #313131;
		line-height: 69upx;
		margin-top: 41upx;
		padding-left: 39upx;
	}

	.btn_wrap {
		margin-left: 39upx;
		display: flex;
		font-size: 26upx;
		font-family: PingFang SC;
		.active{
			width: 146upx;
			height: 63upx;
			border-radius: 10upx;
			display: flex;
			align-items: center;
			justify-content: center;	
			background: #333333;
			border: 1px solid #999999;
			color: #FFFFFF;
			image {
				width: 24upx;
				height: 24upx;
			}
		}
		.cu-button {
			width: 146upx;
			height: 63upx;
			background: #FFFFFF;
			border: 1px solid #999999;
			border-radius: 10upx;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 24upx;
				height: 24upx;
			}
		}

		.space {
			margin-left: 30upx;
		}
	}
</style>
