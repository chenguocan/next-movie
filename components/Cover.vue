<template>
	<view class="coverPage">
		<view class="cover">
			<image :src="cover" mode="widthFix" @longpress="handlePress(cover)"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cover:''
			}
		},
		methods: {
			handlePress(cover){
				console.log(cover);
				uni.showActionSheet({
					itemList:['保存图片'],
					success:function(res){
						if(res.tapIndex===0){
							uni.downloadFile({
								url:cover,
								success:function(result){
									console.log(result);
									uni.showLoading({
										title:'正在保存图片',
									})
									uni.saveImageToPhotosAlbum({
										filePath:result.tempFilePath,
										success:function(){
											uni.showToast({
												title:'保存成功',
												duration:2000
											})
										},
										fail:function(err){
											console.log(err);
										},
										complete:function(){
											uni.hideLoading({
												duration:3000
											});
										}
									})
								},
								fail:function(result){
									console.log(result);
								}
							})
						}
					},
					fail:function(res){
						console.log(res.errMsg);
					}
				})
			}
		},
		onLoad(params){
			this.cover=params.cover;
		}
	}
</script>

<style>

.cover{
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
