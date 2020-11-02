<template>
	<view class="page">
		<!--轮播图-->
		<swiper class="carouselSwiper">
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
						<Score :score="hotSuperHeroItem.score"></Score>
					</view>
				</view>
			</scroll-view>
			<NavTitle image="../../static/icos/interest.png" title="热门预告"></NavTitle>
			<view class="trailerList">
				<view class="trailerItem" v-for="trailerItem in trailerList" :key="trailerItem.id">
					<video :src="trailerItem.trailer" controls="true"></video>			
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
			}
		},
		onLoad() {
			this.getSuperHeroHotList();
			this.getCarouselList();
			this.getTrailerList();
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
				console.log(this.trailerList);
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
</style>
