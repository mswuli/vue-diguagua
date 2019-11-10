<template>
  <div id="index">
    <!-- v-if="isLoad" -->
    <div :style="isapp ? '' : 'padding-top: .98rem;'">
      <Header v-if="!isapp" :title="title" :chose="chose"/>
      <div class="main">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item,i) in banner" :key="i" class="swiper" style="background-size:100% 100%;">
            <router-link :to="{path: item.skipurl}">
              <div class="bannerBox"
                :style="'width: 100%;height: 4rem;background:url(' + item.imgurl + ');background-size:100% 100%;background-position: center center'"
              >
                <!-- <img :src="item.imgurl" style="width: 100%;" alt="" srcset="" :onerror="noimg"/> -->
              </div>
            </router-link>
          </van-swipe-item>
        </van-swipe>
        <!--<div class="po" style="float:left;line-height: .92rem;" @click="city">武汉 </div>-->
        <!--<div class="iconfont icon-xia" style="float:left;line-height: .96rem;"></div>　-->
        <div class="field clear" v-if="!isapp">
          <div class="inputt" @click="tosearch">
            <i class="iconfont icon-sousuo"></i>
            <input type="text" readonly placeholder="请输入区域/农庄/景区">
          </div>
          <div class="issue" @click.stop="issueSelect">
            发布农庄
            <i class="iconfont icon-xia"></i>
            <div v-show="isIssueSelect" class="issue-drop-down">
              <div class="issue-drop-down-in">
                <p @click="issue('issueFarm')">发布农房</p>
                <p @click="issue('issueWanted')">发布求租</p>
                <p @click="issue('issueGrange')">发布农庄</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 两端对齐 -->
      <div class="nav">
        <van-row type="flex" justify="space-between">
          <van-col span="4">
            <router-link :to="{name:'grangeindex'}" active-class="imgbox">
              <img src="../assets/imgs/sy_01.png" alt>
              <p>共享农庄</p>
            </router-link>
          </van-col>
          <van-col span="4">
            <router-link :to="{name:'shareInn'}" active-class="imgbox">
              <img src="../assets/imgs/sy_02.png" alt>
              <p>民宿</p>
            </router-link>
          </van-col>
          <van-col span="4">
            <router-link :to="{name:'sharePlay'}" active-class="imgbox">
              <img src="../assets/imgs/sy_03.png" alt>
              <p>农家乐</p>
            </router-link>
          </van-col>
          <van-col span="4">
            <router-link :to="{name:'scenic'}" active-class="imgbox">
              <img src="../assets/imgs/sy_04.png" alt>
              <p>景点</p>
            </router-link>
          </van-col>
          <van-col span="4">
            <router-link :to="{name:'shareFood'}" active-class="imgbox">
              <img src="../assets/imgs/sy_05.png" alt>
              <p>美食</p>
            </router-link>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-between">
          <van-col span="4">
            <router-link :to="{name:'farmHouse'}" active-class="imgbox">
              <img src="../assets/imgs/sy_06.png" alt>
              <p>闲置农房</p>
            </router-link>
          </van-col>
          <van-col span="4">
            <router-link :to="{name:'rentList'}" active-class="imgbox">
              <img src="../assets/imgs/sy_07.png" alt>
              <p>租农房</p>
            </router-link>
          </van-col>
          <van-col span="4">
            <router-link :to="{name:'dealList'}" active-class="imgbox">
              <img src="../assets/imgs/sy_08.png" alt>
              <p>查成交</p>
            </router-link>
          </van-col>
          <van-col span="4">
            <router-link :to="{name:'wantedList'}" active-class="imgbox">
              <img src="../assets/imgs/sy_09.png" alt>
              <p>农房求租</p>
            </router-link>
          </van-col>
          <van-col span="4">
            <router-link :to="{name:'Information'}" active-class="imgbox">
              <img src="../assets/imgs/sy_10.png" alt>
              <p>政策文件</p>
            </router-link>
          </van-col>
        </van-row>
      </div>

      <div class="separate"></div>

      <div class="tab">
        <van-tabs @click="onClick">
          <van-tab title="租农房" v-if="farmhouse.length > 0">
            <div class="content">
              <router-link
                v-for="(tab,i) in farmhouse"
                :to="{name:'rentDetail',params:{id:tab.farmhouseRentalsNumber}}"
                tag="li"
                :key="i"
                class="tab_li"
              >
                <div class="left">
                  <!--<img v-if='tab.logoUrl' :src="tab.logoUrl" alt="">-->
                  <div
                    v-if="tab.logoUrl"
                    :style="'background:url(' + tab.logoUrl + ');width: 100%;height: 100%;background-size:cover;background-position: center center'"
                  ></div>
                  <img v-else src="../assets/noimg.jpg" alt>
                </div>
                <div class="right">
                  <p>{{tab.farmhouseTitle}}</p>
                  <p>
                    <span>{{tab.detail}}</span>
                    <span>{{tab.rentingPrice}}</span>
                  </p>
                  <p>
                    <i style="color: #c8c8cd; font-size: .26rem" class="iconfont icon-dizhi"></i>
                    {{tab.address}}
                  </p>
                  <p>
                    <span v-for="item in tab.characteristics">{{item}}</span>
                  </p>
                </div>
              </router-link>
              <router-link :to="{name:'rentList'}">
                <button class="more">更多农房</button>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="共享农庄" v-if="grangeall.length > 0">
            <div class="content">
              <router-link
                v-for="(tab,i) in grangeall"
                :to="{name:'grangedetail',params:{id: tab.grangeNumber}}"
                tag="li"
                :key="i"
                class="tab_li"
              >
                <div class="left">
                  <!--<img v-if='tab.logoUrl' :src="tab.logoUrl" alt="">-->
                  <div
                    v-if="tab.logoUrl"
                    :style="'background:url(' + tab.logoUrl + ');width: 100%;height: 100%;background-size:cover;background-position: center center'"
                  ></div>
                  <img v-else src="../assets/noimg.jpg" alt>
                </div>
                <div class="right">
                  <p>{{tab.grangeName}}</p>
                  <p>
                    <stars :rate="tab.totalMark || 0"></stars>
                    {{tab.totalMark||0}}分
                    <span>￥{{tab.personConsumption}}/人</span>
                  </p>
                  <p>
                    <i style="color: #c8c8cd; font-size: .26rem" class="iconfont icon-dizhi"></i>
                    {{tab.address}}
                  </p>
                  <p>
                    <span v-for="item in tab.plays">{{item}}</span>
                  </p>
                </div>
              </router-link>
              <router-link :to="{name:'sharePlay'}">
                <button class="more">更多农庄</button>
              </router-link>
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <div class="separate"></div>

      <div class="active">
        <div class="active-tit">
          <span>活动</span>
          <span>推荐</span>
        </div>
        <div class="active-con" v-if="activity.length > 0">
          <router-link :to="{name:'textDetail', params:{id:activity[0].id}}">
            <div
              class="active-con-img"
              :style="'background:url(' + activity[0].informationLogourl + ');width: 100%;background-size:cover;background-position: center center'"
            >
              <p>{{activity[0].informationTitle}}</p>
            </div>
          </router-link>
          <div v-for="(item,index) in activity" v-show="index !== 0" class="active-con-img-s">
            <router-link :to="{name:'textDetail',params:{id:item.id}}">
              <div
                :style="'background:url(' + item.informationLogourl + ');width: 100%;background-size:cover;background-position: center center'"
              ></div>
              <p>{{item.informationTitle}}</p>
            </router-link>
          </div>
        </div>
      </div>

      <div v-if="village.length>0">
        <!--周边农房-->
        <div class="scenic">
          <div class="scenic_top clear">
            <span>村庄</span>
            <span>排行榜</span>
          </div>
          <div class="scenic_bottom" style="overflow: hidden;">
            <scroll ref="scroll" class="recommend-content">
              <div :style="'width:' + (village.length * 3.2 + .1) + 'rem'">
                <router-link
                  v-for="(item,index) in village"
                  :to="{name:'villageDetail',params:{id:item.villageNumber}}"
                >
                  <div
                    style="width: 3rem; display: inline-block; padding-right: .2rem; position: relative;"
                  >
                    <div
                      v-show="index < 3"
                      class="ranking-cover"
                      :style="'background:' + (index == 0 ? '#FD6C00' : index == 1 ? '#8AB9D4' : index == 2 ? '#E38900' : '') + ''"
                    >
                      <i>NO.{{index+1}}</i>
                    </div>
                    <div
                      v-if="item.logoUrl"
                      :style="'background:url(' + item.logoUrl + ');width: 100%;height: 2rem;background-size:cover;background-position: center center'"
                    ></div>
                    <img v-else src="../assets/noimg.jpg" alt style="width: 100%;height: 2rem;">
                    <div style="font-size: 0.26rem;line-height: 1.8">{{item.villageName}}</div>
                  </div>
                </router-link>
              </div>
            </scroll>
          </div>
        </div>
      </div>

      <div v-if="play.length>0">
        <!--周边农房-->
        <div class="scenic">
          <div class="scenic_top clear">
            <span>玩乐</span>
            <span>排行榜</span>
          </div>
          <div class="scenic_bottom" style="overflow: hidden;">
            <scroll ref="scroll" class="recommend-content1">
              <div :style="'width:' + (play.length * 3.2 + .1) + 'rem'">
                <router-link
                  v-for="(item,index) in play"
                  :to="{name:'grangedetail',params:{id:item.grangeNumber}}"
                >
                  <div
                    style="width: 3rem; display: inline-block; padding-right: .2rem; position: relative;"
                  >
                    <div
                      v-show="index < 3"
                      class="ranking-cover"
                      :style="'background:' + (index == 0 ? '#FD6C00' : index == 1 ? '#8AB9D4' : index == 2 ? '#E38900' : '') + ''"
                    >
                      <i>NO.{{index+1}}</i>
                    </div>
                    <div
                      v-if="item.logoUrl"
                      :style="'background:url(' + item.logoUrl + ');width: 100%;height: 2rem;background-size:cover;background-position: center center'"
                    ></div>
                    <img v-else src="../assets/noimg.jpg" alt style="width: 100%;height: 2rem;">
                    <div style="font-size: 0.26rem;line-height: 1.8">{{item.grangeName.length >11?item.grangeName.substring(0,10)+'…':item.grangeName}}</div>
                  </div>
                </router-link>
              </div>
            </scroll>
          </div>
        </div>
      </div>

      <div v-if="delicacy.length>0">
        <!--周边农房-->
        <div class="scenic">
          <div class="scenic_top clear">
            <span>美食</span>
            <span>排行榜</span>
          </div>
          <div class="scenic_bottom" style="overflow: hidden;">
            <scroll ref="scroll" class="recommend-content2">
              <div :style="'width:' + (delicacy.length * 3.2 + .1) + 'rem'">
                <router-link
                  v-for="(item,index) in delicacy"
                  :to="{name:'grangedetail',params:{id:item.grangeNumber}}"
                >
                  <div
                    style="width: 3rem; display: inline-block; padding-right: .2rem; position: relative;"
                  >
                    <div
                      v-show="index < 3"
                      class="ranking-cover"
                      :style="'background:' + (index == 0 ? '#FD6C00' : index == 1 ? '#8AB9D4' : index == 2 ? '#E38900' : '') + ''"
                    >
                      <i>NO.{{index+1}}</i>
                    </div>
                    <div
                      v-if="item.logoUrl"
                      :style="'background:url(' + item.logoUrl + ');width: 100%;height: 2rem;background-size:cover;background-position: center center'"
                    ></div>
                    <img v-else src="../assets/noimg.jpg" alt style="width: 100%;height: 2rem;">
                    <div style="font-size: 0.26rem;line-height: 1.8">{{item.grangeName.length >11?item.grangeName.substring(0,10)+'…':item.grangeName}}</div>
                  </div>
                </router-link>
              </div>
            </scroll>
          </div>
        </div>
      </div>

      <div class="separate"></div>

      <div class="active-tit">
        <span>乡村</span>
        <span>休闲游</span>
      </div>

      <div class="tab">
        <van-tabs @click="onClick" v-if="info">
          <van-tab title="景点">
            <div class="content">
              <router-link
                v-for="(tab,i) in info.landspace"
                :to="{name:'scenicDetail',params:{id:tab.lanspacePlaceNumber}}"
                tag="li"
                :key="i"
                class="tab_li"
              >
                <div class="left">
                  <!--<img v-if='tab.logoUrl' :src="tab.logoUrl" alt="">-->
                  <div
                    v-if="tab.logoUrl"
                    :style="'background:url(' + tab.logoUrl + ');width: 100%;height: 100%;background-size:cover;background-position: center center'"
                  ></div>
                  <img v-else src="../assets/noimg.jpg" alt>
                </div>
                <div class="right">
                  <p>
                    {{tab.lanspacePlaceName}}
                    <span
                      style="background: #F0F1E8; color: #07A838; border-radius: .12rem; font-size: .22rem; font-weight: 400; padding: 0 .06rem; margin-left: .2rem"
                    >{{tab.lanspaceGrade}}级景区</span>
                  </p>
                  <p>
                    <stars :rate="tab.lanspaceMark || 0"></stars>
                    {{tab.lanspaceMark||0}}分
                    <span>￥{{tab.admissionPrice}}/人</span>
                  </p>
                  <p>
                    <i style="color: #c8c8cd; font-size: .26rem" class="iconfont icon-dizhi"></i>
                    {{tab.address}}
                  </p>
                  <p>
                    <span v-for="item in tab.characteristics">{{item}}</span>
                  </p>
                </div>
              </router-link>
            </div>
            <router-link :to="{name:'scenic'}">
              <button class="more">更多景点</button>
            </router-link>
          </van-tab>
          <van-tab title="游玩">
            <div class="content">
              <router-link
                v-for="(tab,i) in info.play"
                :to="{name:'grangedetail',params:{id:tab.grangeNumber}}"
                tag="li"
                :key="i"
                class="tab_li"
              >
                <div class="left">
                  <!--<img v-if='tab.logoUrl' :src="tab.logoUrl" alt="">-->
                  <div
                    v-if="tab.logoUrl"
                    :style="'background:url(' + tab.logoUrl + ');width: 100%;height: 100%;background-size:cover;background-position: center center'"
                  ></div>
                  <img v-else src="../assets/noimg.jpg" alt>
                </div>
                <div class="right">
                  <p>{{tab.grangeName}}</p>
                  <p>
                    <i style="color: #c8c8cd; font-size: .26rem" class="iconfont icon-dizhi"></i>
                    <span>{{tab.address}}</span>
                    <span>￥{{tab.personConsumption}}/人</span>
                  </p>
                  <p>
                    <stars :rate="tab.stayMark || 0"></stars>
                    {{tab.stayMark||0}}分
                    <span
                      style="color: #5B5B5B;"
                    >评价数: {{tab.stayAppraisalnumber}}</span>
                  </p>
                  <p>
                    <span v-for="item in tab.plays">{{item}}</span>
                  </p>
                </div>
              </router-link>
            </div>
            <router-link :to="{name:'sharePlay'}">
              <button class="more">更多游玩</button>
            </router-link>
          </van-tab>
          <van-tab title="住宿">
            <div class="content">
              <router-link
                v-for="(tab,i) in info.stay"
                :to="{name:'grangedetail',params:{id:tab.grangeNumber}}"
                tag="li"
                :key="i"
                class="tab_li"
              >
                <div class="left">
                  <!--<img v-if='tab.logoUrl' :src="tab.logoUrl" alt="">-->
                  <div
                    v-if="tab.logoUrl"
                    :style="'background:url(' + tab.logoUrl + ');width: 100%;height: 100%;background-size:cover;background-position: center center'"
                  ></div>
                  <img v-else src="../assets/noimg.jpg" alt>
                </div>
                <div class="right">
                  <p>{{tab.grangeName}}</p>
                  <p>
                    <i style="color: #c8c8cd; font-size: .26rem" class="iconfont icon-dizhi"></i>
                    {{tab.address}}
                  </p>
                  <p>
                    <stars :rate="tab.stayMark || 0"></stars>
                    {{tab.stayMark||0}}分
                    <span
                      style="color: #5B5B5B;"
                    >评价数: {{tab.stayAppraisalnumber}}</span>
                  </p>
                  <p>
                    <span>{{tab.stayType}}</span>
                  </p>
                </div>
              </router-link>
            </div>
            <router-link :to="{name:'shareInn'}">
              <button class="more">更多住宿</button>
            </router-link>
          </van-tab>
          <van-tab title="美食">
            <div class="content">
              <router-link
                v-for="(tab,i) in info.delicacy"
                :to="{name:'grangedetail',params:{id:tab.grangeNumber}}"
                tag="li"
                :key="i"
                class="tab_li"
              >
                <div class="left">
                  <!--<img v-if='tab.logoUrl' :src="tab.logoUrl" alt="">-->
                  <div
                    v-if="tab.logoUrl"
                    :style="'background:url(' + tab.logoUrl + ');width: 100%;height: 100%;background-size:cover;background-position: center center'"
                  ></div>
                  <img v-else src="../assets/noimg.jpg" alt>
                </div>
                <div class="right">
                  <p>{{tab.grangeName}}</p>
                  <p>
                    <stars :rate="tab.delicacyMark || 0"></stars>
                    {{tab.delicacyMark||0}}分
                    <span>￥{{tab.personConsumption}}/人</span>
                  </p>
                  <p>评价数: {{tab.delicacyAppraisalnumber}}</p>
                  <p v-if="tab.specialCuisine">
                    <span v-for="item in tab.specialCuisine">{{item}}</span>
                  </p>
                </div>
              </router-link>
            </div>
            <router-link :to="{name:'shareFood'}">
              <button class="more">更多美食</button>
            </router-link>
          </van-tab>
        </van-tabs>
      </div>

      <div class="separate"></div>

      <div class="active-tit">
        <span>新闻</span>
        <span>资讯</span>
      </div>

      <div class="tab infomation" v-if="infomationTab.length > 0">
        <van-tabs @click="onClick">
          <van-tab :title="infomationTab[0].columnName">
            <div class="content">
              <router-link
                v-for="(item,i) in infomationTab[0].infomation"
                :to="{name:'textDetail',params:{id: item.id}}"
                tag="li"
                :key="i"
                class="tab_li"
              >
                <div class="left">
                  <!--<img v-if='item.logourl' :src="item.logourl" alt="">-->
                  <div
                    v-if="item.logourl"
                    :style="'background:url(' + item.logourl + ');width: 100%;height: 100%;background-size:cover;background-position: center center'"
                  ></div>
                  <img v-else src="../assets/noimg.jpg" alt>
                </div>
                <div class="right">
                  <p>{{item.title}}</p>
                  <p>{{item.concent}}</p>
                  <p>{{item.createTime}}</p>
                </div>
              </router-link>
            </div>
            <!-- <router-link :to="{name:'label', params: { restful: infomationTab[0].restfulDictionary}}"><button class="more">查看更多</button></router-link> -->
            <router-link :to="{name:'Information'}">
              <button class="more">查看更多</button>
            </router-link>
          </van-tab>
          <van-tab :title="infomationTab[1].columnName">
            <div class="content">
              <router-link
                v-for="(item,i) in infomationTab[1].infomation"
                :to="{name:'textDetail',params:{id: item.id}}"
                tag="li"
                :key="i"
                class="tab_li"
              >
                <div class="left">
                  <div
                    v-if="item.logourl"
                    :style="'background:url(' + item.logourl + ');width:100%;height: 100%;background-size:cover;background-position: center center'"
                  ></div>
                  <img v-else src="../assets/noimg.jpg" alt>
                </div>
                <div class="right">
                  <p>{{item.title}}</p>
                  <p>{{item.concent}}</p>
                  <p>{{item.createTime}}</p>
                </div>
              </router-link>
            </div>
            <!-- <router-link :to="{name:'label', params: { restful: infomationTab[1].restfulDictionary}}"><button class="more">查看更多</button></router-link> -->
            <router-link :to="{name:'Information'}">
              <button class="more">查看更多</button>
            </router-link>
          </van-tab>
          <van-tab :title="infomationTab[2].columnName">
            <div class="content">
              <router-link
                v-for="(item,i) in infomationTab[2].infomation"
                :to="{name:'textDetail',params:{id: item.id}}"
                tag="li"
                :key="i"
                class="tab_li"
              >
                <div class="left">
                  <!--<img v-if='item.logourl' :src="item.logourl" alt="">-->
                  <div
                    v-if="item.logourl"
                    :style="'background:url(' + item.logourl + ');width: 100%;height: 100%;background-size:cover;background-position: center center'"
                  ></div>
                  <img v-else src="../assets/noimg.jpg" alt>
                </div>
                <div class="right">
                  <p>{{item.title}}</p>
                  <p>{{item.concent}}</p>
                  <p>{{item.createTime}}</p>
                </div>
              </router-link>
            </div>
            <!-- <router-link :to="{name:'label', params: { restful: infomationTab[2].restfulDictionary}}"><button class="more">查看更多</button></router-link> -->
            <router-link :to="{name:'Information'}">
              <button class="more">查看更多</button>
            </router-link>
          </van-tab>
          <van-tab :title="infomationTab[3].columnName">
            <div class="content">
              <router-link
                v-for="(item,i) in infomationTab[3].infomation"
                :to="{name:'textDetail',params:{id: item.id}}"
                tag="li"
                :key="i"
                class="tab_li"
              >
                <div class="left">
                  <!--<img v-if='item.logourl' :src="item.logourl" alt="">-->
                  <div
                    v-if="item.logourl"
                    :style="'background:url(' + item.logourl + ');width: 100%;height: 100%;background-size:cover;background-position: center center'"
                  ></div>
                  <img v-else src="../assets/noimg.jpg" alt>
                </div>
                <div class="right">
                  <p>{{item.title}}</p>
                  <p>{{item.concent}}</p>
                  <p>{{item.createTime}}</p>
                </div>
              </router-link>
            </div>
            <!-- <router-link :to="{name:'label', params: { restful: infomationTab[3].restfulDictionary}}"><button class="more">查看更多</button></router-link> -->
            <router-link :to="{name:'Information'}">
              <button class="more">查看更多</button>
            </router-link>
          </van-tab>
        </van-tabs>
      </div>

      <Footer v-if="!isapp"/>
      <GoTop/>
    </div>
    <van-dialog v-model="show" :show-confirm-button="false" class="changeCity">
      <div class="iconfont icon-menu_reject2Submitor" @click="closeCity"></div>

      <div class="swiperBox">
        <div class="change">
          <div>系统定位您在{{chose}}</div>
          <div>{{city}}</div>
        </div>
        <ul class="picker">
          <li v-for="(item,idnex ) in news" @click="onConfirm(item,idnex)">{{item}}</li>
        </ul>
        <!--<van-picker-->
          <!--show-toolbar-->
          <!--:columns="news"-->
          <!--index="1"-->
          <!--itemHeight:35-->
          <!--class="picker"-->
          <!--@confirm="onConfirm"-->
        <!--/>-->
      </div>
    </van-dialog>
    <NewVersion v-if="NewVersionShow" :versionMess="versionMess" :isUpdate="isUpdate"/>
  </div>
