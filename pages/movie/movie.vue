<template>
	<view class="moviePage">
		<!--视频播放-->
		<view class="movie">
			<video class="movieItem" :src="trailerInfo.trailer" :poster="trailerInfo.poster" controls></video>
		</view>
		<view class="movieDetail">
			<view>
				<image class="movieCover" :src="trailerInfo.cover"></image>
			</view>
			<view class="movieInfo">
				<text class="movieName">{{trailerInfo.name}}</text>
				<text class="basicInfo">{{trailerInfo.basicInfo}}</text>
				<text class="basicInfo">{{trailerInfo.originalName}}</text>
				<text class="basicInfo">{{trailerInfo.releaseDate}}</text>
				<view class="scoreDetail">
					<view class="scoreTitle" v-if="trailerInfo.score>=0">
						评分:<Score :score="trailerInfo.score"></Score>
					</view>
					<view class="scoreInfo">
						<text class="score">{{trailerInfo.score}}</text>
						<text class="praiseCount">{{trailerInfo.prisedCounts}}个点赞</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from "@/request/request.js"
	import Score from "@/components/Score.vue"
	export default{
		components:{
			Score
		},
		data(){
			return{
				currentTrailer:'',
				trailerInfo:[],
			}
		},
		onLoad(options){
			this.currentTrailer=options.trailerId;
			this.getCurrentTrailer();
		},
		methods:{
			async getCurrentTrailer(){
				const res=await request(`/search/trailer/${this.currentTrailer}?qq=2622870670`,"POST");
				this.trailerInfo=res.data;
				console.log(this.trailerInfo);
			}
		}
	}
</script>

<style>
/*视频播放*/
.movie{
	display: flex;
	justify-content: center;
	background-color: balck;
}
.movieItem{
	width: 100%;
	height: 440upx;
}
/*电影信息*/
.movieDetail{
	display: flex;
	padding:20upx;
	background-color: #f7f4f8;
}
.movieDetail .movieCover{
	height: 400upx;
	width: 300upx;
}
.movieInfo{
	width: 400upx;
	display: flex;
	flex-direction: column;
	margin-left: 15upx;
}
.movieInfo>.movieName{
	font-size: 20px;
}
.movieInfo>.basicInfo{
	font-size: 16px;
	color:darkgray;
}
.movieInfo>.scoreDetail{
	width: 350upx;
	height: 130upx;
	background-color: white;
	color:darkgray;
}
.scoreDetail{
	margin-top: 30upx;
	padding: 20upx;
	box-shadow:2px 2px 10px  #e7e5e6;
}
.scoreDetail .scoreTitle{
	font-size: 14px;
	display: flex;
	justify-content: space-between;
}
.scoreDetail .scoreInfo{
	display: flex;
	justify-content: center;
	align-items: center;
}
.scoreDetail .scoreInfo .score{
	color:yellow;
	font-weight: bold;
	font-size: 22px;
	margin-right: 40upx;
}
</style>
