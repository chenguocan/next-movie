<template>
	<view class="page">
		<swiper class="carouselSwiper">
			<swiper-item>
				<image src="../../static/carousel/batmanvssuperman.png"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/carousel/spiderman.png"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

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


</style>
