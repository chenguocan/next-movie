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
			<scroll-view class="hotScroll" scroll-x="true" enable-flex="true">
				<view class="hotList">
					<view class="hotItem" v-for="hotItem in hotList" :key="hotItem.id">
						<image :src="hotItem.poster"></image>
						<view class="movieName">{{hotItem.name}}</view>
						<view class="hotScore">
							<image src="../../static/icos/star-yellow.png"></image>
							<image src="../../static/icos/star-yellow.png"></image>
							<image src="../../static/icos/star-yellow.png"></image>
							<image src="../../static/icos/star-yellow.png"></image>
							<image src="../../static/icos/star-gray.png"></image>
							<text class="score">{{hotItem.score}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		
		</view>
	</view>
</template>

<script>
	import request from "../../request/request.js"
	import NavTitle from "../../components/NavTitle/NavTitle.vue"
	export default {
		comments:['NavTitle'],
		data() {
			return {
				carouselList:[],
				hotList:[],
			}
		},
		onLoad() {
			this.getHotList();
			this.getCarouselList();
		},
		methods: {
			async getCarouselList(){
				const res=await request("/index/carousel/list?qq=2622870670","POST");
				this.carouselList=res.data;
			},
			async getHotList(){
				const res=await request("/index/movie/hot?type=superhero&&qq=2622870670","POST");
				this.hotList=res.data;
				console.log(this.hotList);
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
	margin-left: 12upx;
}
.main .hotScroll .hotList{
	display: flex;
}
.hotItem image{
	width: 200upx;
	height: 270upx;
}
.hotItem{
	margin-right: 16upx;
}
.movieName{
	width: 200upx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.hotScore image{
	width: 20upx;
	height: 20upx;
}
.hotScore .score{
	margin-left: 6upx;
	font-size: 13px;
}
</style>
