<template>
    <div class="calendar">
        <div class="date-tools">
            <div class="date-years">
                <button class="date-btn date-left" @click="subMonth()"><</button>
                <button class="date-middle" @click="selectYM()">{{panelYear}}年{{panelMonth+1}}月 <span style="font-size: 12px">(点击切换年月)</span></button>
                <button class="date-btn date-right" @click="addMonth()">></button>
            </div>
            <div class="date-weeks">
                <span>日</span>
                <span>一</span>
                <span>二</span>
                <span>三</span>
                <span>四</span>
                <span>五</span>
                <span>六</span>
            </div>
            <div class="date-days" v-if="show">
                <template v-for="(item,index) in dayFullListTab">
                    <div class="button" :style="'' + (item.date == 0?'border: none':'') + ''">
                        <button v-if="item.date!=0">
                            <a href="javascript:void(0);" v-if="(trainDateFullList.includes(item.date))" class="active" @click="getCurrentDay(item.date)">{{item.date | filterDay}} </a>
                            <a href="javascript:void(0);" v-else @click="getCurrentDay(item.date)">{{item.date | filterDay}} </a>
                        </button>
                        <button v-else>
                            <a href="javascript:void(0);" style="opacity:0;">{{item.date}} </a>
                        </button>
                    </div>
                </template>
            </div>
            <!-- 年月下拉框 -->
            <div class="drop-down-ym" v-if="showDropDownYM">
                <div class="drop-down-y">
                    <a href="javascript:void(0);" v-for="(item,index) in yearList" @click="selectY(item)">{{item}}</a>
                </div>
                <div class="drop-down-m">
                    <a href="javascript:void(0);" v-for="(item,index) in monthList" @click="selectM(item-1)">{{item}}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'calendar',
    props: ['dateToolsKey','trainDateList','trainDateFullList','trainDateFullListTab'],
    data(){
        return {
            trainDateFullLists: this.trainDateFullList || [],
            trainDateFullListTabs: this.trainDateFullListTab || [],
            yearList:[2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022],
            monthList:[1,2,3,4,5,6,7,8,9,10,11,12],
            weekList:[],
            dayList:[],//所有的天数列表，前面空位补0
            dayFullList:[],//所有的天数列表，前面空位补0
            dayFullListTab:[],
            panelYear:'',//仪表盘显示的年
            panelMonth:'',//仪表盘显示的月（从0开始）
            panelDay:'',//仪表盘显示的天（从1开始）
            firstDay:'',//每月第一天
            lastDay:'',//每月最后一天也即每月多少天
            firstDayisWhat:'',//第一天星期几0-6（星期日到星期六）
            showDropDownYM:false,
            show: true
        }
    },
    filters:{
        filterDay(value){
            return parseInt(value.slice(-2));
        }
    },
    methods:{
        setList(trainDateFullListTab,trainDateFullList){          // 获取月列表并渲染
            this.trainDateFullListTabs = trainDateFullListTab
            this.trainDateFullLists = trainDateFullList
            this.setData()
        },
        dateInit(year=(new Date()).getFullYear(),month=(new Date()).getMonth()){
            let self = this;
            let y = year;
            let m = month;
            self.panelYear = year;
            self.panelMonth = month;
            self.firstDay = (new Date(y,m,1)).getDate();//每月第一天
            self.lastDay = (new Date(y,m+1,0)).getDate();//每月最后一天也即每月多少天
            self.firstDayisWhat = (new Date(y,m,1)).getDay();//第一天星期几0-6（星期日到星期六）
            let beginTmp = new Array(self.firstDayisWhat).fill(0);//初始化长度为3的数组并填充0
            let lastTmp = [];//初始化长度为当月天数的数组并填充为0-30或0-31
            let lastFullTmp = [];//初始化完整的月的每天格式为年月日20180627
            for (let i=1;i<=self.lastDay;i++){
                lastTmp.push(i);
                lastFullTmp.push(''+self.panelYear+self.addPreZero(self.panelMonth+1)+self.addPreZero(i));
            }
            self.dayList=[...beginTmp,...lastTmp];//用结构的方式生成新日期数组
            self.dayFullList = [...beginTmp,...lastFullTmp];//用结构的方式生成年月日完整的新日期数组
            this.setData()
        },
        setData(){      // 全部数据渲染
            var dayFullListTab = []
            this.dayFullListTab = []
            this.dayFullList.map((day, index)=>{
                var item = {
                    date: day,
                    price: '',
                    cost:'',
                    stock:''
                }
                dayFullListTab.push(item)
                if(this.trainDateFullListTabs){
                    this.trainDateFullListTabs.map((element)=>{
                        if(day == element.date){
                            var item = {
                                date: element.date,
                                price: element.price >= 0 ? element.price :'',
                                cost: element.cost >= 0 ? element.cost :'',
                                stock: element.stock >= 0 ? element.stock :''
                            }
                            dayFullListTab[index] = item
                        }
                    })
                }
            })
            this.show = false
            this.$nextTick(()=>{
                this.dayFullListTab = dayFullListTab
                this.show = true
            })
        },
        subMonth(){
            let self = this;
            if(self.panelMonth>0){
                self.panelMonth--;
            }
            this.$emit('newDate', this.panelYear + (this.panelMonth < 9 ? '0' : '') + (this.panelMonth + 1))
        },
        addMonth(){
            let self = this;
            if(self.panelMonth<11){
                self.panelMonth++;
            }
            this.$emit('newDate', this.panelYear + (this.panelMonth < 9 ? '0' : '') + (this.panelMonth + 1))
        },
        getCurrentDay(currentDay){
            this.panelDay = currentDay;
            this.$emit('checkDay', currentDay);
        },
        selectYM(){
            let self = this;
            self.showDropDownYM = true;
        },
        selectY(year){
            let self = this;
            self.panelYear = year;
        },
        selectM(month){
            let self = this;
            self.panelMonth = month;
            self.showDropDownYM=false;
            this.$emit('newDate', this.panelYear + (month < 9 ? '0' : '') + (month + 1))
        },
        addPreZero(num){//小于9的需要添加0前缀
            return (num>9) ? num:('0'+num);
        },
        removePreZero(num){//小于9的需要去除0前缀
            return parseInt(num);
        },
        change(type, num, index){
            var item = this.dayFullListTab[index]
            if(type == 1){
                item.price = num
            }
            if(type == 2){
                item.cost = num
            }
            if(type == 3){
                item.stock = num
            }
            this.dayFullListTab[index] = item
            this.$nextTick(()=>{
                this.$emit('topDateEvent', this.dayFullListTab);
            })
        }
    },
    watch: {
        panelMonth(newVal,oldVal){//检测月份变化
            this.dateInit(this.panelYear,this.panelMonth);
        },
        panelYear(newVal,oldVal){//检测年份变化
            this.dateInit(this.panelYear,this.panelMonth);
        },
        panelDay(newVal,oldVal){//检测具体日期变化
        }
    },
    mounted(){
        this.dateInit();
    }
}
</script>


