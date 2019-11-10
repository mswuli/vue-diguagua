<template>
  <div id="app"><!-- 是否强制更新 -->
    <!--<router-view/>-->
    <!--页面返回不刷新-->
    <!--<keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <navigation>
    <router-view></router-view>
  </navigation>
  </div>
</template>

<script>
(function(doc, win) {
  let docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (clientWidth >= 750) {
        docEl.style.fontSize = "50px";
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
      }
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);

  doc.addEventListener("plusready", function() {
    var webview = plus.webview.currentWebview();
    plus.key.addEventListener("backbutton", function() {
      webview.canBack(function(e) {
        if (e.canBack) {
          webview.back();
        } else {
          //webview.close(); //hide,quit
          //plus.runtime.quit();
          //首页返回键处理
          //处理逻辑：1秒内，连续两次按返回键，则退出应用；
          var first = null;
          plus.key.addEventListener(
            "backbutton",
            function() {
              //首次按键，提示‘再按一次退出应用’
              if (!first) {
                first = new Date().getTime();
                this.$toast("再按一次退出应用");
                setTimeout(function() {
                  first = null;
                }, 1000);
              } else {
                if (new Date().getTime() - first < 1500) {
                  plus.runtime.quit();
                }
              }
            },
            false
          );
        }
      });
    });
  });
})(document, window);
export default {
  name: "App",
  data() {
    return {
      chose: {}
    };
  },
  created() {
    // this.$http.post('appServiceFarmhouse/getCityData').then(res => {
    //   localStorage.setItem("id", res.data.currentCity.id);
    // }).catch(error => {
    //   this.$toast('网络错误')
    // })
  },
  mounted() {
    window.onbeforeunload = function() {
    	/*
     * 为了下次打开网页不需要选择城市，需要存在localStorage里面(5)
     */
     //localStorage.setItem("popped","");
    };
  },
  methods:{
  }
};

// // 网络连接判断
// if(navigator.onLine){
//
//   alert('online');
//
// }else{
//
//   alert('offline');
//
// }
</script>


<style lang="less" type="text/less">
@import "./style/ba.less";
@media screen and (min-width: 540px) {
  #app {
    width: 540px;
  }
}
#app {
  width: 100%;
  margin: 0 auto !important;
}
</style>


<!--sessionStorage.setItem("popped", "");-->
