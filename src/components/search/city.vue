<template>
  <div id="city" class="container">
    <div class="topBar">
      <div class="iconfont icon-xiangzuo cityLeft" @click="goNext"></div>
      <div class="input">
        <div class="iconfont icon-sousuo"></div>
        <input type="text" placeholder="请输入城市" @input="inputFun">
      </div>
      <ul class="citySeclect" v-if="city">
        <li
          v-for="(item,index) in citySeclect"
          class="city"
          @click="selectCity(item)"
        >{{item.cityName}}
        </li>
      </ul>
    </div>
    <div style="width:100%; height:.92rem;"></div>
    <div class="contain-in" style="margin-bottom: .2rem">
      <p class="titin titin-noborder">当前/历史</p>
      <div style="padding-bottom: .2rem">
        <div class="act-button">
          <img
            style="width: 0.28rem; height: 0.28rem;vertical-align: middle; margin-top: -.04rem"
            src="../../assets/icon/site.png"
            alt
          >
          <span
            style="line-height: .28rem;height: .28rem; vertical-align: middle; margin-top: -.08rem;display:inline-block"
            @click="cityCenter"
          >{{currentCity}}</span>
        </div>
        <div class="act-button" v-for="(item,index) in history" @click="historyCity(item)">
          <span
            style="line-height: .28rem;height: .28rem; vertical-align: middle; margin-top: -.08rem;display:inline-block"
          >{{item.cityName}}</span>
        </div>
        <div class="refresh" @click="refreshChange">
          <img
            :style="{transition: refresh.transition,transform: refresh.transform}"
            src="../../assets/icon/refresh.png"
            alt
          >
          <!--  {} -->
        </div>
      </div>
      <p class="titin">热门城市</p>
      <div style="padding-bottom: .2rem">
        <div
          class="act-button hisotory-box"
          v-for="(item,index) in actBtn"
          :class="{ red:changeRed == index}"
          @click="change(index,item)"
        >{{item.cityName}}
        </div>
      </div>
      <!--<p class="titin">字母排序</p>-->
      <!--<div>-->
      <!--<div class="act-button" v-for="item in AtoZ">-->
      <!--{{item}}-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <div class="block"></div>
    <div class="contain-in" style="padding:0" v-for="(item,index) in zmCityInfos">
      <div>
        <p class="titin titin-pad" :id="'city'+index">{{index}} </p>
        <!--<p class="titleW">{{index}}</p>-->
        <van-cell-group>
          <van-cell v-for="item2 in item" class="search-item" value is-link @click="cityChose(item2)" :is-link="false">
            <template slot="title">
              <span class="van-cell-text">{{item2.cityName}}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
    <div class="indexList" :style="{height:cityListheight,top:cityListTop}">
    	<template v-for="(item,index) in zmCityInfos"><p @click="checkCity(index)">{{index}}</p><br /></template>
    </div>
  </div>
</template>

