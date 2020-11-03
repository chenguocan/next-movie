<template>
	<view class="searchPage">
		<!--搜索框-->
		<view class="search">
			<image  class="searchIco" src="../../static/icos/search.png"></image>
			<input  class="searchInput" type="text" maxlength="10" confirm-type="search" placeholder="搜索预告片"/>
		</view>
		<!--搜索结果列表-->
		<view class="searchTrailerList">
			<image src="../../static/poster/civilwar.jpg"></image>
			<image src="../../static/poster/civilwar.jpg"></image>
			<image src="../../static/poster/civilwar.jpg"></image>
			<image src="../../static/poster/civilwar.jpg"></image>
			<image src="../../static/poster/civilwar.jpg"></image>
			<image src="../../static/poster/civilwar.jpg"></image>
			<image src="../../static/poster/civilwar.jpg"></image>
			<image src="../../static/poster/civilwar.jpg"></image>
			<image src="../../static/poster/civilwar.jpg"></image>
			<image src="../../static/poster/civilwar.jpg"></image>
			<image src="../../static/poster/civilwar.jpg"></image>
			<image src="../../static/poster/civilwar.jpg"></image>
			<image src="../../static/poster/civilwar.jpg"></image>
		</view>
	</view>
</template>

<script>
	import request from "@/request/request.js";
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			this.getSearchList();
		},
		methods: {
			async getSearchList(){
				const res=await request("/search/list","POST");
				console.log(res);
			}
		}
	}
</script>

<style>
/*搜索框*/
.search{
	display: flex;
	width: 100%;
	height: 100upx;
	justify-content: center;
	align-items: center;
	background-color: #f7f5f8;
	position: fixed;
	z-index:10;
}
.searchIco{
	width: 40upx;
	height: 40upx;	
	padding:10upx;
}
.searchInput{
	background-color: #efefef;
	height: 40upx;
	width: 500upx;
	padding:10upx;
}
/*预告片*/
.searchTrailerList{
	padding-top:100upx;
	margin-left: 20upx;
}
.searchTrailerList>image{
	height: 300upx;
	width: 220upx;
	margin-bottom: 15upx;
	margin-right: 20upx;
}
</style>
