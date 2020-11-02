<template>
	<view class="nav-wapper">
		<view class="nav-icon">
			<image :src="image"></image>
		</view>
		<view class="nav-title">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"NavTitle",
		props:{
			image:{
				type:String,
			},
			title:{
				type:String,
				default:'输入标题',
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.nav-wapper{
	width: 100%;
	height: 80upx;
	display: flex;
	align-items: center;
}
.nav-icon{
	margin-left: 12upx;
}
.nav-icon image{
	width: 30upx;
	height: 30upx;
	margin-top: 10upx;
}
.nav-title{
	margin-left: 12upx;
}
.nav-title .title{
	font-size: 20px;
	font-weight: bold;
}
</style>