</template>

<script>
import Header from "./common/Header";
import GoTop from "./common/goTop";
import Footer from "./common/Footer";
import stars from "./common/rates";
import Load from "./common/loading";
import Scroll from "./common/swiperX";
import NewVersion from "./newVersion/newVersion"
export default {
  props: {
    isapp: false
  },
  name: "index",
  components: {
    Scroll,
    Load,
    Header,
    Footer,
    GoTop,
    NewVersion,
    stars
  },
  data() {
    return {
      isLoad: true,
      title: "  ",
      position: "武汉",
      noimg: "../assets/noimg.jpg",
      tabindex: 0, // tab显示控住
      banner: [],
      farmhouse: [],
      grangeall: [],
      activity: [],
      username: "123",
      delicacy: [],
      play: [],
      village: [],
      show: false,//true
      info: null,
      NewVersionShow:false,
      isUpdate:false,//告诉【NewVersion】组件是否强制更新
      chose: "",
      versionMess:{},
      city: "是否要切换",
      infomationTab: [],
      news: ["切换至", "浏览当前城市", "切换其他城市"],
      isIssueSelect: false // 发布下拉
    };
  },
  created() {
    this.init();

    if (localStorage.getItem("indexData")) {
      var indexData = JSON.parse(localStorage.getItem("indexData"));
      this.banner = indexData.banner;
      this.farmhouse = indexData.farmhouse;
      this.grangeall = indexData.grangeall;
      this.activity = indexData.activity;
    } else {
      this.isLoad = false;
    }

//  if (sessionStorage.getItem("popped") == "" || sessionStorage.getItem("popped") == null) {
//    this.show = true;
//    sessionStorage.setItem("popped", "showTrue");
//  } else {
//    this.show = false; //若cookie 中已经有 popped 值，则弹框再不会显示
//  }
		/*
		 * 为了下次打开网页不需要选择城市，需要存在localStorage里面(8)
		 */
		/*
				     * 为了下次打开网页不需要选择城市，需要存在localStorage里面(1)
				     * localStorage.getItem("popped")是永久保存城市信息
				     * sessionStorage.getItem("popped")是每次app未退出之前是否还要继续弹出“切换城市”，存在值就不弹。
				     */
				    
				    if (localStorage.getItem("popped") == "" || localStorage.getItem("popped") == null) {
				      this.show = true;
				      localStorage.setItem("popped", "showTrue");
				      if(localStorage.getItem("key")){
				      	sessionStorage.setItem("key",localStorage.getItem("key"));
				      }
				      if(localStorage.getItem("id")){
				      	sessionStorage.setItem("id",localStorage.getItem("id"));
				      }
				      if(localStorage.getItem("cityName")){
				      	sessionStorage.setItem("cityName",localStorage.getItem("cityName"));
				      }
				    } else {
				    	if(sessionStorage.getItem("popped") != "showTrue"){
				    		this.$http
				        .post("appServiceFarmhouse/getCityData")
				        .then(res => {
				        	let nowCity = res.data.currentCity.cityName;
				        	//如果“当前所在城市”跟“永久保存的城市信息”不一样，就要弹出“切换城市”
				        	if(localStorage.getItem("cityName") != nowCity){
										this.show = true;
									}else{
										 this.show = false; //若localStorage 中已经有 popped 值，则弹框再不会显示
									}
				     		}) 
				    	}
				  }
  },
  methods: {
    init() {
      var id = "";
      /*
	     * 为了下次打开网页不需要选择城市，需要存在localStorage里面
	     */
      if (localStorage.getItem("key")) {
        id = localStorage.getItem("key");
      }else {
          id="wuhan"
      }
      this.$http
        .post("appServiceFarmhouse/getCityData",{appVersion:"2.6"})//appVersion是打包时apk的版本，传这个参数就会返回【res.data.versionMess.forceupdate】和【res.data.isLast】
        .then(res => {
        	this.chose = res.data.currentCity.cityName;
          this.news = [];
          this.news[0] = `切换至` + res.data.currentCity.cityName;
          this.news[1] = `浏览当前城市`
          this.news[2] = `切换其他城市`;
          
          //if (this.show == true) {
          	/*
				     * 为了下次打开网页不需要选择城市，需要存在localStorage里面(11)
				     */
//          sessionStorage.setItem(
//            "key",
//            res.data.currentCity.cityRestfulDictionary
//          );
//          sessionStorage.setItem("id", res.data.currentCity.id);
//          sessionStorage.setItem("cityName", res.data.currentCity.cityName);
							if(localStorage.getItem("key")){
				      	sessionStorage.setItem("key",localStorage.getItem("key"));
				      }
				      if(localStorage.getItem("id")){
				      	sessionStorage.setItem("id",localStorage.getItem("id"));
				      }
				      if(localStorage.getItem("cityName")){
				      	sessionStorage.setItem("cityName",localStorage.getItem("cityName"));
				      }
         // }
					
					/*【res.data.isLast】为true代表版本不是最新*/
					if(res.data.isLast ===false){
						/* 是否强制更新。【res.data.versionMess.forceupdate】为1代表需要强制更新*/
						if(res.data.versionMess.forceupdate == 1){
							this.NewVersionShow=true//必须显示更新提示
							this.isUpdate = true;//不可关闭更新提示
						}else{
							//noNeedVersionShow:这个key如果存在代表不需要提示版本更新
							if(sessionStorage.getItem("noNeedVersionShow")){
								this.NewVersionShow=false;
							}else{
								this.NewVersionShow=true
								this.versionMess=res.data.versionMess
							}
						}
					}
        })
        .catch(error => {
          //this.$toast("网络错误");
        });

      this.$http
        .post("appServiceHome/bannerandActivity", { cityRestful: id })
        .then(res => {
          if (res.msg == "success") {
            this.banner = res.data.banner;
            this.farmhouse = res.data.farmhouse;
            this.grangeall = res.data.grangeall;
            this.activity = res.data.activity;
            this.recommendList();
            localStorage.setItem("indexData", JSON.stringify(res.data));
            this.isLoad = true;
          } else {
            this.$toast(res.info);
          }
        });
    },
    recommendList() {
      var id = "";
      if (sessionStorage.getItem("key")) {
        id = sessionStorage.getItem("key");
      }
      this.$http
        .post("appServiceHome/recommendList", { cityRestful: id })
        .then(res => {
          if (res.msg == "success") {
            this.delicacy = res.data.delicacy;
            this.play = res.data.play;
            this.village = res.data.village;
            this.markList();
          } else {
            this.$toast(res.info);
          }
        });
    },
    markList() {
      var id = "";
      if (sessionStorage.getItem("key")) {
        id = sessionStorage.getItem("key");
      }
      this.$http
        .post("appServiceHome/markList", { cityRestful: id })
        .then(res => {
          if (res.msg == "success") {
            this.info = res.data;
            this.sxInformation();
          } else {
            this.$toast(res.info);
          }
        });
    },
    sxInformation() {
      var id = "";
      if (sessionStorage.getItem("key")) {
        id = sessionStorage.getItem("key");
      }
      this.$http
        .post("appServiceHome/sxInformation", { cityRestful: id })
        .then(res => {
          if (res.msg == "success") {
            this.infomationTab = res.data;
          } else {
            this.$toast(res.info);
          }
        });
    },
    onClick() {},
    tosearch() {
      this.$router.push({ name: "search" });
    },
    issueSelect() {
      this.isIssueSelect = !this.isIssueSelect;
    },
    issue(to) {
      if (to) {
        this.$router.push({ name: to });
      }
    },
    closeCity() {
    	var _this = this;
      this.show = false;
      sessionStorage.setItem("popped", "showTrue");
      this.$http
        .post("appServiceFarmhouse/getCityData")
        .then(res => {
            sessionStorage.setItem(
              "key",
              res.data.currentCity.cityRestfulDictionary
            );
            sessionStorage.setItem("id", res.data.currentCity.id);
            sessionStorage.setItem("cityName", res.data.currentCity.cityName);
             /*
				     * 为了下次打开网页不需要选择城市，需要存在localStorage里面(2)
				     */
				    if(!localStorage.getItem("cityName")){
	            localStorage.setItem(
	              "key",
	              res.data.currentCity.cityRestfulDictionary
	            );
	            localStorage.setItem("id", res.data.currentCity.id);
	            localStorage.setItem("cityName", res.data.currentCity.cityName);
				    }else{
				    	sessionStorage.setItem(
	              "key",
	              localStorage.getItem("key")
	            );
	            sessionStorage.setItem("id",localStorage.getItem("id"));
	            sessionStorage.setItem("cityName", localStorage.getItem("cityName"));
				    }
				    _this.$router.push({path: '/',query:{type:0}})//刷新首页
        })
        .catch(error => {
          //this.$toast("网络错误");
        });
    },
    onConfirm(value, index) {
    	var _this = this;
      if (index == 0) {
        this.show = false;
        
      	this.$http
        .post("appServiceFarmhouse/getCityData")
        .then(res => {
            sessionStorage.setItem(
              "key",
              res.data.currentCity.cityRestfulDictionary
            );
            sessionStorage.setItem("id", res.data.currentCity.id);
            sessionStorage.setItem("cityName", res.data.currentCity.cityName);
            localStorage.setItem(
              "key",
              res.data.currentCity.cityRestfulDictionary
            );
            localStorage.setItem("id", res.data.currentCity.id);
            localStorage.setItem("cityName", res.data.currentCity.cityName);
            _this.$router.push({path: '/',query:{type:0}})//刷新首页
        })
        .catch(error => {
          //this.$toast("网络错误");
        });
		    
      } else if (index == 1) {
        this.show = false;
        /*
		     * 为了下次打开网页不需要选择城市，需要存在localStorage里面(10)
		     */
		    this.closeCity();
		    sessionStorage.setItem("popped", "showTrue");
      } else if (index == 2) {
        this.show = false;
        this.$router.push({
          name: "cityQuery"
        });
      }
      console.log(value);
      console.log(index);
    }
  }
};
</script>

