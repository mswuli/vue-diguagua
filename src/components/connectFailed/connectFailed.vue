<template>
  <div class="topBar">
    <Header :title="title" :isback="isback"/>
    <div class="main">
      <img src="../../assets/imgs/connect.png" alt>
    </div>
    <div class="connect">{{connect}}</div>
    <div class="name" @click="connectAgain">
      <p class="agagin">重试</p>
    </div>
  </div>
</template>

<script>
import Header from "../common/Header";
export default {
  name: "connectFailed",
  data() {
    return {
      title: "网络连接失败",
      isback: true,
      connect: "请检查网络后重新加载"
    };
  },
  components: {
    Header
  },
  methods:{
      connectAgain(){
             if(navigator.onLine){
             	this.$router.go(-1);
					    //console.log('online');
					    }else{
					    	//this.$toast("网络错误");
					    //console.log('offline');
					   }
      }
  }
};
</script>

<style scoped lang="less" type="text/less">
.main {
  display: flex;
  justify-content: center;
  align-items: Center;
  margin-top: 2.77rem;
  img {
    width: 2.78rem;
    height: 3.1rem;
    border-radius: 50%;
  }
}
.connect {
  display: flex;
  justify-content: center;
  align-items: Center;
  margin-top: 0.7rem;
  font-family: PingFang-SC-Medium;
  font-size: 0.28rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 59px;
  letter-spacing: 2px;
  color: #000005;
}
.name {
  padding: 0 0.5rem;
  .agagin {
    display: flex;
    justify-content: center;
    align-items: Center;
    margin-top: 0.8rem;
    padding: 0.27rem 2.89rem;
    background-color: #ff6400;
    border-radius: 0.1rem;
    color: white;
  }
}
</style>
