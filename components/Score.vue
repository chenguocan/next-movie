<template>
	<view class="scoreList">
		<view class="scoreItem" v-for="(yellowItem,yellowIndex) in yellowStar" :key="'y'+yellowIndex">
			<image src="../static/icos/star-yellow.png"></image>
		</view>
		<view class="scoreItem" v-for="(grayItem,grayIndex) in grayStar" :key="'g'+grayIndex">
			<image src="../static/icos/star-gray.png"></image>
		</view>
		<text class="score" v-show="isShow==='yes'">{{score}}</text>
	</view>
</template>

<script>
	export default {
		name:"Score",
		props:{
			"score":{
				type:Number,
				default:0,
			},
			"isShow":{
				type:String,
				default:"no",
			}
		},
		data() {
			return {
				yellowStar:0,
				grayStar:0,
			};
		},
		created(){
			this.yellowStar=parseInt(this.score/2);
			this.grayStar=5-this.yellowStar;
		},
	}
</script>

<style>
.scoreList image{
	width: 20upx;
	height: 20upx;
}
.scoreList .score{
	margin-left: 6upx;
	font-size: 13px;
}
.scoreList .scoreItem{
	display: inline-block;
}
</style>