<style scoped lang="less" type="text/less">
@import "./../style/public.less";

.main {
  position: relative;
}

.main .van-swipe {
  height: 4rem;
}

span.star {
  width: 1.5rem !important;
}

.nav {
  padding: 0.2rem;

  .van-row {
    padding: 0.1rem 0;
  }

  text-align: center;

  img {
    width: 0.89rem;
    height: 0.89rem;
  }

  p {
    text-align: center;
    width: 100%;
    color: #333;
    margin-top: 0.1rem;
    font-size: 0.26rem;
  }
}

//周边农房
.scenic {
  text-align: left;

  .scenic_top {
    text-align: left;
    padding: 0 0.3rem;
    height: 1.1rem;
    line-height: 1.1rem;
    font-weight: bold;
    font-size: 0;

    span {
      display: inline;
      font-size: 0.34rem;
    }

    span:nth-child(1) {
      color: #fd6300;
    }

    span:nth-child(2) {
      color: #000003;
    }
  }

  .scenic_bottom {
    border-bottom: 0.02rem #e4e4e4 solid;
    padding-bottom: 0.2rem;
    padding-left: 0.3rem;

    .rank {
      padding-right: 0.2rem;

      div {
        height: 2.87rem;

        img {
          height: 2rem;
        }

        a {
          display: block;
          line-height: 1.8;
          font-size: 0.26rem;
        }

        p {
          font-size: 0.22rem;
          color: #979798;

          span {
            color: #fa6300;
          }

          span:nth-child(3) {
            color: #979798;
            float: right;
          }
        }
      }
    }
  }
}

