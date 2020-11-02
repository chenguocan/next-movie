<template>
	<view class="scoreItem">
		<image src="../static/icos/star-yellow.png"></image>
		<image src="../static/icos/star-yellow.png"></image>
		<image src="../static/icos/star-yellow.png"></image>
		<image src="../static/icos/star-yellow.png"></image>
		<image src="../static/icos/star-gray.png"></image>
		<text class="score">{{score}}</text>
	</view>
</template>

<script>
	export default {
		name:"Score",
		props:{
			"score":{
				type:Number,
				default:9.9,
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.scoreItem image{
	width: 20upx;
	height: 20upx;
}
.scoreItem .score{
	margin-left: 6upx;
	font-size: 13px;
}
</style>
