/*
    Created by name: "FuDi", Date:2018/11/16 ,Time:13:43
*/

let m = {
  init() {
    if (sessionStorage.getItem("id")) {
      var value = sessionStorage.getItem("id");
    }

    var id = this.$route.params.id
    this.$http.post('/appServiceInformation/news', {cityId: value, id: id}).then(res => {

      this.info = res.data.info
      this.relatedInfo = res.data.relatedInfo

      this.TITLE = res.data.info[0].infoTitle + '- 武汉三乡工程网'
      if (res.data.comment) {
        this.commentShow = true
      }
      this.comment1 = res.data.comment[0]
      this.comment = res.data.comment
    })
    this.$http.post('/appServiceInformation/others', {cityId: value, id: id}).then(res => {
      this.farmhouse = res.data.farmhouse
      this.grange = res.data.grange

    })
  }
}
export default m
