<template>
	<view class="moviePage">
		<!--视频播放-->
		<view class="movie">
			<video class="movieItem" :src="trailerInfo.trailer" :poster="trailerInfo.poster" controls></video>
		</view>
		<view class="movieDetail">
			<navigator :url="'../../components/Cover?cover=' + trailerInfo.cover">
				<image class="movieCover" :src="trailerInfo.cover"></image>
			</navigator>
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
				backgroundColor:'#58B2DC'
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
			},
			async getActors(){
				const res=await request(`/search/staff/${this.currentTrailer}/2?qq=2622870670`,"POST");
				this.actorList=res.data;
			},
			async getDirector(){
				const res=await request(`/search/staff/${this.currentTrailer}/1?qq=2622870670`,"POST");
				this.directorList=res.data;
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
@import url("movie.css");
</style>
