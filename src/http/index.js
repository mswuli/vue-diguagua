'use strict'

import axios from 'axios'
import router from '../router/index'
import qs from 'qs'
import store from '../vuex/index'

// const baseUrl= "https://www.3xgc.com"
// 'https://www.whsxgcw.com/';

// xiaoyun
const baseUrl='https://www.3xgc.net';   // 农庄详情
// const baseUrl='http://192.168.1.155:9001';    // 登录

// pengliang
// const baseUrl='http://192.168.2.145:9001';    // 订单
// const baseUrl='http://192.168.2.145:8070';    // 登录

axios.interceptors.request.use(config => {
  // loading
  if (store.state.userInfo && store.state.userInfo.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = store.state.userInfo.token;
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // console.log(response)
  if(response.data.code==1){
    alert('token过期，请重新登录');
    // let way=sessionStorage.getItem('loginWay');
    // let path=way==1?'/login':'clogin'

    setTimeout(function () {
      router.replace({
        path: '/' // 到登录页重新获取token
      })
    },2000)
  }
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response,lock) {
  // loading
  // console.log(response,lock)
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }else{
    if(lock){ // 是否提示 true不显示，false 显示
      alert('网络异常')
    }
    return response
  }
  // 异常状态下，把错误信息返回去
  // return {
  //   status: -404,
  //   msg: '网络异常'
  // }
}

export default {
  post (url, params,lock,baseurl) {
    // params.timestamp=new Date().getTime();
    // params.nonce =config.nonce(10);
    // params.signature =config.signature(new Date().getTime(),config.nonce(10));
    params = params || new Object()
    if(localStorage.getItem('userInfo')){
      params.userId = JSON.parse(localStorage.getItem('userInfo')).userId;
    }
    return axios({
      method: 'post',
      baseURL: baseurl|| baseUrl,
      url:url,
      data: qs.stringify(params),
      timeout: 150000,
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(function (res) {
        return checkStatus(res,lock)
      }
    )
  },
  postImg (url, params,lock,baseurl,header) {
    return axios({
      method: 'post',
      baseURL: baseurl|| baseUrl,
      url:url,
      data: params,
      timeout: 150000,
      headers: header
    }).then(function (res) {
        return checkStatus(res,lock)
      }
    )
  }
}

// 加密
var config={
  token:'2Ol8runfengkjDoWHsxGcpro',
  is_emptyObj:function (obj) {
    for(var a in obj){
      return 0
    }
    return 1
  },
  nonce:function (len) {
    len = len || 32;
    var $chars = 'ABCDEFGHIJKMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  //生成签名
  signature:function (timestamp,nonce){
    var arr = [];
    arr[arr.length] = this.token;
    arr[arr.length] = timestamp;
    arr[arr.length] = nonce;
    arr.sort();
    var x = "";
    for (var i = 0; i < arr.length; i++) {
      x += arr[i];
    }
    var signature = sha1(x);
    return signature;
  }
};

function encodeUTF8(s) {
  var i, r = [], c, x;
  for (i = 0; i < s.length; i++)
    if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
    else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
    else {
      if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
        c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
          r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
      else r.push(0xE0 + (c >> 12 & 0xF));
      r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
    };
  return r;
}

// 字符串加密成 hex 字符串
function sha1(s) {
  var data = new Uint8Array(encodeUTF8(s))
  var i, j, t;
  var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
  s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
  for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
  s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
  s[l - 1] = data.length << 3;
  var w = [], f = [
      function () { return m[1] & m[2] | ~m[1] & m[3]; },
      function () { return m[1] ^ m[2] ^ m[3]; },
      function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
      function () { return m[1] ^ m[2] ^ m[3]; }
    ], rol = function (n, c) { return n << c | n >>> (32 - c); },
    k = [1518500249, 1859775393, -1894007588, -899497514],
    m = [1732584193, -271733879, null, null, -1009589776];
  m[2] = ~m[0], m[3] = ~m[1];
  for (i = 0; i < s.length; i += 16) {
    var o = m.slice(0);
    for (j = 0; j < 80; j++)
      w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
        t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
        m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
    for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
  };
  t = new DataView(new Uint32Array(m).buffer);
  for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);

  var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
    return (e < 16 ? "0" : "") + e.toString(16);
  }).join("");
  return hex;
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.code === 1) {
    alert(res.errMsg)
  }
  return res
}



