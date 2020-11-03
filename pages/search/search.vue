<template>
	<view class="searchPage">
		<!--搜索框-->
		<view class="search">
			<image  class="searchIco" src="../../static/icos/search.png"></image>
			<input  class="searchInput" type="text" v-model="searchValue" maxlength="10" confirm-type="search" placeholder="搜索预告片" @confirm="submitSearch"/>
		</view>
		<!--搜索结果列表-->
		<view class="searchTrailerList">
			<view class="trailerItem" v-for="trailerItem in trailerList" :key="trailerItem.id">
				<image :src="trailerItem.poster" class="poster"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import request from "@/request/request.js";
	import requestLoading from "@/request/requestLoading.js";
	export default {
		data() {
			return {
				trailerList:[],
				searchValue:'',
				page:2,
				pageSize:7,
				total:0,
			}
		},
		onLoad(){
			this.getSearchList();
		},
		onUnload(){
			this.page=2;
			this.total=0;
		},
		onReachBottom(){
			uni.showLoading({
				mask:true,
				title:'Loading'
			})
			 this.refresh();
		},
		methods: {
			async getSearchList(keywords,page=1,pageSize=14){
				if(!keywords){
					const res=await requestLoading(`/search/list?keywords=&&page=${page}&&pageSize=${pageSize}&&qq=2622870670`,"POST");
					console.log(res.data);
					this.total=res.data.total;
					this.trailerList=res.data.rows;
					console.log(this.trailerList);
					return;
				}
				const res=await requestLoading(`/search/list?keywords=${keywords}&&page=${page}&&pageSize=${pageSize}&&qq=2622870670`,"POST");
				this.trailerList=res.data.rows;
			},
			submitSearch(){
				this.getSearchList(this.searchValue);
			},
			async refresh(){
				let temptrailerList=this.trailerList;
				this.page++;
				if(this.page > this.total){
					return;
				}
				await this.getSearchList(null,this.page,this.pageSize);
				this.trailerList=temptrailerList.concat(this.trailerList);
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
	margin-left: 30upx;
	display: flex;
	flex-wrap: wrap;
}

.searchTrailerList>.trailerItem>.poster{
	height: 260upx;
	width: 220upx;
	margin-bottom: 15upx;
	margin-right: 20upx;
}
</style>