.active-tit {
  text-align: left;
  padding: 0 0.3rem;
  height: 1.1rem;
  line-height: 1.1rem;
  font-weight: bold;
  border-bottom: 0.02rem #e6e6e6 solid;
  font-size: 0;

  span {
    display: inline;
    font-size: 0.34rem;
  }

  span:nth-child(1) {
    color: #fd6300;
  }

  span:nth-child(2) {
    color: #000003;
  }
}

.active {
  width: 100%;
  border-bottom: 0.02rem #e6e6e6 solid;

  .active-tit {
    text-align: left;
    padding: 0 0.3rem;
    height: 1.1rem;
    line-height: 1.1rem;
    font-size: 0.34rem;
    font-weight: bold;
    border: 0;
  }

  .active-con {
    margin: 0 0.3rem;

    .active-con-img {
      height: 2.8rem;
      display: block;
      margin-bottom: 0.2rem;
      background-size: cover;
      position: relative;

      p {
        font-size: 0.24rem;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 0.6rem;
        line-height: 0.6rem;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        box-sizing: border-box;
        padding: 0 0.2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
      }
    }

    .active-con-img-s {
      width: 2.2rem;
      display: inline-block;
      font-size: 0.24rem;

      div {
        width: 100%;
        height: 1.7rem;
        background-size: cover;
        position: relative;
      }

      p {
        height: 0.6rem;
        line-height: 0.6rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #2f2f2f;
      }
    }

    .active-con-img-s:nth-of-type(3) {
      margin: 0 0.15rem;
    }
  }
}

