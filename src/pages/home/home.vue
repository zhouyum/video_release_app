<template>
	<view class="main_app">
		<view class="bg-reds search_wrap">
			<view class="wrap1">
				<view class="item">
					<text>万科·悦湾</text>
					<image src="../../static/index/down.png"></image>
				</view>
				<view class="avatar">
					<image class="avatarClass" src="../../static/logo.png"></image>
					<image class="point" src="../../static/index/point.png"></image>
				</view>
			</view>
			<view class="cu-bar search" :style="[{top:CustomBar + 'px'}]">
				<view class="search-form rounds">
					<image src="../../static/images/search.png"></image>
					<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
				</view>
				<view class="action">
					<text>搜索</text>
				</view>
			</view>
		</view>
		<view class="cu-list grid no-border col-4">
			<view class="cu-item" v-for="(item,index) in typeList" :key="index">
				<view class="imagesclass">
					<image :src="item.image"></image>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="swiper-wrap bg-white">
			<swiper class="screen-swiper round-dot" style="height: 265rpx;" :indicator-dots="true" :circular="true" :autoplay="true"
				interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swipers" :key="index">
					<image :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="cu-list grid no-border col-5 margin-top">
			<view class="cu-item" v-for="(item,index) in contentTypeList" :key="index">
				<view class="imagesclass">
					<image :src="item.image"></image>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="set_box" v-for="(item,index) in videoList" :key="index">
			<view class="set_time">
				<view>{{item.update_time | DateFormat()}}</view>
			</view>
			<!-- 步骤条 -->
			<view class="set-1">
				<view class="set-2">
					<view class="tlak_o" @click="toDetail(item)">
						<view class="cu-card case no-card">
							<view class="shadow margin-xl">
								<view class="image">
									<image class="" :src="item.cover_url" mode="widthFix" v-if="item.cover_url!=''">
									</image>
									<video v-else :src="item.video_url"></video>
									<view class="attention"><text class="cuIcon-attentionfill"></text> <text
											class="margin-left-sm">{{item.like_counts}}</text></view>
								</view>
								<view class="cu-list menu-avatar text-black">
									<view class="margin-left text-lg">{{item.video_name}}</view>
									<view class="margin-left text-sm">{{item.video_type}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="cu-card case no-card" v-for="(item,index) in 10" :key="index" @click="toDetail">
				<view class="shadow margin-xl" >
					<view class="image">
						<image src="https://yjbox-test.oss-cn-beijing.aliyuncs.com/202103311427160754823.jpg"
						 mode="widthFix"></image>
						<view class="attention"><text class="cuIcon-attentionfill"></text> <text class="margin-left-sm">125</text></view>
					</view>
					<view class="cu-list menu-avatar text-black">
						<view class="margin-left text-lg">视频标题</view>
						<view class="margin-left text-sm">视频类型</view>
					</view>
				</view>
			</view> -->
		<!-- <view class="cu-load load-modal" v-if="loadModal">
				<image src="/static/logo.png" mode="aspectFit"></image>
				<view class="gray-text">加载中...</view>
			</view> -->
		<view class="cu-load" :class="isLoad?'over':''"></view>
	</view>
</template>

<script>
	import api from "@/api/api.js"
	export default {
		filters: {
			DateFormat: function(value, pattern = "") {
				// 根据给定的字符串，得到特定的日期
				var date = new Date(value);
				var year = date.getFullYear();
				var month =
					date.getMonth() + 1 < 10 ?
					"0" + (date.getMonth() + 1) :
					date.getMonth() + 1;
				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				return year + "-" + month + "-" + day;
			}
		},
		data() {
			return {
				videoList: [],
				typeList: [{
						id: 1,
						name: '智慧工地解锁',
						image:"../../static/index/1.png"
					},
					{
						id: 2,
						name: '施工工艺小视频',
						image:"../../static/index/2.png"
					},
					{
						id: 3,
						name: '周末直播间',
						image:"../../static/index/3.png"
					},
					{
						id: 4,
						name: '透明生产线',
						image:"../../static/index/4.png"
					},
				],
				contentTypeList: [{
						id: 1,
						name: '结构工艺',
						image:"../../static/index/02.png"
					},
					{
						id: 2,
						name: '安装预埋',
						image:"../../static/index/9.png"
					},
					{
						id: 3,
						name: '主体封顶',
						image:"../../static/index/8.png"
					},
					{
						id: 4,
						name: '砌墙施工',
						image:"../../static/index/7.png"
					},
					{
						id: 5,
						name: '消防施工',
						image:"../../static/index/01.png"
					},
					{
						id: 6,
						name: '材料验收',
						image:"../../static/index/03.png"
					},
					{
						id: 7,
						name: '外墙施工',
						image:"../../static/index/5.png"
					},
					{
						id: 8,
						name: '成品保护',
						image:"../../static/index/6.png"
					},
					{
						id: 9,
						name: '隔音测试',
						image:"../../static/index/00.png"
					},
					{
						id: 10,
						name: '全部',
						image:"../../static/index/10.png"
					},
					
				],
				TabCur: 0,
				ctabCur: 0,
				scrollLeft: 0,
				scrollLeft1: 0,
				screenHeight: 0,
				isLoad: false,
				loadModal: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				swipers: ['../../static/1.jpg', '../../static/2.jpg'],
				itemList: [],
				index: 0,
				serch_value: "",
				page_num: 1,
				page_size: 6,
				userInfo: getApp().globalData.userInfo
			}
		},
		methods: {
			tabSelect(e) {
				this.ctabCur = e.currentTarget.dataset.id;
				this.scrollLeft1 = (e.currentTarget.dataset.id - 1) * 60
			},
			typetabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			//搜索
			searchVideo() {
				this.page_num = 1
				this.userVideoPageList()
			},

			//下一页
			onReachBottom() {
				if (!this.isLoad) {
					this.page_num = this.page_num + 1
					this.userVideoPageList()
				}
				console.log(this.isLoad)

			},
			toDetail(item) {
				console.log(item)
				if (item.type === '1') {
					uni.navigateTo({
						url: '../videoDetail/videoDetail?videoDetail=' + JSON.stringify(item)
					})
				}
			},
			//获取视频列表
			userVideoPageList() {
				api.userVideoPageList({
					page_num: this.page_num,
					page_size: this.page_size,
					serch_value: this.serch_value
				}).then(data => {
					console.log(data.records.length)
					if (data.records.length <= 0) {
						this.isLoad = true
					}
					if (this.page_num === 1) {
						this.videoList = data.records
					} else {
						this.videoList = this.videoList.concat(data.records)
					}
				})
			},
			//切换项目
			PickerChange(e) {
				this.index = e.detail.value
			}

		},
		onShow() {
			let that = this
			uni.getSystemInfo({
				success(res) {
					that.screenHeight = res.screenHeight - 320
				}
			})
			this.userInfo= getApp().globalData.userInfo
			console.log(this.userInfo)
			// let array = uni.getStorageSync('companyItemInfoList')
			// var itemlist = []
			// array.forEach(function(item, index) {
			// 	var str = ''
			// 	item.itemList.forEach(function(item1, index1) {
			// 		str = item.company_name + '.' + item1.item_name
			// 		var items = {
			// 			item_name: str,
			// 			company_id: item.company_id,
			// 			item_id: item1.item_id
			// 		}
			// 		itemlist.push(items)
			// 	})
			// })
			// this.itemList = itemlist
			// this.userVideoPageList()
		},
	}
</script>

<style lang="scss">
	.search_wrap {
		width: 100%;
		min-height: 180upx;

		.wrap1 {
			width: 100%;
			padding-top: 45upx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.item {
				flex: 4;
				padding-left: 38upx;
				font-size: 32upx;
				image {
					width: 16upx;
					height: 16upx;
					margin-left: 13upx;
				}
			}

			.avatar {
				.avatarClass {
					width: 52.9upx;
					height: 52.9upx;
					border-radius: 50%;
					margin-right: 34upx;
				}

				.point {
					width: 12upx;
					height: 12upx;
					position: relative;
					top: -45upx;
					left: -90upx;
				}
			}
		}

		.searchClass {
			margin: 31upx 135upx 40upx 22upx;
			height: 51upx;
			background: #FFFFFF;
			border-radius: 25upx;
			display: flex;
			align-items: center;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;

			image {
				width: 20upx;
				height: 20upx;
				margin-left: 23upx;
			}

			input {
				margin-left: 18rpx;
			}
		}

		.btn {
			float: right;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 38upx;
			margin-right: 52upx;
		}

	}
	.imagesclass{
		image{
			width: 72upx;
			height: 72upx;
		}
	}
	.set_box {
		width: 100%;
		display: flex;
		flex-direction: row;
		margin-top: 50rpx;
	}

	/* 左侧时间 */
	.set_time {
		width: 10%;
		position: relative;
		z-index: 99;

		view {
			width: 120%;
			position: absolute;
			margin-top: 60upx;
			right: -40rpx;
			color: #999999;
		}

	}


	/* 右侧内容 */


	.set-1 {
		width: 90%;
	}

	.set-2 {
		min-height: 300upx;
		border-radius: 10upx;
		width: 84%;
		margin-left: 100upx;
		margin-top: 60upx;
		padding-right: 10rpx;
		position: relative;

		.tlak_o {
			width: 100%;
			min-height: 300upx;
		}
	}

	.set-2::after {
		content: '';
		/* 必须存在如果没有图标就留空 */
		top: -20upx;
		/* 定位 距离*/
		border-left: #c6c6c6 1px solid;
		/* 横线颜色 */
		left: -44upx;
		/* 定位 距离*/
		height: 120%;
		/* 高度 */
		position: absolute;
		/* 定位 */
	}

	.set-2::before {
		content: "\e610";
		/* 必须存在如果没有图标就留空 */
		color: #1296db;
		/* 设置颜色 */
		position: absolute;
		/* 定位 */
		left: -70upx;
		top: 25upx;
		/* 移动到左边 */
		font-weight: bold;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		font-family: "iconfont" !important;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		font-size: 54upx;
		/* 图标大小 */
		font-style: normal;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		-webkit-font-smoothing: antialiased;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		-moz-osx-font-smoothing: grayscale;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
	}

	@font-face {
		font-family: 'iconfont';
		/* project id 1020477 */
		src: url('//at.alicdn.com/t/font_1020477_o4c1qitjoib.eot');
		src: url('//at.alicdn.com/t/font_1020477_o4c1qitjoib.eot?#iefix') format('embedded-opentype'),
			url('//at.alicdn.com/t/font_1020477_o4c1qitjoib.woff2') format('woff2'),
			url('//at.alicdn.com/t/font_1020477_o4c1qitjoib.woff') format('woff'),
			url('//at.alicdn.com/t/font_1020477_o4c1qitjoib.ttf') format('truetype'),
			url('//at.alicdn.com/t/font_1020477_o4c1qitjoib.svg#iconfont') format('svg');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-yuandian:before {
		content: "\e64d";
	}

	.icon-dingweiweizhi:before {
		content: "\e619";
	}

	.icon-guankan::before {
		content: "\e610;";
	}

	.attention {
		position: absolute;
		bottom: 10upx;
		right: 3%;
		color: #FFFFFF;
	}

	.grid_title {
		position: absolute;
	}

	picker {
		margin-left: 16upx;
	}

	.swiper-wrap {
		background-color: #FFFFFF;
		padding-left: 39upx;
		padding-right: 35upx;
		height: 265upx;
		padding-top: 33upx;
		image {
			width: 100%;
			height: 265upx;
		}
	}

	.top {
		width: 100%;
		position: relative;
		background-color: #FFFFFF;
	}

	.scroll_view {
		position: relative;
	}

	.video_class {
		width: 320upx;
		height: 320upx;
		margin-left: 20upx;
	}

	.bg-img {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;

		image {
			width: 160upx;
			height: 160upx;
		}

		.stop {
			background: url(../../static/stop.png) center center no-repeat;
			height: 300upx;
			position: relative;
			z-index: 10;
		}
	}
</style>