<style scoped>
.noone{
    color: #d4d4d4
}
.calendar{
    width:100%;
    margin: 0
}
button{
    background-color:#fff;
    cursor:pointer;
    outline: none;
    box-sizing: border-box;
}
.date-btn,.date-middle{
    color:#333!important;
}
.date-middle{
    border: none;
    font-size: 18px;
}
.date-tools{
    position:relative;
    /* margin-top:80px; */
    display:inline-block;
    width:100%;
    overflow: hidden;
    box-sizing: border-box;
}
.date-btn{
    width:34px;
    height:34px;
    border-radius:50%;
}
.date-btn:hover{
    color:#fff;
    background-color:#0A81E5;
    opacity:0.6;
}
.date-years{
    margin:14px 20px 0 20px;
    display:flex;
    justify-content:space-between;
}
.date-weeks{
    display: flex;
    justify-content:space-between;
    border-bottom: 1px solid #eee;
}
.date-weeks span{
    display:inline-block;
    width:14.28%;
    height:34px;
    line-height:34px;
    text-align:center;
}
.date-days{
    font-size: 0;
}
.date-days button{
    width:100%;
    height:40px;
    background-color:#fff;
    outline: none;
    border: none;
    font-size: 18;
}
.date-days .button{
    display: inline-block;
    width:14.28%;
    box-sizing: border-box;
}

.date-days a{
    color:#000;
    display:inline-block;
    width:34px;
    height:34px;
    line-height:34px;
    border-radius:50%;
    text-align:center;
}
.date-days a.active{
    cursor:pointer;
    color:#fff;
    background-color:#0A81E5;
}
.date-days a:hover{
    color:#fff;
    background-color:#0A81E5;
    opacity:0.6;
}

.drop-down-ym{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    min-height: 404px;
    /* max-height: 404px; */
    background-color:rgba(255,255,255,0.9);
    padding: 40px 0;
    font-size: 0;
    box-sizing: border-box;
}
.drop-down-y,.drop-down-m{
    display: inline-block;width: 50%;
    height: 100%;
    overflow:auto;
    padding:5px;
    box-sizing: border-box;
}
.drop-down-y::-webkit-scrollbar,.drop-down-m::-webkit-scrollbar{
    display: none;
}
.drop-down-y{
    
}
.drop-down-m{
    
}
.drop-down-y a,.drop-down-m a{
    color:#000;
    text-align:center;
    display: inline-block;
    width:100%;
    height:40px;
    line-height:40px;
    font-size:16px;
    margin:0 0 5px 0;
}
.drop-down-y a:hover,.drop-down-m a:hover{
    color:#fff;
    background-color:rgba(10, 130, 229, 0.774);
    border-radius: 0
}
.drop-down-y a.active,.drop-down-m a.active{
    color:#fff;
    background-color:#0A81E5;
    border-radius:5px;
}
</style>
<style>
.date-days .el-input__inner{
    line-height: 30px!important;
    height: 30px!important;
    font-size: 12px;
}
.date-days .el-input-group__append{
    font-size: 12px;
    padding: 0 6px
}
</style>