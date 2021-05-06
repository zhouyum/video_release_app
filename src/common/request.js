import baseconfig from "./baseConfig.js"
//写在index.js文件
const httpClient = {
	request: function(method, url, data, contenType) {
		//头部信息封装
		var herders = {
			'Content-Type': 'application/json',
			'app_key': 'YJBOX-USER-MINI',
			'call_source': 'ANDROID'
		};
		var login_token = uni.getStorageSync('login_token');
		if (login_token) {
			herders.login_token = login_token;
		}
		return new Promise((resolve, reject) => {
			//添加一个提示框，可以提升交互，也能防止数据未加载完用户点击导致报错
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			uni.request({
				url: url, //接口地址
				header: herders,
				data: data, // 传入的参数
				method: method, // 请求方法
				success: function(res) {
					//关闭提示框
					uni.hideLoading();
					if (res.data.code !== 100) { //请求失败显示报错信息
						uni.showToast({
							title: res.data.msg,
							duration: 1000,
							icon: "none"
						})
						return;
					}
					//请求token失效或者是错误，直接返回到登录页，让用户重新登陆
					if (res.data.code === 102) {
						uni.showToast({
							title: '登录过期请重新登录',
							duration: 1000,
							icon: "none"
						})
						setTimeout(function() {
							uni.reLaunch({
								url: '/src/pages/welcome/welcome.vue'
							})
						}, 1500)
					}
					resolve(res.data.data) // 成功返回的结果
				},
				fail: function(err) {
					uni.hideLoading()
					reject(err) // 失败结果
				}
			})
		});
	},

	// 常用请求方法封装
	Get: function(url, data, type) {
		let allurl = this.getUrl(type, url);
		return this.request('GET', allurl, data);
	},
	Post: function(url, data, type) {
		let allurl = this.getUrl(type, url);
		return this.request('POST', allurl, data);
	},
	Put: function(url, data, type) {
		let allurl = this.getUrl(type, url);
		return this.request('PUT', allurl, data);
	},
	Patch: function(url, data, type) {
		let allurl = this.getUrl(type, url);
		return this.request('PATCH', allurl, data);
	},
	Delete: function(url, data, type) {
		let allurl = this.getUrl(type, url);
		return this.request('DELETE', allurl, data);
	},

	// 页面请求的时候会传一个type，根据type值来调用不同域名的地址，下文有示例
	getUrl: function(type, url) {
		let allurl = ""
		if (type == 1) {
			allurl = baseconfig.server
		} else if (type == 2) {
			allurl = baseconfig.pdcom
		}
		return allurl + url
	}
};
// 导出方法
module.exports = httpClient
