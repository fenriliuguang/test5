<template>
    <div>
        <div id="course_nav">
                <span>课程</span>
                <el-button size="mini" class="c_b_in" icon="el-icon-upload">上传文件</el-button>
        </div>
        <div id="player">
            <video id="myVideo" class="video-js">
                <source :src="rtmpView" type="video/mp4" />
            </video>
        </div>
        <div class="pt" v-if="this.$store.state.user.status == 'teacher'">
        <div class="p">
            你的RTMP地址：
            </div>
            <input id="rtmp" type="text" readonly v-model="rtmp">
            <el-button @click="copy('rtmp')" size="mini" type="primary">复制</el-button>
        </div>
        <div class="pt" v-if="this.$store.state.user.status == 'teacher'">
            <div class="p">
            你的直播码：
            </div>
            <input id="zhi" type="text" readonly v-model="zhi">
            <el-button @click="copy('zhi')" size="mini" type="primary">复制</el-button>
        </div>
        <div id="detial">
            <el-tabs :stretch="true" v-model="activeName">
                <el-tab-pane label="简介" name="first">
                    <div id="intro">
                        {{intro}}
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="'消息('+ num +')'" name="second">
                    <div id="chat">
                        <div id="chat_main">
                        
                        </div>
                        <div>
                            <el-input></el-input>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            rtmp:'rtmp',
            zhi:'asdsa',
            rtmpView:'',
            activeName: 'first',
            num:60,
            intro:'这是课程简介，这是课程简介这是课程简介，，'
        }
    },
    mounted(){
        let myPlayer = this.$video(myVideo, {
            controls: true,
            preload: "auto",
            width: "900px",
            height: "505px"
        })
    },
    methods: {
        copy(v){
            let obj = document.getElementById(v)
            obj.select()
            document.execCommand("Copy","false",null)
            obj.blur()
        }
    },
    
}
</script>

<style scope>
#chat_main{
    height: 250px;
}
#chat{
    overflow: hidden;
    height: 300px;
    padding: 20px;
}
#intro{
    padding: 20px;
}
#detial{
    background-color: #fff;
    width: 900px;
    position: relative;
    left: calc(50% - 900px/2);
}
#player{
    width: 900px;
    height: 505px;
    position: relative;
    left: calc(50% - 900px/2);
}
.pt input{
    width: 400px;
    margin: 0 30px;
}
.pt{
    width: 800px;
    height: 30px;
    margin: 20px 210px;
}
.p{
    text-align: right;
    float: left;
    width: 200px;
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
#course_nav>span:first-of-type{
    margin-right: 44px;
    font-size: 38px;
}

</style>