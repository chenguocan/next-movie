<template>
	<view class="player">
		<view class="movie">
			<video class="movieItem" :src="trailerInfo.trailer" :poster="trailerInfo.poster" controls></video>
		</view>
	</view>
</template>

<script>
	import request from "../../request/request.js"
	export default{
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
			}
		}
	}
</script>

<style>
.movie{
	display: flex;
	justify-content: center;
	background-color: balck;
}
.movieItem{
	width: 100%;
	height: 440upx;
}
</style>
