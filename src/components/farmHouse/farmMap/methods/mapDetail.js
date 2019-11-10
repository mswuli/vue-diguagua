/*
    Created by name: "FuDi", Date:2018/12/7 ,Time:19:38
*/
let m = {
  init() {
    var farmhouseRentalsNumber = this.$route.params.id
    var userID = JSON.parse(localStorage.getItem('userInfo'))
    this.$http.post('appServiceFarmhouse/getRentalHouseDetail', {
      farmhouseRentalsNumber: farmhouseRentalsNumber,
      userId: userID
    }).then(res => {
      this.landList = res.data.landList
      this.foodList = res.data.foodList
      this.playList = res.data.playList
      this.stayList = res.data.stayList
      this.latitude = res.data.detail.latitude
      this.longitude = res.data.detail.longitude
      this.villageName = res.data.detail.farmhouseTitle
      this.setmap()
      this.detail=res.data.detail
    })
    ;
  },

  setmap(fact) {
    this.map = new BMap.Map("allmap");    // 创建Map实例
    this.map.centerAndZoom(new BMap.Point(this.longitude, this.latitude), 11);
    this.map.enableScrollWheelZoom(true);

    this.map.disableDragging();     //禁止拖拽
    function ComplexCustomOverlay(point, text, id, index) {
      this._point = point;
      this._text = text;
      this._id = id;
      this._index = index;
    }

    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function (map) {

      this._map = map;

      //自定义控件容器

      let div = this._div = document.createElement("div");
      div.className = 'overlay';
      // div.id = "overlay"+this._index;
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      div.style.padding = "2px";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "12px";
      let that = this;
      //小尖角
      let arrow = this._arrow = document.createElement("div");
      arrow.className = "map-arrow";
      arrow.style.position = "absolute";
      arrow.style.width = "0px";
      arrow.style.height = "0px";
      arrow.style.top = "42px";
      arrow.style.left = "18px";
      arrow.style.border = "10px transparent solid";
      arrow.style.borderTopColor = "#ff9900"
      div.appendChild(arrow);
      //a标签名称
      let a = this._a = document.createElement("a");
      a.className = "map-content";
      a.style.backgroundColor = "#ff9900";
      a.style.borderRadius = "5px";
      a.style.padding = "5px";
      a.style.color = "white";
      a.style.textDecoration = "none";
      a.style.height = "30px";
      a.style.whiteSpace = 'nowrap';
      a.style.display = "inline-block";
      div.appendChild(a);
      a.appendChild(document.createTextNode(this._text));
      map.getPanes().labelPane.appendChild(div);
      return div;
    }
    ComplexCustomOverlay.prototype.draw = function () {

      var map = this._map;

      var pixel = map.pointToOverlayPixel(this._point);

      this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";

      this._div.style.top = pixel.y - 30 + "px";

    }
    // 景点
    if (this.changeRed == 0) {
      if (this.landList) {
        this.landList.forEach((item, index) => {
          let point = new BMap.Point(item.longitude, item.latitude); //添加坐标
          // let point = new BMap.Point(116.4035,39.915); //添加坐标
          let myCompOverlay = new ComplexCustomOverlay(point, item.lanspacePlaceName, item.id, index);
          this.map.addOverlay(myCompOverlay);
          var odiv = document.getElementsByClassName('overlay');
          // console.log(odiv);
          var that = this
          odiv[index].onclick = function () {
            console.log(item.lanspacePlaceNumber);
            that.$router.push({
              name: 'scenicDetail',
              params: {id: item.lanspacePlaceNumber}
            })
          }
        })

      } else {

        let point = new BMap.Point(this.farmhouseNum.longitude, this.farmhouseNum.latitude); //添加坐标
        // let point = new BMap.Point(116.4035,39.915); //添加坐标
        let myCompOverlay = new ComplexCustomOverlay(point, this.farmhouseNum.villageName + this.farmhouseNum.count + '套', this.farmhouseNum.id);
        this.map.addOverlay(myCompOverlay);
      }

    }

    // 美食
    if (this.changeRed == 1) {
      if (this.foodList) {
        this.foodList.forEach((item, index) => {
          let point = new BMap.Point(item.longitude, item.latitude); //添加坐标
          // let point = new BMap.Point(116.4035,39.915); //添加坐标
          let myCompOverlay = new ComplexCustomOverlay(point, item.grangeName + item.fstreetName, item.id, index);
          this.map.addOverlay(myCompOverlay);
          var odiv = document.getElementsByClassName('overlay');
          // console.log(odiv);
          var that = this
          odiv[index].onclick = function () {
            console.log(item.grangeNumber);
            that.$router.push({
              name: 'grangedetail',
              params: {id: item.grangeNumber}
            })
          }
        })

      } else {

        let point = new BMap.Point(this.farmhouseNum.longitude, this.farmhouseNum.latitude); //添加坐标
        // let point = new BMap.Point(116.4035,39.915); //添加坐标
        let myCompOverlay = new ComplexCustomOverlay(point, this.farmhouseNum.villageName + this.farmhouseNum.count + '套', this.farmhouseNum.id);
        this.map.addOverlay(myCompOverlay);
      }
    }


    // 住宿
    if (this.changeRed == 2) {
      if (this.stayList) {
        this.stayList.forEach((item, index) => {
          let point = new BMap.Point(item.longitude, item.latitude); //添加坐标
          // let point = new BMap.Point(116.4035,39.915); //添加坐标
          let myCompOverlay = new ComplexCustomOverlay(point, item.grangeName + item.fstreetName, item.id, index);
          this.map.addOverlay(myCompOverlay);
          var odiv = document.getElementsByClassName('overlay');
          // console.log(odiv);
          var that = this
          odiv[index].onclick = function () {
            console.log(item.grangeNumber);
            that.$router.push({
              name: 'grangedetail',
              params: {id: item.grangeNumber}
            })
          }
        })

      } else {

        let point = new BMap.Point(this.farmhouseNum.longitude, this.farmhouseNum.latitude); //添加坐标
        // let point = new BMap.Point(116.4035,39.915); //添加坐标
        let myCompOverlay = new ComplexCustomOverlay(point, this.farmhouseNum.villageName + this.farmhouseNum.count + '套', this.farmhouseNum.id);
        this.map.addOverlay(myCompOverlay);
      }
    }


    // 游玩
    if (this.changeRed == 3) {
      if (this.playList) {
        this.playList.forEach((item, index) => {
          let point = new BMap.Point(item.longitude, item.latitude); //添加坐标
          // let point = new BMap.Point(116.4035,39.915); //添加坐标
          let myCompOverlay = new ComplexCustomOverlay(point, item.grangeName + item.fstreetName, item.id, index);
          this.map.addOverlay(myCompOverlay);
          var odiv = document.getElementsByClassName('overlay');
          // console.log(odiv);
          var that = this
          odiv[index].onclick = function () {
            console.log(item.grangeNumber);
            that.$router.push({
              name: 'grangedetail',
              params: {id: item.grangeNumber}
            })
          }
        })

      } else {

        let point = new BMap.Point(this.farmhouseNum.longitude, this.farmhouseNum.latitude); //添加坐标
        // let point = new BMap.Point(116.4035,39.915); //添加坐标
        let myCompOverlay = new ComplexCustomOverlay(point, this.farmhouseNum.villageName + this.farmhouseNum.count + '套', this.farmhouseNum.id);
        this.map.addOverlay(myCompOverlay);
      }
    }


    var that = this
    this.map.addEventListener("touchmove", function (e) {
      that.map.enableDragging();
    });
    this.map.addEventListener('touchend', function (e) {
      that.map.disableDragging();
    })
    this.map.disableDragging();
    this.map.enableScrollWheelZoom(true);
  },
  change(index) {
    this.changeRed = index

    if (index == 0) {
      this.landList
      this.foodList = []
      this.stayList = []
      this.playList = []
      this.setmap()
      this.init()
    }
    if (index == 1) {
      this.landList = []
      this.foodList
      this.stayList = []
      this.playList = []
      this.setmap()
      this.init()
    }
    if (index == 2) {
      this.landList = []
      this.foodList = []
      this.stayList
      console.log(this.stayList);
      this.playList = []

      this.setmap()
      this.init()
    }
    if (index == 3) {
      this.landList = []
      this.foodList = []
      this.stayList = []
      this.playList
      this.setmap()
      this.init()
    }

  },
  tagcilck() {
    var odiv = document.getElementsByClassName('overlay');
    console.log(odiv);
  }
}
export default m