<script>
  import Header from "../common/header2";

  export default {
    components: {
      Header
    },
    name: "search",
    data() {
      return {
        title: "选择城市",
        actBtn: [],
        inputValue: "",
        currentCity: "",
        city: false,
        actCity: [],
        array: [],
        history: [],
        zmCityInfos: [],
        citySeclect: [],
        map: "搜索",
        centerCity: {},
        changeRed: -1,
        worldNum: true,
        cityShow: true,
        // 刷新控制
        refresh: {
          transition: ".5s linear",
          transform: "rotate(0deg)",
          clickTimes: 1
        },

        searchData: {
          value: ""
        },
        cityListheight:'0rem',
        cityListTop:'0rem'
      };
    },
    methods: {
      refreshChange() {
        var clickTimes = this.refresh.clickTimes;
        (this.refresh.transition = ".5s linear"),
          (this.refresh.transform = "rotate(" + 360 * clickTimes + "deg)");
        setTimeout(res => {
          clickTimes++;
          this.refresh.clickTimes = clickTimes;
          this.init()
        }, 1800);
      },
      inputFun(e) {
        this.inputValue = e.target.value;
        this.city = true;
        if (this.inputValue === "") {
          this.city = false;
        }
        var _this = this;
        setTimeout(function () {
          _this.$http
            .post("appServiceFarmhouse/getCityByName", {
              cityName: _this.inputValue
            })
            .then(res => {
              this.city = true;
              _this.citySeclect = res.data;
              if (res.data.length !== 0) {
                if (_this.inputValue == _this.citySeclect[0].cityName) {
                  var oLi = (document.getElementsByTagName("li")[0].style.color =
                    "#fb5900");
                  console.log(oLi);
                }
              }

            });
        }, 1500);
      },
      selectCity(item) {
        this.city = false;
        this.inputValue = item;
        console.log(item);
        sessionStorage.setItem("key", item.cityRestfulDictionary);
        sessionStorage.setItem("id", item.id);
        sessionStorage.setItem("cityName", item.cityName);
        /*
		     * 为了下次打开网页不需要选择城市，需要存在localStorage里面(3)
		     */
		    localStorage.setItem(
		      "key",
		      sessionStorage.getItem("key")
		    );
		    localStorage.setItem("id", sessionStorage.getItem("id"));
		    localStorage.setItem("cityName", sessionStorage.getItem("cityName"));
        this.$router.push({
          path: "/"
        });
        var items = [];
        var item = item;
        if (window.localStorage.getItem("selectCity")) {
          items = JSON.parse(window.localStorage.getItem("selectCity"));
          for (var i = 0; i < items.length; i++) {
            if (items[i] == item) {
              items.splice(i, 1);
            }
          }
          if (item && item != "") {
            items.push(item);
          }
          if (items.length >= 10) {
            items.splice(0, 1);
          }
        } else {
          if (item && item != "") {
            items.push(item);
          }
        }
        // var obj = {};
        // items = items.reduce(function (item, next) {
        //   obj[next.key] ? '' : obj[next.key] = true && item.push(next);
        //   return item;
        // }, []);
        // console.log(items);
        var result = [];
        var obj = {};
        for (var i = 0; i < items.length; i++) {
          if (!obj[items[i].key]) {
            result.push(items[i]);
            obj[items[i].key] = true;
          }
        }
        window.localStorage.setItem("selectCity", JSON.stringify(result));
      },
      change(index, item) {
        this.changeRed = index;
        console.log(item);
        sessionStorage.setItem("key", item.cityRestfulDictionary);
        sessionStorage.setItem("id", item.id);
        sessionStorage.setItem("cityName", item.cityName);
        /*
		     * 为了下次打开网页不需要选择城市，需要存在localStorage里面(4)
		     */
		    localStorage.setItem(
		      "key",
		      sessionStorage.getItem("key")
		    );
		    localStorage.setItem("id", sessionStorage.getItem("id"));
		    localStorage.setItem("cityName", sessionStorage.getItem("cityName"));
        this.$router.push({
          path: "/"
        });
      },
      goNext() {
        this.$router.go(-1);
      },
      cityChose(cityName) {
        console.log(cityName);
        sessionStorage.setItem("key", cityName.cityRestfulDictionary);
        sessionStorage.setItem("id", cityName.id);
        sessionStorage.setItem("cityName", cityName.cityName);
        localStorage.setItem("id", cityName.id);
        /*
		     * 为了下次打开网页不需要选择城市，需要存在localStorage里面(6)
		     */
		    localStorage.setItem(
		      "key",
		      sessionStorage.getItem("key")
		    );
		    localStorage.setItem("id", sessionStorage.getItem("id"));
		    localStorage.setItem("cityName", sessionStorage.getItem("cityName"));
				sessionStorage.setItem("popped", "showTrue");
        this.$router.push({
          path: "/"
        });
      },
      historyCity(cityName) {
        sessionStorage.setItem("key", cityName.cityRestfulDictionary);
        sessionStorage.setItem("id", cityName.id);
        sessionStorage.setItem("cityName", cityName.cityName);
        /*
		     * 为了下次打开网页不需要选择城市，需要存在localStorage里面(7)
		     */
		    localStorage.setItem(
		      "key",
		      sessionStorage.getItem("key")
		    );
		    localStorage.setItem("id", sessionStorage.getItem("id"));
		    localStorage.setItem("cityName", sessionStorage.getItem("cityName"));
		     sessionStorage.setItem("popped", "showTrue");
        this.$router.push({
          path: "/"
        });
      },
      cityCenter() {
        console.log(this.centerCity);
        if (sessionStorage.getItem("key")) {
          this.centerCity.cityRestfulDictionary = sessionStorage.getItem("key");
        }
        if (sessionStorage.getItem("id")) {
          this.centerCity.id = sessionStorage.getItem("id");
        }
        if (sessionStorage.getItem("cityName")) {
          this.centerCity.cityName = sessionStorage.getItem("cityName");
        }
        sessionStorage.setItem("key", this.centerCity.cityRestfulDictionary);
        sessionStorage.setItem("id", this.centerCity.id);
        sessionStorage.setItem("cityName", this.centerCity.cityName);
        sessionStorage.setItem("popped", "showTrue");
        /*
		     * 为了下次打开网页不需要选择城市，需要存在localStorage里面(7)
		     */
		    localStorage.setItem(
		      "key",
		      sessionStorage.getItem("key")
		    );
		    localStorage.setItem("id", sessionStorage.getItem("id"));
		    localStorage.setItem("cityName", sessionStorage.getItem("cityName"));
        this.$router.push({
          path: "/"
        });
      },
      init() {
        this.$http.post("appServiceFarmhouse/getCityData").then(res => {
          this.actBtn = res.data.hotCitys;
          this.zmCityInfos = res.data.zmCityInfos;
          /*获取对象的属性个数*/
         	let attributeCount = function(obj) {
			        let count = 0;
			        for(let i in obj) {
			            if(obj.hasOwnProperty(i)) {  // 建议加上判断,如果没有扩展对象属性可以不加
			                count++;
			            }
			        }
			        return count;
			    }
          this.cityListheight = (0.8*attributeCount(this.zmCityInfos))+'rem';
          this.cityListTop = (document.documentElement.clientHeight - (0.8*attributeCount(this.zmCityInfos))*50)/2 +'px';//垂直居中
          
          if (sessionStorage.getItem("cityName")) {
            this.currentCity = sessionStorage.getItem("cityName");
          } else {
            this.currentCity = res.data.currentCity.cityName;
          }
          this.centerCity = res.data.currentCity;
        });

        if (window.localStorage.getItem("selectCity")) {
          this.history = JSON.parse(
            window.localStorage.getItem("selectCity")
          ).reverse();
        }
      },
      checkCity(index){
      	//window.location.hash = 'city'+index;
      	this.$nextTick(() => {
      		/*滚动到指定元素位置*/
      		
				function clickToSee(id, time) {
					var c_top = document.body.scrollTop
					var ele = document.getElementById(id);
					var e_top = ele.offsetTop;
					var diff = e_top - c_top;
					var step = diff / 100 ;
					time = time / 100 * 1000;
					var o_flag;
					if(diff > 0) {
						o_flag = true;
					} else {
						o_flag = false;
					}
					var timer = setInterval(function() {
						var c_flag;
						diff -= step;
						window.scrollBy(0, step);
						if(diff > 0) {
							c_flag = true;
						} else {
							c_flag = false;
						}
						if(!o_flag === c_flag) {
							clearInterval(timer);
						}
					}, time)
				}
      	clickToSee('city'+index,2);
      	this.$toast(index);
      	//document.getElementById('city'+index).scrollIntoView();
	       });
      }
    },
    computed: {},
    created: function () {
      this.init()

    },
    mounted: function () {
    }
  };
