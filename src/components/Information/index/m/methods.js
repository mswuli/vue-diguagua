  /*
    Created by name: "FuDi", Date:2018/11/15 ,Time:12:04
*/

let m = {

  init() {
    if (this.$route.query.searchWord) {
      params.keyword = this.$route.query.searchWord
    }
    if (sessionStorage.getItem("id")) {
      var value = sessionStorage.getItem("id");
    }
    this.$http.post("/appServiceInformation",{cityId:value}).then(res => {
      if (res.msg=='success'){
        this.banner=res.data.banner
        this.info=res.data.info
        this.hotColumn=res.data.hotTag
        this.hotTag=res.data.hotColumn
        this.consultType=res.data.consultType

        const obj = {
          banner:this.banner,
          info:this.info,
          hotColumn:this.hotColumn,
          hotTag:this.hotTag,
          consultType:this.consultType
        }
        localStorage.setItem('infomationIndexData',JSON.stringify(obj));
      }
    })
  }
}
export default m
