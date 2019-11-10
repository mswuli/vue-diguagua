<template>
  <h1>
    <van-popup v-model="show" :close-on-click-overlay="false" class="fadeOut">
      <div class="mainTitle">
        <div class="top">
          <div class="left">
            <img src="../../assets/imgs/newversion.png" alt>
          </div>
          <div class="right">
            <div>{{newVersion}}</div>
            <div>{{versionMess.versionName}}</div>
          </div>
          <div class="iconfont icon-fork" @click="closeShow"></div>
        </div>
        <div class="main">
          <div v-for="(item,index) in versionMess.versionDescription" :key="index">· {{item}}</div>
        </div>
      </div>
      <div class="bottom" @click="platformType">立即更新</div>
    </van-popup>
  </h1>
</template>

<script>
export default {
  name: "newVersion",
  props: {
    versionMess: {
      type: Object,
      required: true
    },
    isUpdate: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      show: true,
      newVersion: "发现新版本啦",
      number: "1.2.3来啦",
      newLisrt: [
        { name: "全新版本" },
        { name: "修复xxxbug" },
        { name: "升级用户体验" }
      ]
    };
  },
  methods: {
    closeShow() {
    	if(!this.isUpdate){//不需要强制更新时
    		this.show = false;
      	sessionStorage.setItem("noNeedVersionShow",true);
    	}else{
    		this.$toast('当前版本不可用，请点击下方【立即下载】按钮更新应用！')
    	}
    },
    platformType() {
      var userAgent = navigator.userAgent;
      var isAndroid =
        userAgent.indexOf("Android") > -1 || userAgent.indexOf("Adr") > -1; //android终端
      var isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      console.info("是否是Android：" + isAndroid);
      console.info("是否是iOS：" + isiOS);
      if(isAndroid){
        if(this.versionMess.resourceUrl){
          window.open("http://"+this.versionMess.resourceUrl)
        }
      }
      if(isiOS){
        if(this.versionMess.iosResourceUrl){
          window.open("http://"+this.versionMess.iosResourceUrl)
        }
      }
      sessionStorage.setItem("noNeedVersionShow",true);
    }
  },
  created: function() {
    console.log(this.versionMess);
    this.versionMess.versionDescription = eval(
      this.versionMess.versionDescription
    );
  }
};
</script>

<style scoped lang="less" type="text/less">
.fadeOut {
  width: 5.67rem;
  min-height: 3.62rem;
  overflow-y: inherit !important;
  .mainTitle {
    .top {
      position: relative;
      .left {
        position: absolute;
        top: -1.2rem;
      }
      .right {
        position: absolute;
        right: 1.2rem;
        top: -0.5rem;
        font-family: FZY3K--GBK1-0;
        font-size: 0.33rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.49rem;
        letter-spacing: 0.01rem;
        color: #ffffff;
      }
      .iconfont {
        position: absolute;
        right: 0;
        top: -0.7rem;
        color: white;
        font-size: 0.5rem;
      }
    }
    .main {
      position: absolute;
      top: 1.5rem;
      width: 100%;
      padding-left: 0.91rem;
      font-family: PingFang-SC-Medium;
      font-size: 0.28rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 0.49rem;
      letter-spacing: 0.01rem;
      color: #000005;
    }
  }
  .bottom {
    position: fixed;
    width: 100%;
    height: 0.9rem;
    background-color: #ff6400;
    text-align: center;
    line-height: 0.9rem;
    margin-top: 3.2rem;
    font-family: PingFang-SC-Medium;
    font-size: 0.36rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0.02rem;
    color: #ffffff;
    border-radius: 0 0 0.3rem 0.3rem;
  }
}
.main {
  overflow-y: scroll;
  height: 1.5rem;
}
</style>
