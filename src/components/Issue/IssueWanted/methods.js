/*
    Created by name: "FuDi", Date:2018/12/20 ,Time:9:08
*/
import utils from '@/utils/validate'

let m = {
  init() {
    if (sessionStorage.getItem("id")) {
      var value = sessionStorage.getItem("id");
    }
    if (localStorage.getItem("userInfo")) {
      this.mobileValid=false
      var userID = JSON.parse(localStorage.getItem("userInfo")).userId
    }
    this.$http.post('/appServiceInformation/publishFarmhouseRentingParameter', {
      cityId: value,
      userId: userID
    }).then(res => {
      if (res.msg == "success") {
        const data = res.data
        // 期望地区
        this.area = data.area
        this.area.forEach((item, index) => {
          this.columns.push(item.label)
        })
        if (this.area[0].children) {
          this.area[0].children.forEach((item, index) => {
            this.columns1.push(item.label)
          })
          this.columnsIndex1 = 1
        }

        // 期望景点
        this.spot = res.data.landspace;
        this.spot.forEach((item, index) => {
          this.spotColumns.push(item.label);
        });
        if (this.spot[0].children) {
          this.spot[0].children.forEach((item, index) => {
            this.spotColumns1.push(item.label)
          })
        }
        console.log(data.room);
        // 户型 室 厅
        this.roomColumns = data.room
        var room = []
        this.roomColumns.forEach((item, index) => {
          room.push(item.name)
          this.roomColumns = room
        });
        if (this.roomColumns[0].children) {
          this.roomColumns[0].children.forEach((item, index) => {
            this.roomColumns.push(item.name)
          })
        }
        this.hallColumns = data.hall
        var hall = []
        this.hallColumns.forEach((item, index) => {
          hall.push(item.name)
          this.hallColumns = hall

        });
        // if (this.hallColumns[0].children) {
        //   this.hallColumns[0].children.forEach((item, index) => {
        //     this.hallColumns.push(item.name)
        //   })
        // }
        // 房屋特色
        this.characteristic = data.characteristic
        this.characteristic.forEach((item, index) => {
          item.ischecked = false
        })
        // 出租用途
        this.use = data.use
        this.use.forEach((item, index) => {
          item.ischecked = false
        })
        this.linkmobile = data.mobile
      }
    })
  },
  showPop(type) {
    /**
     * type == 1 所在地区
     * type == 2 周边景点
     * type == 3 户型
     * type == 4 楼层
     * type == 5 朝向
     * type == 6 装修情况
     * type == 7 房屋结构
     * type == 8 房屋类型
     */
    this.popType = type
    this.popShow = true
    if (type == 9) {
      setTimeout(() => {
        this.setmap();
      }, 1500)
    }
  },
  // 所在地区
  onChange(picker, value, index) {
    this.columnsIndex = index + 1
    this.columnsIndex1 = null
    this.columnsIndex2 = null
    this.columns1 = []
    this.columns2 = []

    if (this.area[index].children) {
      this.area[index].children.forEach((item, index) => {
        this.columns1.push(item.label)
      })
    }
    if (this.columns1.length > 0) {
      this.columnsIndex1 = 1
    }
  },
  onChange1(picker, value, index) {
    this.columnsIndex1 = index + 1
    this.columnsIndex2 = null
    this.columns2 = []
    if (this.area[this.columnsIndex - 1].children[index].children) {
      this.area[this.columnsIndex - 1].children[index].children.forEach((item, index) => {
        this.columns2.push(item.label)
      })
    }
    if (this.columns2.length > 0) {
      this.columnsIndex2 = 1
    }
  },
  onChange2(picker, value, index) {
    this.columnsIndex2 = index + 1
  },

  //景点
  spotonChange(picker, value, index) {
    this.spotColumnsIndex = index + 1;
    this.spotColumnsIndex1 = null;
    this.spotColumns1 = [];
    this.spot[index].children.forEach((item, index) => {
      this.spotColumns1.push(item.label);
    });
    if (this.spotColumns1 > 0) {
      this.spotColumnsIndex1 = 1;
    }
  },
  // 房屋结构
  buildingStructureChange(picker, value, index) {
    this.buildingStructureIndex = index + 1
  },
  roomChange(picker, value, index) {
    this.roomIndex = index + 1
    console.log(this.roomIndex);
  },

  hallChange(picker, value, index) {
    this.hallIndex = index

  },

  spotonChange1(picker, value, index) {
    this.spotColumnsIndex1 = index + 1;
  },
  checkCharacteristic(index, item) {           // 房屋特色
    if (this.characteristic[index].ischecked) {
      this.checkCharacteristicIds.splice(index, 1)
      this.checkCharacteristicName.splice(index, 1)
      this.checkCharacteristicResful.splice(index, 1)
    } else {
      this.checkCharacteristicIds.push(item.id)
      this.checkCharacteristicName.push(item.name)
      this.checkCharacteristicResful.push(item.restful)
    }
    this.checkCharacteristicShow = false
    this.$nextTick(() => {
      this.characteristic[index].ischecked = !this.characteristic[index].ischecked
      this.checkCharacteristicShow = true
    })
  },
  // 选择用途
  checkUse(index, item) {           // 出租用途
    if (this.use[index].ischecked) {    // 已选中 取消选中
      this.checkUseIds.splice(index, 1)
      this.checkUseName.splice(index, 1)
      this.checkUseResful.splice(index, 1)
      this.checkUseShow = false
      this.$nextTick(() => {
        this.use[index].ischecked = false
        this.checkUseShow = true
      })
    } else {                          // 未选中 选中
      if (this.checkUseIds.length < 3) {
        this.checkUseIds.push(item.id)
        this.checkUseName.push(item.name)
        this.checkUseResful.push(item.restful)
        this.checkUseShow = false
        this.$nextTick(() => {
          this.use[index].ischecked = true
          this.checkUseShow = true
        })
      } else {
        this.$toast('最多选择三个出租用途')
        // return false
      }
    }
    // this.checkUseShow = false
    // this.$nextTick(()=>{
    //   this.use[index].ischecked = !this.use[index].ischecked
    //   this.checkUseShow = true
    // })
    // console.log(this.use)
  },
  rent(o) {           // 是否整租
    this.isRent = (o == 1 ? true : false)
    if (o == 1) {
      this.managementSubject = '企业'
    } else {
      this.managementSubject = '个人'
    }

    console.log(this.managementSubject)
  },
  face(o) {           // 是否面谈
    this.isFace = (o == 1 ? true : false)
    if (o == 1) {
      this.linksex = 0
    } else if (o == 0) {
      this.linksex = 1
    }
    else {
      this.linksex = ''
    }
    console.log(this.linksex);
  },

  // pop 确定
  confirmPop() {
    if (this.popType == 1) {         // 所在地区
      // if (this.columnsIndex2) {         // 村
      var columnsIds = [], columnsName = []
      if( !(this.columnsIndex - 0 - 1 === 0)){   // 一级非不限
        columnsName.push(this.area[this.columnsIndex - 0 - 1].label)
        columnsIds.push(this.area[this.columnsIndex - 0 - 1].value)
        if (!(this.columnsIndex1 - 0 - 1 === 0)) {
          columnsName.push(this.area[this.columnsIndex - 0 - 1].children[this.columnsIndex1 - 0 - 1].label)
          columnsIds.push(this.area[this.columnsIndex - 0 - 1].children[this.columnsIndex1 - 0 - 1].value)
          if (!(this.columnsIndex2 - 0 - 1 === 0)) {
            columnsIds.push(this.area[this.columnsIndex - 0 - 1].children[this.columnsIndex1 - 0 - 1].children[this.columnsIndex2 - 0 - 1].value)
            columnsName.push(this.area[this.columnsIndex - 0 - 1].children[this.columnsIndex1 - 0 - 1].children[this.columnsIndex2 - 0 - 1].label)
          }
        }
      }
      console.log(this.columnsName, this.columnsIds)
      this.columnsName = columnsName
      this.columnsIds = columnsIds


      // } else {
      //   this.$toast('所在地区请精确到村');
      // }

    }
    if (this.popType == 2) {         // 景点
      if (this.spotColumnsIndex1) {
        var spotColumnsIds = [], spotColumnsName = []
        spotColumnsName.push(this.spot[this.spotColumnsIndex - 0 - 1].label)
        spotColumnsName.push(this.spot[this.spotColumnsIndex - 0 - 1].children[this.spotColumnsIndex1 - 0 - 1].label)
        spotColumnsIds.push(this.spot[this.spotColumnsIndex - 0 - 1].value)
        spotColumnsIds.push(this.spot[this.spotColumnsIndex - 0 - 1].children[this.spotColumnsIndex1 - 0 - 1].value)
        this.spotColumnsName = spotColumnsName[1]
        this.spotColumnsIds = spotColumnsIds[1];
        console.log(this.spotColumnsName);
        this.sceincAround = this.spotColumnsName;
        this.popupShow = false;
      } else {
        this.$toast('周边景点请精确到景点');
      }
    }

    if (this.popType == 3) {         // 房屋户型
      if (this.roomIndex && this.hallIndex >=0) {
        console.log(this.hallIndex);
        // if (this.hallIndex==0){
        //
        //   this.apartmentName = this.roomColumns[this.roomIndex - 1] + '-' + this.hallColumns[0]
        // }
        this.apartmentName = this.roomColumns[this.roomIndex - 1] + '-' + this.hallColumns[this.hallIndex]
      }
    }
    this.popShow = false
  },
  getCode() {
    if (!utils.isvalidPhone(this.linkmobile)) {
      this.$toast('手机号格式错误')
      return false
    }
    this.sendAuthCode = false;
    this.auth_time = 120;
    let auth_timetimer = setInterval(() => {
      this.auth_time--;
      if (this.auth_time <= 0) {
        this.sendAuthCode = true;
        clearInterval(auth_timetimer);
      }
    }, 1000);

    this.$http.post('appServiceSso/sendCode', {mobile: this.linkmobile}).then(
      res => {
        if (res.msg == 'success') {
          this.$toast('验证码发送成功')
        } else {
          this.$toast(res.info)
        }
      }
    ).catch(error => {
      //this.$toast('网络错误');
    })
  },
  // pop 关闭
  closePop() {
    this.popShow = false
  },
  // 发布求租
  submit() {
    const params = new Object()
    console.log(this.columnsName)
    if (this.columnsName.length > 0) {          // 所在地区
      if (this.columnsName[this.columnsName.length - 1] === "不限") {
        this.columnsName.pop()
        params.areaName = sessionStorage.getItem("cityName") + ',' + this.columnsName.join(',')
        this.columnsIds.pop()
        params.areaId = sessionStorage.getItem("id") + ',' + this.columnsIds.join(',')
        // params.areaId = "1,"+this.columnsIds.pop().join(',')
      } else {
        params.areaName = sessionStorage.getItem("cityName") + ',' + this.columnsName.join(',')
        params.areaId = sessionStorage.getItem("id") + ',' + this.columnsIds.join(',')
      }
    } else {
      params.areaName = sessionStorage.getItem("cityName")
      params.areaId = sessionStorage.getItem("id")
    }
    console.log(params)
    if (this.spotColumnsName.length > 0) {
      params.landspaceId = this.spotColumnsIds;
      params.landspaceName = this.sceincAround;
    } else {
      this.$toast("请选择周边景区")
      return false
    }
    // 户型
    if (this.apartmentName !==null   ) {
      console.log(this.apartmentName);
      console.log(this.hallIndex);
      params.bedroom = this.roomIndex
      params.drawingroom = this.hallIndex
    } else {
      this.$toast("请选择户型")
    }



    // 面积
    if (this.floorSpace!=""){
      params.floorSpace = this.floorSpace
    } else{
      this.$toast('请填写建筑面积')
    }

    // 租赁年限
    if (this.rentingYears!=""){
      params.rentingYears = this.rentingYears
    } else{
      this.$toast('请填写租赁年限')
    }
    console.log(this.rentingPrice);
    //	租赁价格
    if (this.rentingPrice==""){
      params.isInterview = 1
      params.rentingPrice=""
    } else {
      params.rentingPrice = parseInt(this.rentingPrice).toFixed(2)
      params.isInterview = 0
    }
    // 特色
    if (this.checkCharacteristicResful.length > 0) {
      params.characteristicId = this.checkCharacteristicIds.join(',')
      params.characteristicName = this.checkCharacteristicName.join(',')
      params.characteristicRestful = this.checkCharacteristicResful.join(',')
    } else {
      this.$toast('至少选择一个房屋特色')
      return false
    }
    // 用途
    if (this.checkUseResful.length > 0) {
      params.useId = this.checkUseIds.join(',')
      params.useName = this.checkUseName.join(',')
      params.useRestful = this.checkUseResful.join(',')
    } else {
      this.$toast('至少选择一个出租用途')
      return false
    }
    // 经营主体
    if (this.managementSubject!=""){
      params.managementSubject = this.managementSubject
    } else{
      this.$toast('至少选择经营主体')
    }
    // 信息标题
    if (this.farmhouseTitle !== '') {
      params.farmhouseTitle = this.farmhouseTitle
    } else {
      this.$toast('请填写信息标题')
    }
    // 详细信息
    params.farmhouseDescribe = this.farmhouseDescribe
    // 性别
    if (this.linksex !== '') {
      params.linksex = this.linksex
    } else {
      this.$toast('请选择性别')
    }
    // 姓名
    if (this.linkman !== '') {
      params.linkman = this.linkman
    } else {
      this.$toast('请填写姓名')
    }
    // // 电话
    // if (this.linkmobile !== '') {
    //   params.linkmobile = this.linkmobile
    // } else {
    //   this.$toast('请填写手机号')
    // }
    if (localStorage.getItem("userInfo")) {
      var userID = JSON.parse(localStorage.getItem("userInfo")).userId
      var teleNum=JSON.parse(localStorage.getItem('userInfo')).nickName;
      if (userID){
        if (teleNum) {
          if (this.linkmobile!==this.teleNum){
            // if (this.linkmobile!==""){
            //   params.linkmobile = this.linkmobile
              // if(this.verificationCode !==""){
              //   params.verificationCode=this.verificationCode;
              // }else{
              //   this.$toast("请输入验证码")
              //   return false
              // }
            // }
          }
        }else{
          if (this.linkmobile!==""){
            params.linkmobile = this.linkmobile
            if(this.verificationCode !==""){
              params.verificationCode=this.verificationCode;
            }else{
              this.$toast("请输入验证码")
              return false
            }
          } else{
            this.$toast("请输入手机号码")
            return false
          }
        }
      }
    }else{
      if (this.linkmobile!==""){
        params.linkmobile = this.linkmobile
        if(this.verificationCode !==""){
          params.verificationCode=this.verificationCode;
        }else{
          this.$toast("请输入验证码")
          return false
        }

      } else{
        this.$toast("请输入手机号码")
        return false
      }
    }
    // params.isInterview = 1



    console.log(params);
    this.$http.post('/appServiceInformation/publishFarmhouseRenting',params).then(res=>{
      if (res.msg == "success") {
        this.$toast('发布成功')
        this.$router.push(
          {name:'farmHouse'}
        )
      } else {
        this.$toast(res.info)
      }
    })
  }
}
export default m
