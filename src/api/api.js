import httpClient from '../common/request.js' //导入 封装的请求
let api = {};

//验证是否为登录手机号
api.checkPhone = data => {  
	return httpClient.Post('/v1-0-0/miniApp/checkPhone', data, 1)
};
//获取验证码
api.sendCodeForForgetLoginPwd = data =>{
	return httpClient.Post('/sys/sendSmsCodeCommon',data,1)
}
//用户登录
api.wechatLogin = data =>{
	return httpClient.Post('/v1-0-0/miniApp/wechatLogin',data,1)
}
//获取用户登录信息
api.code2SessionInfo = data =>{
	return httpClient.Post('/v1-0-0/miniApp/code2SessionInfo',data,1)
}
//获取视频列表 
api.userVideoPageList = data =>{
	return httpClient.Post('/v1-0-0/video/weixin/miniHomePageList',data,1)
}
//获取视频评论信息 
api.findComments = data =>{
	return httpClient.Post('/v1-0-0/video/weixin/findComments',data,1)
}
//点击增加视频浏览量
api.addLook = data =>{
	return httpClient.Post('/v1-0-0/video/weixin/addLook',data,1)
}
//用户评论点赞
api.likeComment = data =>{
	return httpClient.Post('/v1-0-0/video/weixin/likeComment',data,1)
}
//用户视频点赞 
api.likeOrUnLikeVideo = data =>{
	return httpClient.Post('/v1-0-0/video/weixin/likeOrUnLikeVideo',data,1)
}
//提交用户评论
api.saveComments = data =>{
	return httpClient.Post('/v1-0-0/video/weixin/saveComments',data,1)
}
export default api  //导出
