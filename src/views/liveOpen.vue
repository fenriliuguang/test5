<template>
    <div>
        <div id="video_S">
            <div id="video_C">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/live' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{video.name}}</el-breadcrumb-item>
                </el-breadcrumb>
                <div id="title">{{video.video[playing].name}}</div>
                <div id="play_c">
                    <div id="playLeft">
                        <div id="playBlock">
                            <video ref="video" id="player" 
                            :muted="!isSound"
                            @canplay="get"
                            @timeupdate="timeUpdate">
                                <source :src="video.video[playing].src">
                            </video>
                            <div id="controlBar">
                                <div @click="playLocation" id="bar">
                                    <div id="bar_inner"></div>
                                </div>
                                <em @click="togglePlay" :class="p"></em>
                                <span id="time">{{currentTime}}/{{totalTime}}</span>
                                <em @click="toggleSound" :class="{'i iconfont icon-jingyin':!isSound,'i iconfont icon-shengyin':isSound}"></em>
                                <div style="float:left;height:20px">
                                    <div
                                    v-for="item in 10"
                                    :key="item"
                                    @click="setVolume(item)"
                                    :class="{
                                        'SoundBar':item > volume,'SoundBarD':!(item > volume)
                                    }"></div>
                                </div>
                                <el-dropdown trigger="click" id="drop" @command="click" placement="top" size="mini">
                                    <span id="speed">播放速度： {{speed}}</span>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="a">0.5</el-dropdown-item>
                                        <el-dropdown-item command="b">1.0</el-dropdown-item>
                                        <el-dropdown-item command="c">1.5</el-dropdown-item>
                                        <el-dropdown-item command="d">2.0</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                        <div>
                            <div id="do">
                                <img class="p_img" src="../assets/shoucang.png" alt="shoucang">
                                <span @click="pt(0)" class="p_font">收藏</span>
                                <img class="p_img" src="../assets/xiazai.png" alt="xiazai">
                                <span @click="pt(1)" class="p_font">下载</span>
                                <img class="p_img" src="../assets/fenxiang.png" alt="fenxiang">
                                <span @click="pt(2)" class="p_font">分享</span>
                                <img class="p_img" src="../assets/shoujilan.png" alt="shoujikan">
                                <span @click="pt(3)" class="p_font">手机看</span>
                            </div>
                        </div>
                    </div>
                    <div id="playRight">
                        <div id="p_nav">
                            <span id="xuanji">选集（{{video.totalPlay + 1}}）</span>
                            <span @click="auto" id="zidongbofang">
                                自动播放
                                <em :class="{'el-icon-circle-check':isAuto,'el-icon-circle-close':!isAuto}"></em>
                            </span>
                        </div>
                        <div id="video_ss">
                            <div 
                            :class="{'v_s':true,'white':playing == key}" 
                            style="font-size:0;" 
                            v-for="(item,key) in video.video" 
                            :key="key"
                            @click="playThis(key)">
                                <div class="v_s_i">
                                    <img class="img_inner" :src="item.poster" alt="">
                                </div>
                                <div class="v_s_in">
                                    <div class="v_s_n">{{item.name}}</div>
                                    <div class="v_s_cou">{{item.counts}}播放</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="other">
            <div id="o_left">
                <div id="ad">
                    <a id="adad" :href="ad">
                        <img :src="adImg">
                    </a>
                </div>
                <div id="commend">
                    <div id="myCommend">
                        <div style="height:48px">
                            <el-avatar :size="48" :src="this.$store.state.user.avatar"></el-avatar>
                        </div>
                        <div id="input">
                            <el-input 
                            placeholder="发表评论..."
                            @keyup.enter.native="up"
                            v-model="commend"></el-input>
                        </div>
                    </div>
                    <div id="ttt">全部评论 <span>({{commends.length}})</span></div>
                    <div class="c_main"
                    v-for="(item, index) in commends"
                    :key="index">
                        <div class="m_a">
                            <el-avatar
                            :size="48"
                            :src="item.src"></el-avatar>
                        </div>
                        <div class="m_c">
                            <div class="m_c_n">{{item.name}}</div>
                            <div class="m_c_t">{{item.time}}</div>
                            <div class="m_c_c">{{item.commend}}</div>
                            <div class="m_c_button">
                                <div>
                                    <em class="el-icon-chat-dot-square"></em>
                                    <span>评论</span>
                                    <em 
                                    :class="{
                                        'iconfont icon-xihuan1':!item.isLike,
                                        'icon-xihuan iconfont':item.isLike
                                        }"
                                    @click="like(index)"></em>
                                    <span>{{item.counts}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="mandm">
                        <span @click="loadCommends">加载更多</span>
                    </div>
                </div>
            </div>
            <div id="o_right">
                <div id="o_r_img">
                    <img :src="video.poster">
                </div>
                <div id="o_r_n">{{video.name}}</div>
                <div class="intro"> 学校 ：{{video.intro.school}}</div>
                <div class="intro"> 讲师 ：{{video.intro.teacher}}</div>
                <div class="intro"> 集数 ：{{video.totalPlay}}</div>
                <div class="intro"> 语言 ：{{video.intro.language}}</div>
                <div id="o_r_i">课程简介：</div>
                <div id="intro">{{video.intro.intro}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'live_open',
    data(){
        return{
            page:0,
            commend:'',
            ad:'https://www.bilibili.com/',
            adImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591767808535&di=6a50bd3e67e0eb04a0c7510187e58bad&imgtype=0&src=http%3A%2F%2Fpic2.52pk.com%2Ffiles%2F170502%2F7229800_142057_1_lit.jpg',
            speed:1,
            volume:5,
            isSound:true,
            playing:0,
            isAuto:true,
            p:'i iconfont icon-bofang',
            myVideo:null,
            isPaused:true,
            currentTime:'00:00',
            totalTime:'00:00',
            video:{
                id:this.$route.params.videoId,
                name:"视频的总标题",
                totalPlay:3,
                intro:{
                    school:'某学校',
                    teacher:'张三',
                    language:'中文',
                    intro:'本课程本课程本课程本课程本课程本课程本课程本课程本课程本课程本课程'
                },
                poster:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591717451070&di=4e036320691f841f4ce0f1c4557c1903&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F13%2F20180613145443_eETcL.thumb.700_0.jpeg",
                video:[
                    {
                        name:"视频的标题1",
                        src:"https://video.pearvideo.com/mp4/adshort/20200607/cont-1678863-15188852_adpkg-ad_hd.mp4",//视频链接
                        id:"",//视频的id
                        counts:0,
                        poster:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591717451070&di=4e036320691f841f4ce0f1c4557c1903&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F13%2F20180613145443_eETcL.thumb.700_0.jpeg"//封面
                    },
                    {
                        name:"视频的标题2",
                        src:"https://wsmedia.iyingdi.cn/video/2020/06/08/1dec30a5-f103-4bf0-acf8-cc40ad5f3c85.mp4",//视频链接
                        id:"",//视频的id
                        counts:0,
                        poster:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591717501057&di=2893b071c79c34d72778e3a3d3ab38ab&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F551f3bb4d3b80e597067330e4736fc88c6abbe54.png"//封面
                    },
                    {
                        name:"视频的标题3",
                        src:"https://video.pearvideo.com/mp4/adshort/20200607/cont-1678863-15188852_adpkg-ad_hd.mp4",//视频链接
                        id:"",//视频的id
                        counts:0,
                        poster:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591717451070&di=4e036320691f841f4ce0f1c4557c1903&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F13%2F20180613145443_eETcL.thumb.700_0.jpeg"//封面
                    },
                    {
                        name:"视频的标题4",
                        src:"https://wsmedia.iyingdi.cn/video/2020/06/08/1dec30a5-f103-4bf0-acf8-cc40ad5f3c85.mp4",//视频链接
                        id:"",//视频的id
                        counts:0,
                        poster:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591717501057&di=2893b071c79c34d72778e3a3d3ab38ab&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F551f3bb4d3b80e597067330e4736fc88c6abbe54.png"//封面
                    },
                ]
            },
            commends:[
                {
                    name: '昵称',
                    src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591717451070&di=4e036320691f841f4ce0f1c4557c1903&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F13%2F20180613145443_eETcL.thumb.700_0.jpeg',
                    commend:'1',
                    time:'5/20',
                    counts:133,
                    id:1,
                    isLike:false
                },
                {
                    name: '昵称',
                    src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591717451070&di=4e036320691f841f4ce0f1c4557c1903&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F13%2F20180613145443_eETcL.thumb.700_0.jpeg',
                    commend:'2',
                    time:'5/20',
                    counts:133,
                    id:2,
                    isLike:false
                },
                {
                    name: '昵称',
                    src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591717451070&di=4e036320691f841f4ce0f1c4557c1903&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F13%2F20180613145443_eETcL.thumb.700_0.jpeg',
                    commend:'3',
                    time:'5/20',
                    counts:133,
                    id:3,
                    isLike:false
                },
                {
                    name: '昵称',
                    src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591717451070&di=4e036320691f841f4ce0f1c4557c1903&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F13%2F20180613145443_eETcL.thumb.700_0.jpeg',
                    commend:'4',
                    time:'5/20',
                    counts:133,
                    id:4,
                    isLike:false
                }
            ]
        }
    },
    mounted(){
        this.myVideo = this.$refs.video
        this.loadCommends()                         //获取前几个评论
        this.$axios.post(                           //获取视频所有信息
            '',{
                videoId:this.video.id
            }
        ).then((res) => {
            this.video.name = res.name
            this.video.totalPlay = res.video.length
            this.video.intro = res.intro
            this.video.video = res.video
            this.poster = res.poster
        })
        this.$axios.get(                            //获取广告
            ''
        ).then((res) => {
            this.ad = res.ad
            this.adImg = res.adImg
        })
    },
    watch:{
        currentTime:function(val){
            if(val == this.totalTime && val !='00:00' && !this.isPaused){
                this.isPaused = true
                this.p = 'i iconfont icon-bofang'
            }
            if(val == this.totalTime && val !='00:00' && this.playing < this.video.totalPlay && this.isAuto){
                this.playing ++
            }
        },
        playing:function(val){
            this.$refs.video.load()
                this.$refs.video.play()
                this.$refs.video.playbackRate = this.speed
                this.isPaused = false
                this.p = 'i iconfont icon-bofangzanting'
        }
    },
    methods: {
        loadCommends(){
            this.$axios.post(
                '',{
                    page:this.page,
                    videoId:this.video.id
                }
            ).then((res) => {
                if(res.code === 1){
                    for(item in res.commends){
                        commends.push(item)
                    }
                    this.page ++
                }
            })
        },
        like(val){
            this.commends[val].isLike = ! this.commends[val].isLike
            this.$axios.post(
                '',{
                    userId:this.$store.state.user.id,
                    commendId:this.commends[val].id,
                    isLike:this.commends[val].isLike
                }
            ).then((res) => {

            })
        },
        up(){
            if(this.commend !=''){
                this.$axios.post(
                    '',{
                        ueserId:this.$store.state.user.id,
                        commend:this.commend
                    }
                )
                this.commend = ''
            }
        },
        click(c){
            switch(c){
                case 'a':
                    this.speed = this.myVideo.playbackRate = 0.5
                    break;
                case 'b':
                    this.speed = this.myVideo.playbackRate = 1
                    break;
                case 'c':
                    this.speed = this.myVideo.playbackRate = 1.5
                    break;
                case 'd':
                    this.speed = this.myVideo.playbackRate = 2
                    break;
            }
        },
        setVolume(val){
            this.volume = val
            if(val < 5){
                this.myVideo.volume = this.volume / 20.0
            }else{
                this.myVideo.volume = this.volume / 10.0
            }
        },
        toggleSound(){
            this.isSound = !this.isSound
        },
        playThis(val){
            this.playing = val
        },
        auto(){
            this.isAuto = !this.isAuto 
        },
        togglePlay(){
            if(this.isPaused){
                this.isPaused = false
                this.p = 'i iconfont icon-bofangzanting'
                this.myVideo.play()
            }else{
                this.isPaused = true
                this.p = 'i iconfont icon-bofang'
                this.myVideo.pause()
            }
        },
        timeFormat(time){
            let minute = Math.floor(time / 60)
            let second = Math.floor(time % 60)
            minute = minute < 10 ? '0' + minute : minute
            second = second < 10 ? '0' + second : second
            return `${minute}:${second}`
        },
        get(){
            this.totalTime = this.timeFormat(this.myVideo.duration)
        },
        timeUpdate(){
            this.currentTime = this.timeFormat(this.myVideo.currentTime)
            document.getElementById('bar_inner')
            .style.width = this.myVideo.currentTime / this.myVideo.duration *
                                        100 + '%'
        },
        getOffsetLeft(obj){
            var tmp = obj.offsetLeft;
            var val = obj.offsetParent;
            while(val != null){
                tmp += val.offsetLeft;
                val = val.offsetParent;
            }
            return tmp;
        },
        playLocation(){
            var mouseX = event.clientX+document.body.scrollLeft
            var objLeft = this.getOffsetLeft(document.getElementById("bar"))
            var objX = mouseX-objLeft
            this.myVideo.currentTime = objX / 713 * this.myVideo.duration
        },
        pt(v){
            switch(v) {
                case 0:
                    this.$axios
                    .post(
                        '',{
                            ueserId:this.$store.state.user.id,
                            videoId:this.video.id
                        }
                    )
                    .then((res) => {

                    })
                    break;
                case 1:
                    window.location.href = this.video.video[this.playing].src //服务器上静态文件位置
                    break;
                case 2:
                    console.log('无功能')
                    break;
                case 3:
                    console.log('无功能')
                    break;      
            } 
        }
    }
}
</script>

<style scope>
#mandm span{
    cursor: pointer;
    transition: color .2s, text-decoration 0.2s;
    font-size: 12px;
    color: #B9B9B9;
}
#mandm span:hover{
    color: #4DA0FF;
    text-decoration: underline;
}
#mandm{
    height: 30px;
    text-align: center;
}
.m_c_button{
    width: 508px;
    height: 18px;
    margin-bottom: 9px;
}
.m_c_button em{
    transition: color .2s;
    cursor: pointer;
    margin-left: 12px;
    color: #B9B9B9;
    font-size: 16px;
}
.m_c_button div{
    float: right;
}
.m_c_button span{
    color: #B9B9B9;
    font-size: 14px;
    margin: 0 22px 0 10px;
    position: relative;
    top: -1px;
}
.m_c_button em:hover{
    color: #4DA0FF;
}
.m_c_c{
    width: 508px;
    margin-top: 15px;
    margin-bottom: 30px;
    overflow: hidden;
}
.m_c_t{
    font-size: 12px;
    color: #B9B9B9;
    margin-left: 2px;
}
.m_c_n{
    font-size: 16px;
    margin-bottom: 7px;
}
.m_c{
    float: left;
    width: 508px;
    margin-left: 20px;
    overflow: hidden;
}
.m_a{
    float: left;
    width: 48px;
    height: 100px;
}
.c_main{
    width: 600px;
    overflow: hidden;
    margin-left: 63px;
    margin-top: 20px;
    border-bottom: 1px solid #B9B9B9;
}
#ttt span{
    font-size: 14px;
    color: #B9B9B9;
}
#ttt{
    font-size: 24px;
    margin-top: 22px;
    margin-left: 63px;
}
#input{
    margin: 4px 0 4px 19px;
    width: 530px;
    height: 40px;
}
#myCommend div{
    float: left;
}
#myCommend{
    margin: 19px 0 0 63px;
    width: 597px;
    height: 48px;
}
#commend{
    background-color: #fff;
    width: 713px;
    overflow: hidden;
}
#ad{
    width: 713px;
    height: 145px;
    margin: 10px 0 45px 0;
    background-color: #fff;
    display:-moz-box;
    -moz-box-pack:center;
    -moz-box-align:center;

    /* Safari、Opera 以及 Chrome */
    display:-webkit-box;
    -webkit-box-pack:center;
    -webkit-box-align:center;

    /* W3C */
    display:box;
    box-pack:center;
    box-align:center;
}
#ad img{
    height: 145px;
}
#intro{
    width: 210px;
    height: 83px;
    margin-left: 14px;
    font-size: 16px;
    color: #B9B9B9;
    overflow: hidden;
}
#o_r_i{
    margin: 10px 14px;
    font-size: 16px;
    color: #B9B9B9;
}
.intro{
    line-height: 30px;
    margin-left: 14px;
    margin-top: 20px;
    font-size: 16px;
    border-bottom: solid 1px #B9B9B9;
    color: #B9B9B9;
}
#o_r_n{
    margin-top: 16px;
    margin-left: 29px;
    font-size: 16px;
    color: #B9B9B9;
    margin-bottom: 19px;
}
#o_r_img img{
    width: 200px;
    height: 130px;
}
#o_r_img{
    margin: 16px 0 0 26px;
    width: 200px;
    height: 130px;
    border: solid 1px black;
    border-radius: 1px;
}
#o_left{
    width: 713px;
    height: 700px;
    float: left;
}
#o_right{
    float: right;
    background-color: #fff;
    width: 247px;
    height: 532px;
}
#other{
    width: 990px;
    margin-left: 157px;
    margin-top: 39px;
    height: 700px;
}
#speed{
    color: white;
    cursor: pointer;
    opacity: .6;
    transition: opacity .2s;
}
#speed:hover{
    opacity: 1;
}
#drop{
    margin-left: 200px;
}
.SoundBarD{
    cursor: pointer;
    border-radius: 1px;
    transition: height .2s,position .2s;
    float: left;
    width: 5px;
    height: 10px;
    position: relative;
    top: calc(50% - 10px/2);
    margin: 0px 2px;
    background-color: #4DA0FF;
}
.SoundBarD:hover{
    height: 14px;
    position: relative;
    top: calc(50% - 14px/2);
}
.SoundBar{
    cursor: pointer;
    border-radius: 1px;
    transition: height .2s,position .2s;
    float: left;
    opacity: .6;
    width: 5px;
    height: 10px;
    position: relative;
    top: calc(50% - 10px/2);
    margin: 0px 2px;
    background-color: #fff;
}
.SoundBar:hover{
    height: 14px;
    position: relative;
    top: calc(50% - 14px/2);
}
.white{
    background-color: rgb(129, 129, 129);
}
.v_s{
    transition: background-color .2s;
    cursor: pointer;
    width: 100%;
    height: 55px;
    padding:10px 0;
}
.v_s:hover{
    background-color: rgb(116, 116, 116);
}
.v_s_in{
    float: left;
    width: 133px;
    height: 55px;
}
.v_s_n{
    font-size: 12px;
    color: white;
    opacity: .6;
}
.v_s_cou{
    margin-top: 26px;
    font-size: 10px;
    color: white;
    opacity: .6;
}
.img_inner{
    width: 93px;
    height: 55px;
}
.v_s_i{
    margin-right: 8px;
    float: left;
    width: 93px;
    height: 55px;
}
#video_ss{
    width: 235px;
    height: 380px;
    margin-left: 30px;
}
#zidongbofang{
    transition: opacity .2s;
    line-height: 24px;
    float: right;
    font-size: 12px;
    color: white;
    opacity: .6;
    cursor: pointer;
}
#zidongbofang:hover{
    opacity: 1;
}
#xuanji{
    float: left;
    font-size: 16px;
    color: white;
}
#p_nav{
    width: 212px;
    height: 21px;
    margin: 15px 28px 6px 37px;
}
#playRight{
    float: right;
    width: 277px;
    height: 435px;
}
.p_font{
    transition: opacity 0.2s,text-decoration 0.2s;
    cursor: pointer;
    opacity: .7;
    position: relative;
    top: -3px;
    height: 13px;
    margin-right: 20px;
    font-size: 10px;
    color: white;
}
.p_font:hover{
    text-decoration:underline;
    opacity: 1;
}
.p_img{
    margin-right: 7px;
}
#do{
    font-size: 0;
    height: 13px;
    margin-top: 9px;
    margin-left: 20px;
}
#play_c{
    width: 990px;
    height: 435px;
    background-color: #333333;
    border: solid 1px #333333;
}
#playLeft{
    width: 713px;
    height: 435px;
    float: left;
}
#title{
    margin: 12px 0;
    font-size: 20px;
    color: white;
}
#playBlock{
    width: 713px;
    height: 400px;
    overflow: hidden;
    background-color: black;
}
#bar_inner{
    width: 0;
    height: 3px;
    background-color: #4DA0FF;
}
#bar{
    cursor: pointer;
    background-color: rgb(160, 160, 160);
    width: 713px;
    height: 3px;
}
#time{
    float: left;
    margin-left: 20px;
    color: white;
}
.i{
    margin-top: 2px;
    float: left;
    margin-left: 10px;
    cursor: pointer;
    color: white;
}

.i:hover{
    opacity: .6;
}
#controlBar{
    transition: opacity 0.2s;
    opacity: 0;
    background-color: black;
    height: 33px;
    position: relative;
    top: -33px;
    color: white;
}
#controlBar:hover{
    opacity: .8;
}
#video_C{
    padding-top: 14px;
    margin: 0 188px 0 157px;
    width: 990px;
    height: 505px;
}

#player{
    width: 713px;
    height: 400px;
}
#video_S{
    background-color: black;
    width: 100%;
    height: 530px;
}
</style>