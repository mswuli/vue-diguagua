<template>
	<div id="locationAnnotation">
		<van-button type="default" class="back"><van-icon name="arrow-left" @click="back"/></van-button>
		<div class="thisTopBarFa"  id="thisTopBarFa">
			<van-search class="thisTopBar" id="thisTopBar" @click="showList" v-model="keyword" placeholder="请输入区域/关键字" show-action shape="round" @search="onSearch">
				<div slot="action" @click="onSearch">搜索</div>
			</van-search>
		</div>
		<!-- 地图 -->
		<div id="l-map" :style="{height:mapHeight}"></div>
		<div class="thisBootomBar">
			<van-button :block="true" @click="toLocalPlace"><van-icon name="aim" size="0.5rem"></van-icon><span>当前位置</span></van-button>
			<van-button type="warning" :block="true" @click="confirmMap">确认坐标</van-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "locationAnnotation",
		data() {
			return {
				keyword: '',
				mapHeight: '0px',
				map: {},//当前地图的实例
				locationSpot: {//当前经纬度
					lng: '114.312',
					lat: '30.598'
				},
				local:null,//根据地址查经纬度
				localPlace:null,//查找当前所在地址的函数
				location:'',//当前地址
			}
		},
		methods: {
			//搜索地址
			onSearch() {
				if(this.keyword){
					this.local.search(this.keyword);
				}else{
					this.localPlace && this.localPlace();
				}
			},
			//显示“地址搜索的热词/推荐词/搜索建议”
			showList(){
				this.$nextTick(function(){
					document.getElementsByClassName("tangram-suggestion-main")[document.getElementsByClassName("tangram-suggestion-main").length-1].style.visibility="visible";
				})
			},
			//确认坐标
			confirmMap(){
				sessionStorage.setItem("localPlace", this.location);
				sessionStorage.setItem("locationSpot", JSON.stringify(this.locationSpot));
				this.$router.go(-1);
			},
			back(){
				this.$router.go(-1);
			},
			//当前位置
			toLocalPlace(){
				this.localPlace && this.localPlace();
			}
		},
		created() {
			this.mapHeight = window.innerHeight + 'px';
		},
		mounted() {
			const _this = this;
			var map = new BMap.Map('l-map');
			//var locationSpot = this.$route.params.locationSpot;
			map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
			//获取当前位置
			function localPlace(){
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r){
					if(this.getStatus() == BMAP_STATUS_SUCCESS){
						var mk = new BMap.Marker(r.point);
						map.clearOverlays(); //清除地图上所有覆盖物
						console.log('您的位置：'+r.point.lng+','+r.point.lat);
						map.setCurrentCity(sessionStorage.getItem('cityName'));
						map.centerAndZoom(new BMap.Point(r.point), 15);
						map.addOverlay(mk);
						map.panTo(r.point);//设置为地图中心
						_this.locationSpot.lng = r.point.lng;
						_this.locationSpot.lat = r.point.lat;
						let address = r.address;
						_this.location = "";
						let str = "";
						if(address.province){
							str += address.province;
						}
						if(address.city){
							str += address.city;
						}
						if(address.district){
							str += address.district;
						}
						if(address.street){
							str += address.street;
						}
						if(address.business){
							str += address.business;
						}
						_this.keyword = str;
						_this.location = str;
						//隐藏“地址搜索的热词/推荐词/搜索建议”
						for(let key = 0;key < document.getElementsByClassName("tangram-suggestion-main").length;key ++) {
							document.getElementsByClassName("tangram-suggestion-main")[key].style.visibility="hidden";
						}
					}
					else {
						//console.log('failed'+this.getStatus());
					}        
				},{enableHighAccuracy: true})
			}
			_this.localPlace = localPlace;
			//地址搜索的热词/推荐词/搜索建议
			var ac = new BMap.Autocomplete( //建立一个自动完成的对象
				{
					"input": "thisTopBar",
					"location": map
				});
			let myValue;
			ac.addEventListener('onconfirm', function(e) {
				let _value = e.item.value;
				myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
				_this.keyword = myValue;
				_this.location = myValue;
				setPlace();
			})
			function setPlace() {
				map.clearOverlays(); //清除地图上所有覆盖物
				function myFun() {
					var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
					map.panTo(new BMap.Point(pp.lng,pp.lat));//设置为地图中心
					map.centerAndZoom(pp, 15);
					map.addOverlay(new BMap.Marker(pp)); //添加标注
					// console.log(pp)
					_this.locationSpot.lng = pp.lng;
					_this.locationSpot.lat = pp.lat;
				}
				var local = new BMap.LocalSearch(map, { //智能搜索
					onSearchComplete: myFun
				});
				local.search(myValue);
			}
			//local:根据地址查经纬度
			(function (map,_this){
				map.clearOverlays(); //清除地图上所有覆盖物
				function myFun2() {
					_this.location = _this.keyword;
					try{
						var pp = local2.getResults().getPoi(0).point; //获取第一个智能搜索的结果
						map.panTo(new BMap.Point(pp.lng,pp.lat));//设置为地图中心
						map.centerAndZoom(pp, 15);
						map.addOverlay(new BMap.Marker(pp)); //添加标注
						// console.log(pp)
						_this.locationSpot.lng = pp.lng;
						_this.locationSpot.lat = pp.lat;
					}catch(e){
						console.log("这个位置查不到");
						//localPlace();
					}
				}
				var local2 = new BMap.LocalSearch(map, { //智能搜索
					onSearchComplete: myFun2
				});
				_this.local = local2;
			})(map,_this)
			//初始化定位当前位置
			if(this.$route.params.location){
				_this.keyword = this.$route.params.location;
				_this.location = this.$route.params.location;
				_this.locationSpot = this.$route.params.locationSpot;
				/**
				 * 根据经纬度，标注此经纬度的地图所在位置
				 */
				map.clearOverlays();//添加标注前清空以前的所有标注
				var point = new BMap.Point(_this.locationSpot.lng,_this.locationSpot.lat);
				// 创建点坐标
				map.centerAndZoom(point, 15);
				// 初始化地图， 设置中心点坐标和地图级别
				var marker = new BMap.Marker(point);
				map.addOverlay(marker);
				
			}else{
				if(this.$route.params.columnsName){
					_this.keyword = this.$route.params.columnsName;
					_this.location = this.keyword;
					_this.local.search(_this.keyword);
					//2个定时器是解决this.keyword已经赋值却没有在搜索栏的input显示这个值
					setTimeout(function(){
						_this.test = false;
					},50)
					setTimeout(function(){
						_this.test = true;
					},100)
				}else{
					localPlace();
				}
			}
			//地图单击事件
			function showInfo(e) {
				//alert(e.point.lng + ", " + e.point.lat);
				map.clearOverlays(); //清除地图上所有覆盖物
				//设置当前点击的经纬度加上标注
				map.addOverlay(new BMap.Marker({
					lng: e.point.lng,
					lat: e.point.lat
				}));
				map.panTo(new BMap.Point(e.point.lng,e.point.lat));//设置为地图中心
				//获取当前点击位置的地址名称
				var pt = e.point;
				_this.locationSpot = pt;
				var gc = new BMap.Geocoder();
				gc.getLocation(pt, function(rs) {
					//addressComponents对象可以获取到详细的地址信息
					var addComp = rs.addressComponents;
					var site = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
					_this.keyword = site;//设置关键词
					_this.location = site;
					//隐藏“地址搜索的热词/推荐词/搜索建议”
					for(let key = 0;key < document.getElementsByClassName("tangram-suggestion-main").length;key ++) {
						document.getElementsByClassName("tangram-suggestion-main")[key].style.visibility="hidden";
					}
				});
			}
			map.addEventListener("click", showInfo);
			//自定义图标
