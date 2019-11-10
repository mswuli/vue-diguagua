/*
    Created by name: "FuDi", Date:2018/11/15 ,Time:19:26
*/

let m={
  init(){
    if (sessionStorage.getItem("id")) {
      var value = sessionStorage.getItem("id");
    }
    var restful=this.$route.params.restful
    this.$http.post('/appServiceInformation/tag',{cityId:value,restful}).then(res=>{
      console.log(res);
      this.info=res.data.info
      this.title=res.data.tagName
    })
  }
}
export default m
