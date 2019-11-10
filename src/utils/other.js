/* 
 * 实时监测网络状态,不用setInterval
 */
function hasNet(fun) {
	var EventUtil = {
		addHandler: function (element, type, handler) {
		    if(element.addEventListener) {
		        element.addEventListener(type, handler, false);
		    }else if (element.attachEvent) {
		        element.attachEvent("on" + type, handler);
		    }else {
		        element["on" + type] = handler;
		    }
		}
	};
	EventUtil.addHandler(window, "online", function () {
		//this.$router.go(-1);
	  // console.log("连上网了！");
	});
	EventUtil.addHandler(window, "offline", function () {
		fun();
	});
}
//判断客户端是pc还是手机
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
export default {
  hasNet, IsPC
}