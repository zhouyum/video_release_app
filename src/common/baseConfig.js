var baseconfig = {};
 //测试地址
if (process.env.NODE_ENV === 'development') { 
    baseconfig = {
        server: 'http://47.119.165.38:8020',
        pdcom: "/api"
    }
    
 //正式地址
} else if (process.env.NODE_ENV === 'production') { 
    baseconfig = {
        server: 'https://www.baidu.com/api',
        pdcom: "https://www.baidu.com/api"
    }
}
export default baseconfig;