.scenic_bottom {
  border-bottom: 0.02rem #e4e4e4 solid;
  padding-bottom: 0.2rem;

  .rank {
    padding-right: 0.2rem;

    div {
      position: relative;
      height: 2.87rem;

      .price {
        width: 1rem;
        height: 0.4rem;
        background-color: rgba(0, 0, 0, 0.4);
        position: absolute;
        top: 1.5rem;
        text-align: center;
        line-height: 0.4rem;
        color: #fff;
        font-weight: normal;
        border-radius: 0.4rem;
        left: 0.2rem;
      }

      img {
        height: 2rem;
      }

      a {
        display: block;
        font-size: 0.26rem;
        line-height: 1.8;
        font-weight: normal;
      }

      p {
        font-size: 0.22rem;
        font-weight: normal;

        span:nth-child(2) {
          color: #ff6500;
        }

        span:nth-child(3) {
          color: #979798;
          float: right;
        }
      }
    }
  }
}

/*banner*/
.separate {
  height: 0.2rem;
  background-color: #f1f0f6;
}

.van-swipe {
  height: 2.6rem;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

/*nav*/
.tab {
  padding: 0 0.3rem 0.3rem;

  .top {
    height: 0.75rem;
    width: 100%;
    border-bottom: 0.01rem solid #e6e6e6;

    .left {
      float: left;

      p {
        float: left;
        text-align: left;
        font-size: 0.35rem;
        font-weight: 600;

        &:nth-child(1) {
          color: #fd5c02;
        }

        &:nth-child(2) {
          color: #000005;
        }
      }
    }

    .right {
      p {
        text-align: left;
      }

      float: right;
      margin-top: 0.09rem;

      .btn {
        width: 0.34rem;
        height: 0.34rem;
        background: #f6f5fb;
        border: 0.01rem solid #c9c9cb;
        line-height: 0.33rem;
        text-align: center;
        float: left;

        &:nth-child(1) {
          margin-right: 0.2rem;
        }

        .icon {
          font-size: 0.21rem;
          color: #9d9ca2;
          font-weight: 600;
        }
      }
    }
  }

  .content {
    li {
      list-style: none;
      padding: 0.3rem 0 0.3rem;
      height: 1.6rem;
      border-bottom: 0.01rem solid #e6e6e6;

      &:last-child {
        border-bottom: none;
      }

      .left {
        width: 2.14rem;
        height: 1.6rem;
        float: left;

        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .right {
        height: 1.6rem;
        margin-left: 2.4rem;

        p {
          text-align: left;
          line-height: 1.1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.24rem;
          color: #5b5b5b;
          padding-top: 0.14rem;

          &:nth-child(1) {
            font-size: 0.32rem;
            color: #010103;
            letter-spacing: 0.01rem;
            font-weight: 600;
            width: 4.65rem;
            padding: 0;
          }

          &:nth-child(2),
          &:nth-child(3) {
            font-weight: 400;

            span:nth-child(2) {
              width: 1.8rem;
              float: right;
              text-align: right;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #ff6500;
            }

            span:nth-child(1) {
              width: 2.7rem;
              float: left;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }

          &:nth-child(4) {
            padding: 0;
            padding-top: 0.14rem;
            height: 0.4rem;

            span {
              border-radius: 0.05rem;
              border: #000000 solid 0.01rem;
              padding: 0 0.06rem;
              margin-right: 0.06rem;
              font-weight: 400;

              &:nth-child(1) {
                color: #00b034;
                border-color: #00b034;
              }

              &:nth-child(2) {
                color: #06a2ea;
                border-color: #06a2ea;
              }

              &:nth-child(3) {
                color: #fc6301;
                border-color: #fc6301;
              }

              &:nth-child(4) {
                color: #8e569b;
                border-color: #8e569b;
              }

              &:nth-child(5) {
                color: #00a49d;
                border-color: #00a49d;
              }
            }
          }
        }
      }
    }

    li:last-of-type {
      border: none;
    }
  }

  .more {
    width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: 0.26rem;
    background: #fef4ea;
    color: #ff5a00;
    border: none;
    padding: 0;
    border-radius: 0.1rem;
  }
}

.tab.infomation {
  li {
    .left {
      float: right;
    }

    .right {
      margin-right: 2.4rem;
      margin-left: 0;

      p:nth-of-type(2) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        // display: -webkit-box;
        // white-space: nowrap;
        // white-space: pre-wrap;
        // -webkit-box-orient: vertical;
        line-height: 1.4;
        font-weight: 400;
      }

      p:nth-of-type(1) {
        font-size: 0.3rem;
      }

      p:nth-of-type(3) {
        padding-top: 0.12rem;
        font-weight: 400;

        span {
          width: auto !important;
          padding: 0.06rem 0.08rem;
          background: #ffebef;
          color: #c53558;
          font-size: 0.2rem;
          border-radius: 0.18rem;
          margin-right: 0.16rem;
        }
      }
    }
  }
}

.field {
  position: absolute;
  top: 0.2rem;
  /*width: 100%;*/
  /*padding-right: 0.6rem;*/
  box-sizing: border-box;
  margin-left: 0.5rem;
  float: right;

  & > div {
    float: left;
    margin-left: 0.1rem;
  }

  .inputt {
    margin-left: 0;
    padding-top: 0.12rem;
    width: 5.2rem;
    height: 0.53rem;
    border-radius: 0.54rem;
    background-color: white;
    text-align: center;
    box-sizing: border-box;

    i {
      font-size: 0.3rem;
      vertical-align: top;
    }

    input {
      outline: none;
      vertical-align: top;
      height: 56%;
      width: 4.5rem;
      border: none;
      font-size: 0.2rem;
    }
  }

  .issue {
    height: 0.53rem;
    width: 1.53rem;
    background-color: #ff6400;
    border-radius: 0.53rem;
    font-size: 0.2rem;
    text-align: center;
    line-height: 0.53rem;
    color: #fff;
    float: right;
    position: relative;

    .issue-drop-down {
      width: 100%;
      height: 2.4rem;
      position: absolute;
      left: 0;
      top: 140%;
      background: #ffffff;
      border-radius: 0.1rem;

      .issue-drop-down-in {
        width: 100%;
        height: 100%;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          top: -0.06rem;
          right: 0.2rem;
          background: #fff;
          width: 0.16rem;
          height: 0.16rem;
          transform: rotateZ(45deg);
        }

        p {
          color: #323237;
          text-align: center;
          line-height: 0.78rem;
          font-size: 0.26rem;
          border-bottom: 0.02rem solid #ebebf0;

          &:nth-of-type(3) {
            border: none;
          }
        }
      }
    }
  }
}
</style>

<style lang="less" type="text/less">
#index {
  overflow: hidden;

  .navBar .van-tab {
    color: #28282b;
  }

  .navBar .van-tab--active {
    color: #ff6500;
  }

  .navBar .van-tabs__line {
    background: #ff6500;
  }

  .scenic_top .van-tab {
    background: transparent;
    border: none;
  }

  .scenic_top .van-tabs__nav--card .van-tab {
    border: none;
  }

  .tab .van-hairline--top-bottom::after {
    border-top: 0;
  }

  .tab .van-tabs {
    font-size: 0.28rem;
    font-weight: 600;
  }

  .van-tab--active {
    color: #ff6500;
  }

  .van-tabs__line {
    background: #ff6500;
  }

  .nav img {
    display: block;
    margin: 0 auto;
  }
}

