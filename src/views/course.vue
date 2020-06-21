<template>
    <el-container>
        <el-main>
            <div id="main">
                <div id="course_nav">
                    <span>课程</span>
                    <el-button size="mini" class="c_b_in" type="primary">
                        <span v-if="!(this.$store.state.user.status == 'teacher')">添加课程</span>
                        <span v-else>编辑课程时间</span>
                    </el-button>
                    <span>{{thisDate.getFullYear()}}学年 {{thisTerm}} 第{{16}}周</span>
                </div>
                <div v-if="!(this.$store.state.user.status == 'teacher')" id="classes">
                    <div id="cl_inner">
                        <div class="c_i_main" v-for="(item,key) in liveCourse"
                        :key="key">
                            <div class="a">
                                <span>{{item.month}}.{{item.date}}&nbsp;&nbsp;{{item.week}}</span>
                            </div>
                            <div class="b"></div>
                            <div class="c" v-for="(inner,index) in item.course"
                            :key="index">
                                <div class="d">{{inner.startTime}}-{{inner.endTime}}</div>
                                <div class="e">{{inner.name}}</div>
                                <div>
                                    <router-link 
                                    tag="div"
                                    class="p iconfont icon-fasong"
                                    :to="'/course/'+inner.src"></router-link>
                                    <span>{{inner.statue}}</span>
                                    <span class="t iconfont icon-huixingzhen"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div @click="toLive" v-else id="live">开始直播</div>
            </div>
        </el-main>
        <el-aside width="252px">
            <div id="aside">
                <div id="cal_icon">
                    <em class="el-icon-date"></em>
                </div>
                <div id="calender">
                    <div class="calender">
                        <div class="top">
                            <div class="btn_wrap">
                                <ul>
                                    <li @click="handleShowNextMonth">
                                        <em class="buton el-icon-arrow-right"></em>
                                    </li>
                                    <li @click="handleShowToday">
                                        <div class="top_date">
                                        {{mon[month - 1]}} {{year}}
                                    </div>
                                    </li>
                                    <li @click="handleShowLastMonth">
                                        <em class="buton el-icon-arrow-left"></em>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="date_wrap">
                            <ul class="week">
                                <li>SU</li>
                                <li>MO</li>
                                <li>TU</li>
                                <li>WE</li>
                                <li>TH</li>
                                <li>FR</li>
                                <li>SA</li>
                            </ul>
                            <ul class="day">
                                <li v-for="(item,index) in days"
                                :key='index'
                                :class="{
                                        'lili':true,
                                        'now':nowLi==year.toString()+month.toString()+item.day,
                                        'not':item.month != month
                                    }"
                                @click="checkCourse(item,year,index,(nowLi==year.toString()+month.toString()+item.day))">
                                    {{item.day}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="a_c_s">
                    课程表
                </div>
                <div class="schedule" v-for="(item,index) in course"
                :key="index">
                    <em :class="{
                        'red':((index + 1)/ 2)===1,
                        'blue':((index + 1)/ 2)!=1
                    }"></em>
                    <span>{{item.name}}</span>
                    <span>{{item.startTime}}-{{item.endTime}}</span>
                </div>
                <div id="addClass"
                v-show="!isAdd"
                @click="add">+ 添加任务</div>
                <div v-show="isAdd" id="putAdd">
                    <el-input 
                        placeholder="请输入任务"
                        v-model="renwu"></el-input>
                    <div style="margin:15px 0;">
                        <el-time-select
                            placeholder="起始时间"
                            v-model="startTime"
                            :picker-options="{
                            start: '08:30',
                            step: '00:15',
                            end: '18:30'
                            }">
                        </el-time-select>
                    </div>
                    <el-time-select
                        placeholder="结束时间"
                        v-model="endTime"
                        :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30',
                        minTime: startTime
                        }">
                    </el-time-select>
                    <div style="margin:15px 0;">
                        <el-button @click="uploadNewClass" type="primary">确定</el-button>
                    </div>
                </div>
            </div>
        </el-aside>
    </el-container>
</template>

