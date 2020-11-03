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
	import requestLoading from "@/request/requestLoading.js"
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
				praiseAnimationArray:[],
			}
		},
		onLoad() {
			this.getSuperHeroHotList();
			this.getCarouselList();
			this.getTrailerList();
			this.getGuessLikeList();
		},
		onUnload(){
			this.praiseAnimationArray=[];
			this.praiseAnimation={};
		},
		onPullDownRefresh(){
			this.refresh();
		},
		methods: {
			refresh(){
				uni.showLoading({
					mask:true
				})
				uni.startPullDownRefresh();
				this.getGuessLikeLoading();
			},
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
				const res=await request("/index/guessULike?qq=2622870670","POST");
				this.guessLikeList=res.data;
			},
			async getGuessLikeLoading(){
				const res=await requestLoading("/index/guessULike?qq=2622870670","POST");
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
@import url("index.css");
</style>
