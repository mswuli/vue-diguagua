<template>
    <div class="agreement">
    <Header :title="title" :isback="true"/>
    <div style="padding: 1rem .3rem; box-sizing: border-box; font-size: .28rem" v-html="html"></div>
    </div>
</template>
<script>
import Header from "../../common/Header2";
export default {
    name: 'agreement',
    components: {
        Header
    },
    data(){
        return {
            html: '',
            title: ''
        }
    },
    created(){
        if(this.$route.query.pid){
            this.pid = this.$route.query.pid
        }
        this.init()
    },
    methods:{
        init(){
            this.$http.post("appServiceHome/protocol", {pid:this.$route.query.pid || 1}).then(res => {
                if (res.msg == "success") {
                    this.html = res.data.content
                    this.title = res.data.name
                }
            });
        }
    }
}
</script>