<script>
export default {
    name:'course',
    data () {
        return{
            id:'1',
            liveCourse:[
                {
                    month:6,
                    date:15,
                    week:'星期一',
                    course:[
                        {
                            name:'语文课',
                            startTime:'08:00',
                            endTime:'08:45',
                            year:2020,
                            month:6,
                            date:15,
                            src:"1",
                            statue:"迟到"
                        },
                        {
                            name:'数学课',
                            startTime:'09:00',
                            endTime:'09:45',
                            year:2020,
                            month:6,
                            date:15,
                            src:"1",
                            statue:"迟到"
                        }
                    ]
                },
                {
                    month:6,
                    date:16,
                    week:'星期二',
                    course:[
                        {
                            name:'语文课',
                            startTime:'08:00',
                            endTime:'08:45',
                            year:2020,
                            month:6,
                            date:15,
                            src:"",
                            statue:"迟到"
                        },
                        {
                            name:'数学课',
                            startTime:'09:00',
                            endTime:'09:45',
                            year:2020,
                            month:6,
                            date:15,
                            src:"",
                            statue:"迟到"
                        }
                    ]
                },
                {
                    month:6,
                    date:17,
                    week:'星期三',
                    course:[
                        {
                            name:'语文课',
                            startTime:'08:00',
                            endTime:'08:45',
                            year:2020,
                            month:6,
                            date:15,
                            src:"",
                            statue:"迟到"
                        },
                        {
                            name:'数学课',
                            startTime:'09:00',
                            endTime:'09:45',
                            year:2020,
                            month:6,
                            date:15,
                            src:"",
                            statue:"迟到"
                        }
                    ]
                },
                {
                    month:6,
                    date:18,
                    week:'星期四',
                    course:[
                        {
                            name:'语文课',
                            startTime:'08:00',
                            endTime:'08:45',
                            year:2020,
                            month:6,
                            date:15,
                            src:"",
                            statue:"迟到"
                        },
                        {
                            name:'数学课',
                            startTime:'09:00',
                            endTime:'09:45',
                            year:2020,
                            month:6,
                            date:15,
                            src:"",
                            statue:"迟到"
                        }
                    ]
                },
                {
                    month:6,
                    date:19,
                    week:'星期五',
                    course:[
                        {
                            name:'语文课',
                            startTime:'08:00',
                            endTime:'08:45',
                            year:2020,
                            month:6,
                            date:15,
                            src:"",
                            statue:"迟到"
                        },
                        {
                            name:'数学课',
                            startTime:'09:00',
                            endTime:'09:45',
                            year:2020,
                            month:6,
                            date:15,
                            src:"",
                            statue:"迟到"
                        }
                    ]
                },
                {
                    month:6,
                    date:20,
                    week:'星期六',
                    course:[
                        {
                            name:'语文课',
                            startTime:'08:00',
                            endTime:'08:45',
                            year:2020,
                            month:6,
                            date:15,
                            src:"",
                            statue:"迟到"
                        },
                        {
                            name:'数学课',
                            startTime:'09:00',
                            endTime:'09:45',
                            year:2020,
                            month:6,
                            date:15,
                            src:"",
                            statue:"迟到"
                        }
                    ]
                },
                {
                    month:6,
                    date:21,
                    week:'星期天',
                    course:[
                        {
                            name:'语文课',
                            startTime:'08:00',
                            endTime:'08:45',
                            year:2020,
                            month:6,
                            date:15,
                            src:"",
                            statue:"迟到"
                        },
                        {
                            name:'数学课',
                            startTime:'09:00',
                            endTime:'09:45',
                            year:2020,
                            month:6,
                            date:15,
                            src:"",
                            statue:"迟到"
                        }
                    ]
                }
            ],
            thisTerm: ((new Date()).getMonth()>=1&&(new Date()).getMonth()<6) ? '02' : '01',
            thisDate: new Date(),
            isAdd:false,
            startTime: '',
            renwu:'',
            endTime: '',
            course:[
                {
                    name:'语文课',
                    startTime:'08:00',
                    endTime:'08:45'
                },
                {
                    name:'数学课',
                    startTime:'09:00',
                    endTime:'09:45'
                },
                {
                    name:'英语课',
                    startTime:'10:00',
                    endTime:'10:45'
                }
            ],
            mon:[
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'June',
                'Jul',
                'Aug',
                'Sept',
                'Oct',
                'Nov',
                'Dec'
            ],
            year:'',
            month:'',
            day:'',
            days:[],
            nowLi:'',
            nowMo:''
        }
    },
    methods:{
        toLive(){
            this.$axios.post(
                '',{

                }
            ).then((res) => {
                this.id = res.id
                this.$router.push('/live/'+this.id)
            })
            this.$router.push('/course/'+this.id)
        },
        uploadNewClass(){
            if( this.renwu===''||
                this.startTime===''||
                this.endTime===''
            ){
                this.isAdd = false
            }else{
                let param = {
                    userId : this.$store.state.user.id,
                    year:this.year,
                    month:this.month,
                    date:this.day,
                    class:{
                        name:this.renwu,
                        startTime:this.startTime,
                        endTime:this.endTime
                    }
                }
                this.renwu = this.endTime = this.startTime = ''
                console.log(param)
                this.$axios.post(
                    '',param
                ).then((res) => {
                    if(res.course===''){
                        this.course = []
                    }else{
                        this.course = res.course
                    }
                })
                this.isAdd = false
            }
        },
        add(){
            this.isAdd = true
        },
        checkCourse(date,year,index,isNow){
            let thisDay = document.getElementsByClassName("lili")
            for(let key = 0; key < thisDay.length;key++ ){
                console.log(thisDay[key].style.backgroundColor = '')
            }
            if(!isNow){
                thisDay[index].style.backgroundColor = '#4DA0FF'
            }
            this.day = date.day
            let param = {
                    userId : this.$store.state.user.id,
                    year:this.year,
                    month:this.month,
                    date:this.day
            }
            this.$axios.post(
                '',param
            ).then((res) => {
                if(res.course===''){
                    this.course = []
                }else{
                    this.course = res.course
                }
            })
        },
        //控制当前日期显示特殊样式
        handleShowDateStyle(){
            let now = new Date()
            this.nowLi = now.getFullYear().toString()+(now.getMonth()+1).toString()+now.getDate().toString()
            this.nowMo = now.getFullYear().toString()+(now.getMonth()+1).toString()
            console.log(this.nowLi)
        },
        //得到当前年这个月分有多少天
        getDays(Y,M){
            let day = new Date(Y, M, 0).getDate()
            return day;
        },
        //得到当前年，这个月的一号是周几
        getWeek(Y,M){
            let now = new Date()
            now.setFullYear(this.year)
            now.setMonth(this.month-1)
            now.setDate(1);
            let week = now.getDay();
            return week;
        },
        pushDays(){
                //将这个月多少天加入数组days
                for(let i = 1; i<=this.getDays(this.year,this.month);i++){
                    this.days.push({
                        day:i,
                        month:this.month
                    })
                }
                for(let i=0;i<this.getWeek(this.year,this.month);i++){
                    var lastMonthDays=this.getDays(this.year,this.month-1)
                    this.days.unshift({
                        day:lastMonthDays-i,
                        month:this.month - 1
                    })
                }
                console.log(this.days)
                console.log(this.getWeek(this.year,this.month))
        },
        getDate(){
                let now = new Date();
                this.year = now.getFullYear();
                this.month = now.getMonth()+1;
                this.pushDays(); 
        },
        changeDate(){
            //
        },
        handleShowNextMonth(){
            this.days=[];
            if(this.month<12){
                this.month=this.month+1;
                this.pushDays();
            }else{
                this.month= this.month=1;
                this.year=this.year+1;
                this.pushDays();
            }
        },
        handleShowToday(){
            this.days=[];
            let now = new Date();
            this.year=now.getFullYear();
            this.month=now.getMonth()+1;
            this.pushDays();
        },
        handleShowLastMonth(){
            this.days=[];
            if(this.month>1){
                this.month=this.month-1;
            this.pushDays();
            }else if( this.year>1970){
                this.month=12;
                this.year=this.year-1;
                this.pushDays();
            }else{
                alert("不能查找更远的日期")
            }
        }
    },
    mounted(){
        let a = new Date()
        this.day = a.getDate()
        this.getDate();
        this.handleShowDateStyle();
        this.$axios.post(
            '',{
                id:this.$store.state.user.id,
            }
        ).then((res) => {
            this.liveCourse = res.liveCourse
        })
    }
}
</script>