.van-dialog__content {
  position: relative;
}

.changeCity {
  height: 5.3rem;
  position: absolute;
  font-size: 0.28rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.59rem;
  letter-spacing: 0.02rem;
  color: #000005;

  .iconfont {
    position: absolute;
    font-size: 0.5rem;
    right: 0;
    top: 0;
    z-index: 99999;
  }

  .change {
    position: absolute;
    z-index: 8888;
    font-size: 0.35rem;
    text-align: center;
    width: 100%;

    div {
      text-align: center;
    }
  }

  .picker {
    position: absolute;
    z-index: 1;
    /* top: 0.9rem; */
    width: 100%;
    text-align: center;
    margin-top: 1.8rem;
    font-size: 0.3rem;
    li{
      border: 1px solid #e6e6eb;;
      color: #ff6400;
      padding: 0.2rem 0;
      &:nth-child(2){
        border: none;
      }
      &:nth-child(3){
        border-bottom: none;
      }
    }

    .van-picker-column__item {
      color: #ff6400;
    }

    .van-picker-column__item--selected {
      font-weight: 100;
    }

    .van-hairline--top-bottom {
      border: 1px solid #f3f3f3;
    }

    .van-picker__toolbar {
      width: 100%;
      top: 2.62rem;
      z-index: 99999;
    }

    .van-picker__cancel {
      display: none;
    }

    .van-picker__confirm {
      width: 100%;
      color: #fff;
    }
  }
}
.bannerBox{
  background-size :100% 100%!important;
}
</style>
