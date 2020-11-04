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
						综合评分:<Score :score="trailerInfo.score"></Score>
					</view>
					<view class="scoreInfo">
						<text class="score">{{trailerInfo.score}}</text>
						<text class="praiseCount">{{trailerInfo.prisedCounts}}个点赞</text>
					</view>
				</view>
			</view>
		</view>
		<Separator></Separator>
		<!--剧情简介-->
		<view class="plot">
			<view class="title">剧情简介</view>
			<text class="synopsis">
				{{trailerInfo.plotDesc}}
			</text>
		</view>
		<Separator></Separator>
		<!--演职人员-->
		<view class="actorList">
			<view class="title">演职人员</view>
			<scroll-view class="movieGroup" scroll-x="true">
				<view class="photoList">
					<view class="photoItem" v-for="(directorItem,directorIndex) in directorList" :key="directorItem.staffId">
						<image class="photo" :src="directorItem.photo" :data-photoIndex="directorIndex" @click="previewActorsPhoto"></image>
						<view class="actName">{{directorItem.actName}}</view>
						<view class="name">{{directorItem.name}}</view>
					</view>
					<view class="photoItem" v-for="(actorItem,actorIndex) in actorList"  :key="actorItem.staffId">
						<image class="photo" :src="actorItem.photo" :data-photoIndex="actorIndex + directorList.length" @click="previewActorsPhoto"></image>
						<view class="actName">{{actorItem.actName}}</view>
						<view class="name">{{actorItem.name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<Separator></Separator>
		<!--剧照-->
		<view class="stage">
			<view class="title">剧照</view>
			<scroll-view scroll-x="true">
				<view class="stageList">
					<view class="stageItem" v-for="(plotPicItem,plotPicIndex) in plotPics" :key="plotPicIndex">
						<image class="stagePhoto" mode="aspectFill" :data-plotpicIndex="plotPicIndex" :src="plotPicItem" @click="previewStagePhoto"></image>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import request from "@/request/request.js"
	import Score from "@/components/Score.vue"
	import Separator from "@/components/Separator.vue"
	export default{
		components:{
			Score,
			Separator
		},
		data(){
			return{
				currentTrailer:'',
				trailerInfo:[],
				actorList:[],
				directorList:[],
				trailerDetail:[],
				plotPics:[],
				photoList:[],
			}
		},
		onLoad(options){
			uni.setNavigationBarColor({
				frontColor:'#ffffff',
				backgroundColor:'#666666'
			});
			this.currentTrailer=options.trailerId;
			this.getCurrentTrailer();
			this.getActors();
			this.getDirector();
			this.getTrailerDetail();
		},
		methods:{
			async getCurrentTrailer(){
				const res=await request(`/search/trailer/${this.currentTrailer}?qq=2622870670`,"POST");
				this.trailerInfo=res.data;
				console.log(this.trailerInfo);
			},
			async getActors(){
				const res=await request(`/search/staff/${this.currentTrailer}/2?qq=2622870670`,"POST");
				this.actorList=res.data;
			},
			async getDirector(){
				const res=await request(`/search/staff/${this.currentTrailer}/1?qq=2622870670`,"POST");
				this.directorList=res.data;
				console.log(res.data);
			},
			async getTrailerDetail(){
				const res=await request(`/search/trailer/${this.currentTrailer}?qq=2622870670`,"POST");
				this.trailerDetail=res.data;
				if(this.trailerDetail.plotPics){
					this.plotPics=JSON.parse(this.trailerDetail.plotPics);
				}
			},
			previewStagePhoto(e){
				let currentIndex=parseInt(e.currentTarget.dataset.plotpicindex);
				uni.previewImage({
					current:currentIndex,
					urls:this.plotPics
				})
			},
			previewActorsPhoto(e){
				if(this.actorList){
					let allList=this.directorList.concat(this.actorList);
					let photoList=[];
					let currentIndex=parseInt(e.currentTarget.dataset.photoindex);
					allList.forEach(item=>photoList.push(item.photo));
					uni.previewImage({
						current:currentIndex,
						urls:photoList
					})
				}
			}
		},
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
	color:#ffc233;
	font-weight: bold;
	font-size: 22px;
	margin-right: 40upx;
}
/*剧情简介*/
.plot,.actorList,.stage{
	padding:0 20upx 20upx 20upx;
	background-color: #f7f4f8;
}
.title{
	color:darkgray;
}
/*演职人员*/
.movieGroup{
	margin-top:10upx;
}

.movieGroup .photoItem .photo,.stagePhoto{
	height: 300upx;
	width: 200upx;
	margin-right: 20upx;
}
.movieGroup .photoList,.stageList{
	display: flex;
}

.movieGroup .photoList .actName{
	width: 200upx;
	text-align: center;
	color:darkgray;
}
.movieGroup .photoList .name{
	width: 200upx;
	color:darkgray;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
/*剧照*/
</style>
