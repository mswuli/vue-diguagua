import Vue from 'vue'
import Router from 'vue-router'
import Threegc from "../components/index/threegcw"

Vue.use(Router);
export default new Router({
  // mode: 'history',
  routes: [
    // 首页
    {
      path: "/index",
      name: "index",
      // meta: {
      //   keepAlive: true
      // },
      component: resolve => require(['../components/index'], resolve)
    },
    {
      path: "/threegc",
      component: Threegc
    },
    {path: '*', component: () => import('com/index')},      // 页面不存在
    // 农房
    {
      path: '/farmhouse/',
      name: 'farmHouse',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/farmHouse/farmIndex/farmIndex'),
    },
    // 农房成交列表
    {
      path: '/farmhouse/turnove/',
      name: 'dealList',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/farmHouse/dealList/dealList')
    },
    // 农房成交详情
    {
      path: "/farmhouse/turnovedetail/:id",
      name: "dealDetail",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/farmHouse/dealDetail/dealDetail')
    },
    // 资讯首页
    {
      path: "/news/",
      name: "Information",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/Information/index/index')
    },
    // 资讯文章详情
    {
      path: "/news/:id",
      name: "textDetail",

      component: () => import('com/Information/text/textDetail/textDetail'),
      // meta: {
      //   title: '三乡',
      //   keepAlive: true
      // }
    },
    {
      path: '/grange/nongzhuang',//农庄首页
      name: 'grangeindex',
      component: () => import('com/grange/grangeindex'),
    },
    {
      path: '/shareInn',//共享住宿
      name: 'shareInn',

      component: () => import('com/grange/sharegrange/shareInn')
    },
    {
      path: '/grange/meishi',//共享美食
      name: 'shareFood',

      component: () => import('com/grange/sharegrange/shareFood')
    },
    {
      path: '/grange/youwan',//共享游玩
      name: 'sharePlay',
      component: () => import('com/grange/sharegrange/sharePlay')
    },

    {
      path: '/grange/:id',//农庄详情
      name: 'grangedetail',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/grange/grangeDetail/grangedetail')
    },
    {
      path: '/grangeDetailcomment/:id',//农庄详情评论
      name: 'grangeDetailcomment',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/grange/grangeDetail/grangeDetailcomment')
    },
    {
      path: '/landspace/jingdian',//景点首页
      name: 'scenic',

      component: () => import('com/grange/scenic/scenic'),
    },
    {
      path: '/landspace/:id', //景点详情
      name: 'scenicDetail',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/grange/scenic/scenicDetail')
    },
    {
      path: '/scenicDetailcomment/:id',//景点详情评论
      name: 'scenicDetailcomment',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/grange/scenic/scenicDetailcomment')
    },
    {
      path: '/login',//登录
      name: 'login',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/login/login'),
    },
    {
      path: "/register",//注册
      name: "/register",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/login/register'),
    },
    {
      path: "/telephone",//手机登录
      name: "/telephone",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/login/telephone'),
    },
    {
      path: "/resetPasswordfirst",//密码重置01
      name: "/resetPasswordfirst",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/resetPassword/resetPasswordfirst'),
    },
    {
      path: "/resetDone",//密码重置01
      name: "/resetDone",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/resetPassword/resetDone'),
    },
    // 农房出租列表
    {
      path: '/farmHouse/rentList',
      name: 'rentList',
      component: () => import('com/farmHouse/rentList/rentList'),
    },
    // 农房出租未找到
    {
      path: '/farmHouse/notRentList',
      name: 'rentList',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/farmHouse/rentList/notRentList'),
    },
    // 农房出租详情
    {
      path: '/farmHouse/rentDetail/:id',
      name: 'rentDetail',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/farmHouse/rentDetail/rentDetail')
    },
    // 预约看房
    {
      path: '/farmHouse/orderTable/:id',
      name: 'orderTable',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/farmHouse/orderTable/orderTable')
    },
    // 村庄预约看房
    {
      path: '/farmHouse/villageOrder/:id',
      name: 'villageOrder',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/farmHouse/orderTable/villageOrder')
    },

    // 农房村庄列表
    {
      path: "/farmHouse/villageList",
      name: "villageList",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/farmHouse/village/villageList/villageList')
    },
    // 农房村庄详情
    {
      path: "/farmHouse/villageDetail/:id",
      name: "villageDetail",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/farmHouse/village/villageDetail/villageDetail')
    },
    // 农房求租列表
    {
      path: "/farmHouse/wantedList",
      name: "wantedList",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/farmHouse/wanted/wantedList/wantedList')
    },
    // 农房求租详情rentDetail
    {
      path: "/farmHouse/wantedDetail/:id",
      name: "wantedDetail",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/farmHouse/wanted/wantedDetail/wantedDetail')
    },
    // 地图找房-区

    // 地图找房-街道

    // 地图找房-村

    // 农房出租列表详情-地图详情
    // {
    //   path:"/map",
    //   name:'listMap',
    //   component:()=>import('com/farmHouse/map/listMap')
    // },
    // 资讯文章列表
    {
      path: "/Information/textList/:restful",
      name: "textList",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/Information/text/textList/textList'),
      props: true
    },

    // 资讯标签列表
    {
      path: "/Information/label/:restful",
      name: "label",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/Information/label/label')
    },
    // 资讯咨询列表
    {
      path: "/Information/consultList/:restful",
      name: "consultList",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/Information/consult/consultList/consultList')
    },
    // // 资讯咨询列表  无参数
    // {
    //   path: "/Information/consultList",
    //   name: "consultList",
    //   component: () => import('com/Information/consult/consultList/consultList')
    // },
    // 资讯咨询详情
    {
      path: "/Information/consultDetail/:consultId",
      name: "consultDetail",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/Information/consult/consultDetail/consultDetail')
    },
    {
      path: "/Information/searchList",
      name: "searchList",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/Information/search/searchList')
    },
    {
      path: '/innBook/:id',//住宿预订
      name: 'innBook',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/grange/farmBook/innBook')
    },
    {
      path: '/innKnow/:id/:de',//住宿须知
      name: 'innknow',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/grange/farmBook/innKnow')
    },
    {
      path: '/foodBook/:id',//美食预订
      name: 'foodBook',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/grange/farmBook/foodBook')
    },
    {
      path: '/foodKnow/:id/:de',//美食须知
      name: 'foodKnow',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/grange/farmBook/foodKnow')
    },
    {
      path: '/ticketBook/:type/:id',//wumeiling 门票预订提交订单
      name: 'ticketBook',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/grange/farmBook/ticketBook')
    },
    {
      path: '/ticketKnow/:id/:de',//门票须知
      name: 'ticketKnow',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/grange/farmBook/ticketKnow')
    },
    {
      path: '/intoPayment/:id',//住宿支付确认
      name: 'intoPayment',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/grange/farmBook/intoPayment')
    },
    {
      path: '/user',//个人中心
      name: 'personalCenter',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/personalCenter')
    },
    { // 账户设置
      path: '/personalCenter/setting/index',
      name: 'setting',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/setting/index')
    },
    {
      path: '/myOrdersAll',//全部订单
      name: 'myOrdersAll',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/myOrdersAll')
    },
    {
      path: '/farmhouseManage',//农房管理
      name: 'farmhouseManage',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/farmhouseManage/farmhouseManage')
    },
    {
      path: '/myAppointment',//我的预约
      name: 'myAppointment',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myAppointment/myAppointment')
    },
    {
      path: '/grangeManage',//农庄管理
      name: 'grangeManage',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/grangeManage/grangeManage')
    },
    {
      path: '/myTrade',//我的交易
      name: 'myTrade',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myTrade/myTrade')
    },
    {
      path: '/commentManage',//点评管理
      name: 'commentManage',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/commentManage/commentManage')
    },
    {
      path: '/myCollect',//我的收藏
      name: 'myCollect',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myCollect/myCollect')
    },
    {
      path: '/accountMail',//我的邮箱
      name: 'accountMail',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myMessage/accountMail/accountMail')
    },
    {
      path: '/accountPassword',//修改密码
      name: 'accountPassword',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myMessage/accountPassword/accountPassword')
    },
    {
      path: '/addPerson',//添加联系人
      name: 'addPerson',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myMessage/accountPerson/addPerson')
    },
    {
      path: '/personList',//联系人列表
      name: 'personList',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myMessage/accountPerson/personList')
    },
    {
      path: '/accountPhone',//手机号绑定
      name: 'accountPhone',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myMessage/accountPhone/accountPhone')
    },
    {
      path: '/accountSetting',//设置
      name: 'accountSetting',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myMessage/accountSetting/accountSetting')
    },
    {
      path: '/msgList',//消息列表
      name: 'textList',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myMessage/accountText/textList')
    },
    {
      path: '/textManage',//消息管理
      name: 'textManage',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myMessage/accountText/textMange')
    },
    // 经纪人
    {
      path: '/user-agent',//个人中心-经纪人
      name: 'personalCenter-agent',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/personalCenter-agent')
    },
    { // 账户设置
      path: '/personalCenter/index-agent',
      name: 'setting-agent',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/setting/index-agent')
    },
    {
      path: '/personalCenter/farmhouseManage-agent',//农房管理
      name: 'farmhouseManage-agent',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/farmhouseManage/farmhouseManage-agent')
    },
    { // 农房详情
      path: '/personalCenter/farmhouseDetail-agent',
      name: 'farmhouseDetail-agent',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/farmhouseManage/farmhouseDetail-agent')
    },
    { // 农庄详情
      path: '/personalCenter/grangeDetail-agent',
      name: 'grangeDetail-agent',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/grangeManage/grangeDetail-agent')
    },
    { // 成交
      path: '/personalCenter/farmhouseDeal-agent',
      name: 'farmhouseDeal-agent',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/farmhouseManage/farmhouseDeal-agent')
    },
    {
      path: '/paymentManage-agent',     // 在线买单查询
      name: 'paymentManage-agent',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/paymentManage-agent')
    },
    {
      path: '/myAppointment-agent',   //我的预约
      name: 'myAppointment-agent',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myAppointment/myAppointment-agent')
    },
    {
      path: '/myAppointmentDetail-agent',   //我的预约
      name: 'myAppointmentDetail-agent',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myAppointment/myAppointmentDetail-agent')
    },
    {
      path: '/myAppointmentDetail-detail-agent',   //我的预约
      name: 'myAppointmentDetail-detail-agent',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myAppointment/myAppointmentDetail-detail-agent')
    },
    { // 农庄列表
      path: '/personalCenter/grangeManage-agent',
      name: 'grangeManage-agent',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/grangeManage/grangeManage-agent')
    },
    // 发布农房
    {
      path: "/publish/farmhouse-agent",
      name: "issueFarm-agent",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/Issue/IssueFarm/IssueFarm-agent')
    },
    // 发布农庄
    {
      path: "/publish/IssueGrange-agent",
      name: "IssueGrange-agent",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/Issue/IssueGrange/IssueGrange-agent')
    },
    // 产品管理
    {
      path: "/personalCenter/goods-manage",
      name: "goods-manage",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/goods-agent/goods-manage')
    },
    // 新增住宿
    {
      path: "/personalCenter/goods-issue-stay",
      name: "goods-issue-stay",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/goods-agent/goods-issue-stay')
    },
    // 新增美食
    {
      path: "/personalCenter/goods-issue-food",
      name: "goods-issue-food",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/goods-agent/goods-issue-food')
    },
    // 新增门票
    {
      path: "/personalCenter/goods-issue-ticket",
      name: "goods-issue-ticket",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/goods-agent/goods-issue-ticket')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('com/map')
    },
    {
      path: '/myNeedrental',//我的收藏
      name: 'myNeedrental',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myNeedrental/myNeedrental')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('com/map')
    },
    // wumeiling 2018.11.16
    {
      path: '/search',//搜索
      name: 'search',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/search/index')
    },
    {
      path: '/cityQuery',//城市查询
      name: 'cityQuery',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/search/city')
    },
    // 发布农房、农庄、求租
    {
      path: "/Issue",
      name: "Issue",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/Issue/Issue'),
      children: [
      ]
    },
    // 发布农房1
    {
      path: "/publish/farmhouse",
      name: "issueFarm",
//       meta: {
//         keepAlive: true
//       },
      component: () => import('com/Issue/IssueFarm/IssueFarm')
    },
    // 发布咨询
    {
      path: "/Issue/IssueConsult",
      name: "IssueConsult",
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/Issue/IssueConsult/IssueConsult')
    },
    // {
    //   path: '/issue/farm',//发布农房
    //   name: 'cityQuery',
    //   component: () => import('com/Issue/IssueFarm/issueFarm')
    // },
    {
      path: '/publish/want',//发布求租
      name: 'issueWanted',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/Issue/IssueWanted/issueWanted')
    },
    {
      path: '/publish/grange',//发布农庄
      name: 'issueGrange',
//       meta: {
//         keepAlive: true
//       },
      component: () => import('com/Issue/IssueGrange/issueGrange')
    },
    {
      path: '/publish/want',//发布求租
      name: 'issueWanted',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/Issue/IssueWanted/issueWanted')
    },
    {
      path: '/innRefund',//住宿退换
      name: 'innRefund',
      component: () => import('com/personalCenter/myOrders/orderRefund/innRefund')
    },
    {
      path: '/ticketRefund',//门票退换
      name: 'ticketRefund',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/orderRefund/ticketRefund')
    },
    {
      path: '/foodRefund',//美食退换
      name: 'foodRefund',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/orderRefund/foodRefund')
    },
    {
      path: '/inntoUse/:id',//住宿待使用
      name: 'inntoUse',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoUse/inntoUse')
    },
    {
      path: '/tickettoUse/:id',//门票待使用
      name: 'tickettoUse',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoUse/tickettoUse')
    },
    {
      path: '/foodtoUse/:id',//美食使用
      name: 'foodtoUse',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoUse/foodtoUse')
    },
    {
      path: '/tickettoConfirm',//门票确认
      name: 'tickettoConfirm',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoConfirm/tickettoConfirm')
    },
    {
      path: '/inntoConfirm/:id',//住宿确认
      name: 'inntoConfirm',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoConfirm/inntoConfirm')
    },
    {
      path: '/inntoEvalute',//住宿评论
      name: 'inntoEvalute',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoEvaluate/inntoEvalute')
    },
    {
      path: '/intoAffirm/:orderId',//住宿待确认
      name: 'intoAffirm',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/orderAffirm/intoAffirm')
    },
    {
      path: '/paytosuccess',//住宿待确认
      name: 'paytosuccess',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoPay/paymentSuccess')
    },
    {
      path: '/tickettoPay',//门票支付
      name: 'tickettoPay',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoPay/tickettoPay')
    },
    {
      path: '/inntoRepay/:orderId',//住宿再支付
      name: 'inntoRepay',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoPay/inntoRepay')
    },
    {
      path: '/test',//测试
      name: 'test',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/test')
    },
    {
      path: '/tickettoPay',//门票支付
      name: 'tickettoPay',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoPay/tickettoPay')
    },
    {
      path: '/foodtoPay',//门票支付
      name: 'foodtoPay',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoPay/foodtoPay')
    },
    {
      path: '/tickettoPay',//门票支付
      name: 'tickettoPay',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoPay/tickettoPay')
    },
    {       // 支付返回渲染
      path: '/apply',
      name: 'apply',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoPay/apply')
    },
    {       // 1门票/2美食 支付成功
      path: '/payments/success/:type/:id',
      name: 'paysuccess',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoPay/paymentSuccess')
    },
    {       // 住宿 支付成功
      path: '/intoSuccess/success/:id',
      name: 'intoSuccess',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/myOrders/ordertoPay/intoSuccess')
    },
    {       //支付确认
      path: '/payment/:type/:id',
      name: 'payment',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/grange/farmBook/payment')
    },
    {       //  navbar app
      path: '/',
      name: 'navbar',
      component: () => import('com/navbar/navbar')
    },
    // 地图找农房
    {
      path: '/farmMap',
      name: 'farmMap',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/farmHouse/farmMap/listMap')
    },
    // 地图找农房详情
    {
      path: '/mapDetail/:id',
      name: 'mapDetail',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/farmHouse/farmMap/mapDetail')
    },
    // 村庄地图详情
    {
      path: '/mapVillage/:id',
      name: 'mapVillage',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/farmHouse/farmMap/mapVillage')
    },
    {       // demo
      path: '/demo',
      name: 'demo',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/demo')
    },
    { //地图找农庄
      path: '/mapFindGrange',
      name: 'mapFindGrange',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/grange/mapFindGrange/mapFindGrange')
    },
    { //导航
      path: '/navigation/:id',
      name: 'navigation',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/grange/mapFindGrange/navigation')
    },
    { //支付
      path: '/payOnline',
      name: 'payOnline',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/payment/paymentOnline')
    },
    { //支付
      path: '/payonline/success/:id',
      name: 'paymentOnlinePay',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/payment/paymentOnlinePay')
    },
    {
      path: '/agreement',
      name: 'agreement',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/personalCenter/setting/agreement')
    },
    {
      path: '/messageList',
      name: 'messageList',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/Information/list/messageList')
    },
    // 有无网络
    {
      path: '/connectFailed',
      name: 'connectFailed',
      // meta: {
      //   keepAlive: true
      // },
     component: () => import('com/connectFailed/connectFailed')

    },
    //发布农房的地图（位置）标注
    {
      path: '/locationAnnotation',
      name: 'locationAnnotation',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('com/Issue/IssueFarm/components/locationAnnotation')
    },
    {
      path: '/callMe',
      name: 'callMe',
      component: () => import('com/personalCenter/callMe/callMe')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }


})
