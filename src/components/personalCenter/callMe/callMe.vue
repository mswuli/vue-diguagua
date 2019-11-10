<template>
	<div class="">
		<Header :title="title" :isback="true"/>
		<div style="padding: 1rem .3rem; box-sizing: border-box; font-size: .28rem;">
			<center><h3>江苏易地宝网络科技有限公司</h3></center>
			<br /> 电话: 400-867-5288
			<br /> 地址: 江苏省南京市秦淮区菱角市66号国家领军人才创业园27幢204
			<br />
			<br />
			<br /> 
			<center><h3>武汉分公司</h3></center>
			<br /> 电话: 027-65770321
			<br /> 地址: 武汉市江岸区金桥大道117号市民之家3023室
		</div>
	</div>
</template>
<script>
	import Header from "../../common/Header2";
	export default {
		name: 'callMe',
		components: {
			Header
		},
		data() {
			return {
				title: "联系我们"
			}
		},
		created() {},
		methods: {}
	}
</script>