import config from './config.js'
function request(url,method="GET"){
	method=method.toUpperCase();
	return new Promise((resolve,reject)=>{
		uni.request({
			url:config.host+url,
			method,
			success:(res)=>{
				if(res.data.status===200){
					resolve(res.data);
				}
			},
			fail:(err)=>{
				reject(err);
			}
		})
	}) 
	
}
export default request;