<style scoped>
#live{
    color: #4DA0FF;
    background-color: #fff;
    font-size: 40px;
    text-align: center;
    width: 330px;
    height: 190px;
    cursor: pointer;
    position: relative;
    left: calc(50% - 330px/2);
    top: calc(40% - 190px/2);
    line-height: 180px;
    box-shadow: 0px 0px 4px 2px #4DA0FF;
    transition: box-shadow .2s;
}
#live:hover{
    box-shadow: 0px 0px 2px 1px #4DA0FF;
}
.c:nth-child(2n) .p{
    cursor: pointer;
    width: 24px;
    height: 24px;
    float: left;
    text-align: center;
    line-height: 24px;
    border-radius: 4px;
    border: solid 1px white;
    transition: background-color .1s;
}
.c:nth-child(2n) .p:hover{
    background-color: #0077ff;
}
.c:nth-child(2n+1) .p{
    color: #4DA0FF;
    cursor: pointer;
    width: 24px;
    height: 24px;
    float: left;
    text-align: center;
    line-height: 24px;
    border-radius: 4px;
    border: solid 1px #4DA0FF;
    transition: background-color .1s;
}
.c:nth-child(2n+1) .p:hover{
    background-color: #f0f7ff;
}
.t{
    position: relative;
    top: 2px;
}
.d{
    font-size: 11px;
}
.e{
    font-size: 14px;
    margin: 14px 0 30px 0;
}
.c{
    border-radius: 5px;
    border: solid .5px #bdc1c4;
    margin-top: 20px;
    width: 230px;
    height: 98px;
    padding: 16px;
}
.c span{
    font-size: 12px;
    float: right;
}
.c:nth-child(2n){
    color: white;
    background-color: #4DA0FF;
}
.c:nth-child(2n+1) .d{
    color: #979797;
}
.b{
    width: 150px;
    height: 5px;
    border-radius: 3px;
    background-color: #4DA0FF;
    margin-bottom: 10px;
}
.a{
    font-size: 14px;
    margin-bottom: 13px;
}
.c_i_main{
    padding: 20px;
    float: left;
    width: 263px;
    height: 414px;
    margin-right: 30px;
    background-color: #fff;
    border-radius: 5px;
}
#cl_inner{
    height: 455px;
    width: 2400px;
}
#classes{
    height: 630px;
    width: 969px;
    margin-left: 33px;
    margin-top: 50px;
    overflow-x: scroll;
}
.c_b_in{
    font-size: 14px;
    position: relative;
    top: -12px;
    margin-left: 66px;
}
#course_nav{
    width: 969px;
    margin: 27px 0 0 33px;
}
#course_nav > span:first-of-type{
    margin-right: 44px;
    font-size: 38px;
}
#course_nav > span:last-of-type{
    float: right;
    position: relative;
    top: 6px;
    padding: 3px;
}
#putAdd{
    margin-left: 23px;
    width: 220px;
}
#addClass{
    cursor: pointer;
    font-size: 11px;
    margin-left: 23px;
    text-align: center;
    color: #4DA0FF;
    border: solid 2px #4DA0FF;
    width: 80px;
    height: 28px;
    line-height: 27px;
    transition: background-color .1s;
    border-radius: 4px;
}
#addClass:hover{
    background-color: #EAF3FE;
}
.schedule{
    cursor: default;
    margin: 0 0 13px 25px;
}
.schedule span{
    font-size: 11px;
    margin-right: 40px;
}
.schedule em{
    margin-right: 8px;
    position: relative;
    top: -1px;
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 7px;
}
.blue{
    background-color: #4DA0FF;
}
.red{
    background-color: #FF6D4A;
}
#a_c_s{
    margin: 25px 0 28px 23px;
    font-size: 14px;
    color: #DCE0E4;
}
#cal_icon{
    border-radius: 4px;
    color: white;
    line-height: 50px;
    text-align: center;
    width: 55px;
    height: 55px;
    background-color: #FFD012;
    font-size: 26px;
    margin: 35px 0 70px 40px;
}
.buton{
    font-weight: 900;
    color: #4DA0FF;
}
.not{
    opacity: .3;
}
ul{
    padding: 0;
}
li{
    list-style:none;
}
.calender{
    font-size: 11px;
    width: 200px;
    position: relative;
    border-bottom: 1px solid #ddd;
    padding: 0px;
}
.top{
    padding: 0 10px;
    width: 100%;
    position: relative;
    display: flex;
}
.top_date{
    color: #979797;
    font-weight: 700;
    font-size: 14px;
    width: 150px;
    text-align: center;
}
.btn_wrap{
    text-align: center
}
.btn_wrap ul{
    display: flex;
    flex-direction: row-reverse
}
.btn_wrap ul li{
    text-align: center;
    line-height: 20px;
    cursor: pointer;
}
.btn_wrap ul li:hover{
    background: #ddd;
    color:red;
}
.btn_wrap ul li:first-child{
    border-left: none;
}
.btn_wrap ul li:last-child{
    border-right: none;
}
.date_wrap{
    position: relative;
}
.week{
    display: flex;
    flex-direction: row;
}
.week li{
    text-align: center;
    width: 14.28%;
}
.day{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.day li{
    transition: background-color .2s;
    border-radius: 4px;
    line-height: 24px;
    cursor: pointer;
    height: 24px;
    text-align: center;
    width: 14.28%;
    box-sizing: border-box;
}
.day li:hover{
    background-color: #4DA0FF;
}
.now{

  background: #EAF3FE;
  color:#1989fa;
}

#calender{
    position: relative;
    left: calc(50% - 200px/2);
    width: 200px;
    height: 258px;
}
#aside{
    float: left;
    width: 252px;
    height: 800px;
    background-color: #fff;
}

#main{
    width: 1000px;
    height: 740px;
}
</style>

