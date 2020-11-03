<template>
	<view class="page">
		<!--轮播图-->
		<swiper class="carouselSwiper" autoplay="true">
			<swiper-item  v-for="(item,index) in carouselList" :key="item.id">
				<image :src="item.image"></image>
			</swiper-item>
		</swiper>
		<view class="main">
			<!--超英预告-->
			<NavTitle image="../../static/icos/hot.png" title="超英预告"></NavTitle>
			<scroll-view class="hotSuperHeroScroll" scroll-x="true" enable-flex="true">
				<view class="hotSuperHeroList">
					<view class="hotSuperHeroItem" v-for="hotSuperHeroItem in hotSuperHeroList" :key="hotSuperHeroItem.id">
						<image :src="hotSuperHeroItem.poster"></image>
						<view class="movieName">{{hotSuperHeroItem.name}}</view>
						<Score :score="hotSuperHeroItem.score" isShow="yes"></Score>
					</view>
				</view>
			</scroll-view>
			<!--热门预告-->
			<NavTitle image="../../static/icos/interest.png" title="热门预告"></NavTitle>
			<view class="trailerList">
				<view class="trailerItem" v-for="trailerItem in trailerList" :key="trailerItem.id">
					<video :src="trailerItem.trailer" :poster="trailerItem.poster" controls="true"></video>			
				</view>
			</view>
			<!--猜你喜欢-->
			<NavTitle image="../../static/icos/guess-u-like.png" title="猜你喜欢"></NavTitle>
			<view class="likeList">
				<view class="likeItem" v-for="(guessLikeItem,gIndex) in guessLikeList" :key="guessLikeItem.id">
					<view class="moviePoster">
						<image :src="guessLikeItem.poster"></image>
					</view>
					<view class="movieDesc">
						<view class="movieName">{{guessLikeItem.name}}</view>
						<Score :score="guessLikeItem.score"></Score>
						<view class="movieDetail">{{guessLikeItem.basicInfo}}</view>
						<view class="movieTime">{{guessLikeItem.releaseDate}}</view>
					</view>
					<view class="praiseMovie">
						<view class="praiseMe" :data-gindex="gIndex" @click="handlePraise">
							<image src="../../static/icos/praise.png"></image>
						</view>
						<text class="praiseText">点赞</text>
						<text class="praiseAdd" :animation="praiseAnimationArray[gIndex]">+1</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from "@/request/request.js"
	import NavTitle from "@/components/NavTitle.vue"
	import Score from "@/components/Score.vue"
	export default {
		components:{
			NavTitle,
			Score
		},
		data() {
			return {
				carouselList:[],
				hotSuperHeroList:[],
				trailerList:[],
				guessLikeList:[],
				praiseAnimation:{},
				praiseAnimationArray:[
					{},{},{},{},{}
				],
			}
		},
		onLoad() {
			this.getSuperHeroHotList();
			this.getCarouselList();
			this.getTrailerList();
			this.getGuessLikeList();
		},
		onUnload(){
			
			this.praiseAnimation={};
		},
		methods: {
			async getCarouselList(){
				const res=await request("/index/carousel/list?qq=2622870670","POST");
				this.carouselList=res.data;
			},
			async getSuperHeroHotList(){
				const res=await request("/index/movie/hot?type=superhero&&qq=2622870670","POST");
				this.hotSuperHeroList=res.data;
			},
			async getTrailerList(){
				const res=await request("/index/movie/hot?type=trailer&&qq=2622870670","POST");
				this.trailerList=res.data;
			},
			async getGuessLikeList(){
				const res=await request("/index/guessULike?qq=2622870670","Post");
				this.guessLikeList=res.data;
			},
			handlePraise(e){
				let index=e.currentTarget.dataset.gindex;
				this.animation=uni.createAnimation();
				this.animation.translateY(-60).opacity(1).step({
					duration:400
				});
				this.praiseAnimation=this.animation;
				//this.praiseAnimationArray[index]=this.praiseAnimation.export();
				this.$set(this.praiseAnimationArray,index,this.praiseAnimation.export());
				let time=setTimeout(function(){
					this.animation.translateY(0).opacity(0).step({
						duration:0
					});
					this.praiseAnimation=this.animation;
					this.$set(this.praiseAnimationArray,index,this.praiseAnimation.export());
				}.bind(this),500);
			}	
		},
		
	}
</script>

<style>
/*轮播图*/
.carouselSwiper{
	width: 100%;
	height: 440upx;
}
.carouselSwiper swiper-item{
	width: 100%;
	height: 100%;
}
.carouselSwiper swiper-item image{
	width: 100%;
}
/*超英预告*/
.main{
	margin:0 12upx;
}
.main .hotSuperHeroScroll .hotSuperHeroList{
	display: flex;
}
.hotSuperHeroItem image{
	width: 200upx;
	height: 270upx;
}
.hotSuperHeroItem{
	margin-right: 16upx;
}
.movieName{
	width: 200upx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
/*热门预告*/
.trailerList{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.trailerList .trailerItem{
	margin-top: 12upx;
}
.trailerList .trailerItem video{
	height: 220upx;
	width: 350upx;
}
/*猜你喜欢*/
.likeList .likeItem{
	display: flex;
}
.likeItem{
	width: 100%;
	margin-bottom: 20upx ;
}
.likeItem  image{
	width: 220upx;
	height: 270upx;
}
.likeItem .moviePoster{
	margin-right: 20upx;
}
.movieDetail,.movieTime{
	font-size: 14px;
	color:#808080;
}
.movieDesc{
	width: 400upx;
	margin-right: 15upx;	
}
.praiseMovie{
	border-left:2px dashed #808080; 
	width: 250upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.praiseMe image{
	width: 50upx;
	height: 50upx;
}
.praiseText{
	font-size: 16px;
	color:#ffc634;
}
.praiseAdd{
	opacity: 0;
	color:#ffc634;
}
</style>
