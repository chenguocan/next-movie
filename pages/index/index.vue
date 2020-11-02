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
			<scroll-view class="movieScroll" scroll-x="true">
				<view class="movie">
					<image src="../../static/poster/civilwar.jpg"></image>
					<view class="movieName">蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠</view>
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
			}
		},
		onLoad() {
			this.getcarouselList();
		},
		methods: {
			async getcarouselList(){
				const res=await request("/carousel/list?qq=2622870670","POST");
				this.carouselList=res.data;
			}
		},
		
	}
</script>

<style>
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
.main{
	margin-left: 12upx;
}
.main .movieScroll{
	display: inline-block;
}
.main .movieScroll .movie image{
	width: 200upx;
	height: 270upx;
}
.movieName{
	width: 200upx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

</style>
