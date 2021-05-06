<template>
	<view class="main_app">
		<!-- <view class="video_wrap" :style="{height:screenHeight+'px'}">
			<video play-btn-position="center" enable-play-gesture="true" autoplay="true" :controls="false"
				show-center-play-btn="false" show-fullscreen-btn="false" :src="videoDetail.video_url" @play="addLook"></video>
		</view> -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" @animationfinish="animationfinishfun" :current="1" :circular="true"
						:vertical="true">
						<swiper-item><!-- v-for="(item,index) in PayVideo" -->
							<view class="swiper-item uni-bg-red">
								<video :src="videoDetail.video_url" play-btn-position="center" enable-play-gesture="true"
									autoplay="true" :controls="true" show-center-play-btn="false"
									show-fullscreen-btn="false">
								</video>
							</view>
						</swiper-item>

					</swiper>
				</view>
			</view>
		</view>
		<view v-if="is_active">
			<cover-view class="left">
				<cover-view class="left_box">
					<cover-view class="ren">{{videoDetail.name}}</cover-view>
					<!-- <cover-view class="ke_context">{{videoDetail.video_content}}</cover-view> -->
				</cover-view>
				<cover-view class="right_box">
					<cover-view class="top1">
						<cover-image class="avatar_img" :src="userInfo.avatarUrl" mode=""></cover-image>
						<text class="avatarName">{{userInfo.nickName}}</text>
					</cover-view>
					<cover-view class="top2">
						<cover-image class="t_img" src="../../static/video/2.png" mode=""></cover-image>
						<cover-view class="font_t">397</cover-view>
					</cover-view>
					<cover-view class="top2" @click="showModal">
						<cover-image class="t_img" src="../../static/video/8.png" mode=""></cover-image>
						<cover-view class="font_t">397</cover-view>
					</cover-view>
				<!-- 	<cover-view class="top2">
						<cover-image class="t_img" src="../../static/video/3.png" mode=""></cover-image>
						<cover-view class="font_t">397</cover-view>
					</cover-view> -->
				</cover-view>
			</cover-view>
		</view>

		<view class="cu-modal bottom-modal" :class="show?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action" @tap="hideModal">

					</view>
					<view class="action">
						<view class="title">{{total_count}}条评论</view>
					</view>
					<view class="action" @tap="hideModal">
						<image src="../../static/images/down.png"></image>
					</view>
				</view>
				<view class="">
					<scroll-view scroll-y="true" style="height: 400px;">
						<view class="cu-list menu" v-for="(item,index) in commentList" :key="index">
							<view class="cu-item" :class="menuArrow?'arrow':''">
								<view class="content">
									<image :src="item.face_image" class="avatarClass" mode="aspectFit"></image>
									<text class="text-grey">{{item.nick_name}}</text>
									<view class="commentwrap">{{item.comment}}</view>
								</view>

								<view class="action" @click="commentlike(item.id,1,item.is_like,index,0)">
									<image
										:src="item.is_like===1?'../../static/yidianzan.png':'../../static/images/dianzan.png'">
									</image>
								</view>
							</view>
							<view class="cu-item" :class="menuArrow?'arrow':''"
								v-for="(item1,index1) in item.secComments" :key="index1"
								@click="commentlike(item1.id,2,item1.is_like,index,index1)">
								<view class="content">
									<image :src="item1.staff_image" class="avatarClass" mode="aspectFit"></image>
									<text class="text-grey">{{item1.staff_name}}</text>
									<view class="commentwrap">{{item1.comment}}</view>
								</view>

								<view class="action">
									<image
										:src="item1.is_like===1?'../../static/yidianzan.png':'../../static/dianzan1.png'">
									</image>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="sendWrap">
						<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300"
							cursor-spacing="10" @focus="InputFocus" @blur="InputBlur" v-model="comment"
							placeholder="重庆周慧敏 发表评论"></input>
						<view class="btnSend" @click="saveComments">发送</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import api from '@/api/api.js'
	export default {
		data() {
			return {
				updataTime: 0,
				show: false,
				screenHeight: 0,
				userInfo: null,
				isDianzan: false,
				height: 0,
				width: 0,
				image: ['../../static/dianzan.png', '../../static/pinglun.png'],
				videoDetail: null,
				page_num: 1,
				page_size: 15,
				commentList: [],
				total_count: 0,
				InputBottom: 0,
				comment: '',
				data: [],
				index_: 1,
				index: '1',
				is_active: true,
				active: 2,
				PayVideo: [],
				current_i: 2,
				_arr: [],
				len: 0,
			}
		},
		props: {
			ind: {
				type: Number,
				default: 0
			},
		},
		mounted() {
			uni.setStorageSync('video', this.data);
			let ind = 1
			this.index = ind
			const video = uni.getStorageSync('video');
			const len = video.length
			let b_arr = []
			let s_arr = []
			video.forEach((res, index) => {
				if (ind <= index) {
					b_arr.push(res)
				} else {
					s_arr.push(res)
				}
			})
			let _arr = b_arr.concat(s_arr.reverse())
			_arr = _arr.map(res => {
				res['istrue'] = false
				return res
			})
			_arr[0]['istrue'] = true
			const PayVideo = [
				_arr[len - 1], _arr[0], _arr[1]
			]
			this.PayVideo = PayVideo
			this._arr = _arr
			this.len = len
			this.$nextTick(function() {

				let videoContext = uni.createVideoContext('id1')
				videoContext.play()
			})
		},
		onLoad(options) {
			var that = this
			if (options.videoDetail) {
				this.videoDetail = JSON.parse(options.videoDetail)
			}
			uni.getSystemInfo({
				success(res) {
					that.screenHeight = res.screenHeight
				}
			})
			this.userInfo = getApp().globalData.userInfo
			console.log(this.userInfo)
		},
		onShow() {
			//获取评论数
			this.findComments()
		},
		methods: {
			changefun(e) {
				this.is_active = false
				let current = e.detail.current
				let {
					len,
					PayVideo,
					active,
					_arr,
					t,
					index_
				} = this
				console.log(PayVideo, index_)
				let videoContext = uni.createVideoContext('id' + index_)
				videoContext.pause()

				this.PayVideo = PayVideo
			},
			animationfinishfun(e) {
				let {
					index_,
					len,
					PayVideo,
					active,
					_arr,
					t
				} = this
				let current = e.detail.current

				this.is_active = true

				PayVideo[current]['istrue'] = true
				this.PayVideo = PayVideo
				let videoContext = uni.createVideoContext('id' + index_)
				console.log(index_, 1555555555)
				videoContext.pause()
				videoContext = uni.createVideoContext('id' + current)
				videoContext.play()
				this.index_ = current
				if (PayVideo.length == len) {
					return
				}


				this.PayVideo.push(_arr[active])
				this.active += 1


			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			touchStart(e) {
				this.touchStartTime = e.timeStamp; //按下按钮的瞬间
			},
			touchEnd(e) {
				this.touchEndTime = e.timeStamp; //松开按钮的瞬间
			},
			showModal() {
				this.show = true
			},
			hideModal() {
				this.show = false
			},
			//增加视频点击量
			addLook() {
				api.addLook({
					id: this.videoDetail.id
				}).then(data => {

				})
			},
			//获取视频评论信息
			findComments() {
				api.findComments({
					page_num: this.page_num,
					page_size: this.page_size,
					videoId: this.videoDetail.id,
					user_id: uni.getStorageSync('user_id')
				}).then(data => {
					this.total_count = data.total_count
					if (this.page_num === 1) {
						this.commentList = data.records
					} else {
						this.commentList = this.commentList.concat(data.records)
					}
				})
			},
			//视频点赞
			toDianzan() {
				var date = new Date().getTime()
				if (date - this.updataTime <= 1000) {
					uni.showToast({
						title: '请不要频繁点击',
						icon: 'none'
					})
				} else {
					api.likeOrUnLikeVideo({
						id: this.videoDetail.id,
						type: this.videoDetail.is_like === 1 ? 0 : 1,
						user_id: uni.getStorageSync('user_id')
					}).then(data => {
						this.videoDetail.is_like = this.videoDetail.is_like === 1 ? 0 : 1
						this.updataTime = date
					})

				}
			},
			//评论点赞
			commentlike(id, like_type, type, index, index1) {
				api.likeComment({
					id: id,
					like_type: like_type,
					type: type === 1 ? 2 : 1,
					user_id: uni.getStorageSync('user_id')
				}).then(data => {
					if (like_type === 1) {
						this.commentList[index].is_like = type === 1 ? 0 : 1
					} else {
						this.commentList[index].secComments[index1].is_like = type === 1 ? 0 : 1
					}
				})
			},
			//发表评论
			saveComments() {
				if (this.comment.trim() != '') {
					api.saveComments({
						comment: this.comment,
						from_wechat_user_id: uni.getStorageSync('user_id'),
						video_id: this.videoDetail.id,
						type:'1'
					}).then(data => {
						uni.showToast({
							title: '发表成功，等待审核!',
							duration: 1000,
							icon: "none"
						})
					})
				} else {
					uni.showToast({
						title: '请输入内容',
						duration: 1000,
						icon: "none"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sendWrap {
		width: 100%;
		height: 108upx;
		background: #F7F7F7;
		box-shadow: -5px 0px 20px 0px rgba(184, 184, 184, 0.67);
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-items: center;
		font-family: PingFang SC;

		.solid-bottom {
			flex: 3;
			font-size: 24upx;
			font-weight: 500;
			color: #959595;
		}

		.btnSend {
			flex: 1;
			font-size: 28upx;
			font-weight: 500;
			color: #F29A76;
		}
	}

	.circle {

		background: rgba(34, 34, 34, 0.4);

		border-radius: 50%;
		z-index: 2;
		height: 70px;
		width: 70px;
		position: fixed;
		top: 0;

		bottom: 441upx;
		left: 31upx;

		margin: auto;

		.red {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			margin: auto;
			z-index: 3;
			height: 35px;
			width: 35px;
		}
	}

	.swiper {
		height: 100vh;

		.swiper-item {
			height: 100vh;
			position: relative;
		}

		.uni-bg-red {
			background: red;
		}

		.uni-bg-green {
			background: green;
		}

		.uni-bg-blue {
			background: blue;
		}
	}

	.video {
		width: 100%;
		height: 100vh;
		position: relative;

	}

	.left {
		position: fixed;
		width: 100%;
		height: 270upx;
		bottom: 0;
		color: #FFFFFF;
	}

	.left_box {
		position: fixed;
		bottom: 146upx;
		left: 24upx;

		.ke_context {

			width: 516upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			word-break: break-all;
			word-wrap: break-word;
			white-space: pre-line;
			white-space: normal;
			text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
		}

		.ren {

			margin: 20upx 0;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
			text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
		}

		.auto {
			display: flex;
			align-items: center;
			width: 310upx;
			height: 60upx;
			margin-top: 24upx;
			opacity: 1;
			border-radius: 8upx;
			padding-left: 10upx;

			cover-view {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 90px;
				text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
			}

			cover-image {
				margin-right: 10upx;
				height: 28upx;
				width: 26upx;
			}
		}

		.ke {
			display: flex;
			align-items: center;
			width: 310upx;
			height: 60upx;
			background: rgba(0, 0, 0, 0.3);
			opacity: 1;
			border-radius: 8upx;
			padding-left: 10upx;

			cover-view {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 90px;
				text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
			}

			cover-image {
				margin-right: 10upx;
				height: 40upx;
				width: 40upx;
			}
		}
	}

	.H_T {
		z-index: 2;
		width: 100%;
		display: flex;
		box-sizing: border-box;
		position: absolute;
		padding: 0 30upx;
		background: transparent;
		justify-content: space-between;

		.back {
			height: 48upx;
			width: 48upx;
		}

		.search {
			height: 48upx;
			width: 48upx;
		}
	}

	.right_box {
		width: 100%;


		position: absolute;
		z-index: 99;
		bottom: 5upx;
		left: 35upx;
		display: flex;

		.top1 {
			position: relative;
			height: 124upx;
			flex: 2;
			flex-direction: column;
			align-items: center;
			margin-top: 37upx;
			
			.avatar_img {
				width: 107upx;
				height: 104upx;
				border-radius: 50%;
				float: left;
			}
			.avatarName{
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
		}

		.top2 {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 37upx;
			flex: 1;

			.t_img {
				height: 72upx;
				width: 72upx;
				margin-bottom: 10upx;
			}

			.font_t {
				font-size: 26upx;
				font-family: SF Pro Text;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);

				text-shadow: 0px 1upx 1upx rgba(0, 0, 0, 0.4);
				text-align: center;
			}
		}

	}

	.title {
		width: 100%;
		text-align: center;
		font-size: 32upx;
		color: black;
	}

	.action {
		image {
			width: 26upx;
			height: 26upx;
		}
	}

	.cu-item {
		padding: 0;
		text-align: left;
	}

	.content>image {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
	}

	.commentwrap {
		padding-left: 56upx;
	}

	.video_wrap {
		width: 100%;
		background-color: black;

		video {
			width: 100%;
			height: 100%;
		}

	}

	.bg-bottom {
		position: fixed;
		width: 100%;
		height: 240upx;
		bottom: 0;
		color: #FFFFFF;

		.video-title {
			padding: 32upx;
			width: 100%;
			height: 80upx;
			font-size: 28upx;
		}

		.wrap {
			width: 100%;
			height: 160upx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 160upx;
				height: 160upx;
			}

			.wrap_left {
				flex: 1.5;

				.wrap_avatarUrl {
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;

					.nickName {
						flex: 1;
						line-height: 160upx;
					}

					.avatarClass {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
						margin: 16upx;
					}
				}

			}

			.wrap_right {
				flex: 1;

				.wrap_msg {
					width: 100%;
					height: 100%;
					display: flex;

					.msg {
						flex: 1;
						text-align: center;

						image {
							width: 40upx;
							height: 40upx;
						}
					}
				}
			}
		}
	}
</style>