//			var myIcon = new BMap.Icon("../../../static/images/tb_05.png", new BMap.Size(30, 20));
//			var marker2 = new BMap.Marker(_this.locationSpot, {
//				icon: myIcon
//			}); // 创建标注
//			map.addOverlay(marker2);
			//放大缩小控件
//			var navigationControl = new BMap.NavigationControl({
//				anchor: BMAP_ANCHOR_BOTTOM_LEFT, // 靠左下角位置
//				type: BMAP_NAVIGATION_CONTROL_LARGE, // LARGE类型
//				enableGeolocation: true // 启用显示定位
//			});
//			map.addControl(navigationControl);
			_this.map = map;
		}
	}
</script>

<style>
	/*设置元素的高度撑满整个屏幕，有时设置【height:100%】还是会超过了body的高度，那么就根据fontSize来设置。因为fontSize是在“main.js”用js代码动态计算固定整个屏幕高度去除以10的，那么10rem就是满屏的高*/
	#locationAnnotation{
		height: 10rem;
	}
	.thisTopBarFa {
		position:absolute;
		top:20px;/*0*/
		z-index: 999;
		width: 70%;
		right: 10%;
	}
	/*隐藏地图左下角的版权和插件*/
	#locationAnnotation .BMap_cpyCtrl {
		display: none;
	}
	#locationAnnotation .anchorBL a {
		display: none;
	}
	
	.thisBootomBar{
		width: 100%;
		position: absolute;
		z-index:999;
		bottom: 0;
		display: flex;
	}
	.thisBootomBar button i{
		top:0.15rem
		/*line-height: 0.84rem;*/
	}
	/*body{
		overflow-y: hidden;
		overflow-x: hidden;
	}*/
	.back{
		top:20px;/*0*/
		z-index:999;
		background: rgb(242, 242, 242);
		border-width: 0px;
		left:10%
	}
	.back:before{
		background: rgb(242, 242, 242);
		cursor:pointer ;
	}
	#l-map{
		top: -0.9rem;
	}
	.tangram-suggestion-main{
		width: 53.5%!important;
		left: 24%!important;
	}
</style>