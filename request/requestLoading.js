import config from './config.js'
function requestLoading(url,method="GET",data={}){
	method=method.toUpperCase();
	return new Promise((resolve,reject)=>{
		uni.request({
			url:config.host+url,
			method,
			data,
			success:(res)=>{
				if(res.data.status===200){
					resolve(res.data);
				}
			},
			fail:(err)=>{
				reject(err);
			},
			complete:()=>{
				uni.stopPullDownRefresh();
				uni.hideLoading();
			}
		})
	}) 
	
}
export default requestLoading;