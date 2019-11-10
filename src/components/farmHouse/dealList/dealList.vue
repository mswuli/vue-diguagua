<template>
  <div>
    <div class="topBar">
      <Header :title='title' :isback='isback'/>
    </div>
    <!--<Search/>-->
    <Specil :rows="rows"/>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../../common/Header';
  import Search from "../common/search"
  import Specil from "./components/specil"
  import Footer from "../../common/Footer"

  export default {
    name: "dealList",
    data() {
      return {
        rows: [],
        title: '成交列表',
        isback: true,
        scrollTop: '',
        // color: '#FF6400',

      }
    },
    components: {
      Header,
      Search,
      Specil,
      Footer,
    },
    methods: {
      handelscroll() {
        this.scrollTop = document.body.scrollTop|| document.documentElement.scrollTop || window.pageYOffset
      },
    },
    created: function () {
    },
    mounted () {
      document.addEventListener('scroll',this.handelscroll)
    },
    deactivated (){
      sessionStorage.setItem('scrollTop',this.scrollTop)
    },
    activated () {
      document.body.scrollTop =document.documentElement.scrollTop = window.pageYOffset =sessionStorage.getItem('scrollTop')
    },
  }
</script>

<style scoped lang="less" type="text/less">

</style>