</script>

<style scoped lang="less" type="text/less">
  .container {
  	position: relative;
  	.indexList {
     width: 0.28rem;
    /* height: 0.8rem;
     */
     font-family: PingFang-SC-Medium;
     font-size: 0.29333333333333333rem;
     font-weight: normal;
     font-stretch: normal;
     line-height: 0.44rem;
     letter-spacing: 0rem;
     color: #ffffff;
    /**/
     background-color: gray;
     border-radius: 0.26666666666666666rem;
     z-index: 99999;
     position: absolute;
     float: right;
     right: 0rem;
     /*top: 2.4rem;*/
     word-wrap:break-word;
     word-break:break-all;
      position:fixed; 
}
 
 
    .topBar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 9999;
      background-color: #fff;
      padding: 0.2rem 0;
    }

    // 内容部分
    .contain-in {
      padding: 0 0.3rem;
      // 搜索及历史
      .titin {
        color: #5a5a5b;
        font-size: 0.24rem;
        /*line-height: 3;*/
        position: relative;

        &.titin-pad {
          padding-left: 0.3rem;
          padding-right: 0.3rem;
          line-height: 0.8rem;
          background-color: #f1f0f6;
          border-bottom: 1px solid #e6e6e6;
        }

        &.titin-pad::after,
        &.titin-noborder::after {
          display: none;
        }
      }

      .titin::after {
        content: "";
        position: absolute;
        top: -0.1rem;
        left: 0;
        width: 100%;
        height: 0.01rem;
        border-top: #e6e6e6 0.01rem solid;
      }

      .refresh {
        width: 0.58rem;
        height: 0.58rem;
        padding: 0.06rem;
        box-sizing: border-box;
        float: right;
        margin-top: 0.1rem;
      }

      .act-button {
        padding: 0 0.25rem;
        height: 0.54rem;
        line-height: 0.54rem;
        border-radius: 0.27rem;
        display: inline-block;
        background: #f1f0f6;
        color: #27262c;
        text-align: center;
        font-size: 0.24rem;
        margin: 0.1rem 0.128rem 0.2rem;
        text-indent: 0;
      }

      .act-button:nth-of-type(4n + 1) {
        margin-left: 0;
      }

      .act-button:nth-of-type(4n) {
        margin-right: 0;
      }

      .hisotory-box {
        .act-button {
          width: auto;
          padding: 0 0.2rem;
          margin-left: 0;
          margin-right: 0.256rem;
        }
      }

      // 搜索结果
      .search-item {
        font-size: 0.24rem;
        padding: 0.2rem 0.3rem;
        width: 100%;

        span {
          color: #2d2d30;
        }

        .van-cell::after {
          margin-right: 0.3rem;
        }
      }
    }

    .block {
      width: 100%;
      height: 0.2rem;
      background: #f1f0f6;
    }
  }
</style>
<style>
  #city .van-cell:not(:last-child)::after {
    margin-right: 0.3rem;
  }

  .icon-sousuo {
    float: left;
    font-size: 0.4rem;
  }

  .icon-xiangzuo {
    /*float: left;*/
    /*font-size: 0.4rem;*/
    width: 0.6rem;
    /*margin-left: 0.2rem;*/
  }

  .input {
    border: 0.02rem solid #dcdcdc;
    width: 6.3rem;
    float: left;
    border-radius: 0.2rem;
    padding-left: 0.15rem;
  }

  .citySeclect {
    margin-top: 0.5rem;
  }

  .city {
    padding-left: 1.2rem;
    line-height: 0.8rem;
    border-bottom: 1px solid #dcdcdc;
  }

  .red {
    background-color: #fb5900 !important;
    color: #fff !important;
  }

  .titin-pad {
    /*height: 0.25rem;*/
    background-color: #dcdce1;
  }

  .cityLeft {
    float: left;
    font-size: 0.4rem;
    width: 0.6rem;
    margin-left: 0.2rem;
  }
</style>

