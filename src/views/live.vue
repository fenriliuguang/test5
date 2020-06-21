<template>
    <div>
        <div id="live_recommend">
            <div id="live_car">
                <el-carousel height="265px">
                    <el-carousel-item v-for="(item,key) in carousel" :key="key">
                        <img class="c_img" @click="toClass(item.id)" :src="'/live/'+item.id" :alt="item.name">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div id="live_r_contain">
                <div id="l_c_t">
                    热门排行
                </div>
                <div v-for="(item,key) in recommend" :key="key">
                    <div class="remen">
                        <div class="r-i">{{item.num}}</div>
                        <div class="r-c">
                            <router-link tag="div" :to="'/live/'+item.id">{{item.name}}</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="live_con">
            <div class="l_c">
                <div class="l_c_in">
                    <div class="class">优惠</div>
                    <div class="con_main" v-for="(item,key) in con1" :key="key">
                        <div @click="toClass(item.id)" class="con_item">
                            <div class="con_img">
                                <img :src="item.img" :alt="item.name">
                            </div>
                            <div class="con_name">{{item.name}}</div>
                            <div class="con_num">
                                <em style="font-size：9px" class="el-icon-user"></em>
                                {{item.num}}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <span class="more">了解更多</span>
                </div>
            </div>
            <div class="l_c">
                <div class="l_c_in">
                    <div class="class">热门</div>
                    <div class="con_main" v-for="(item,key) in con2" :key="key">
                        <div @click="toClass(item.id)" class="con_item">
                            <div class="con_img">
                                <img :src="item.img" :alt="item.name">
                            </div>
                            <div class="con_name">{{item.name}}</div>
                            <div class="con_num">
                                <em style="font-size：9px" class="el-icon-user"></em>
                                {{item.num}}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <span class="more">了解更多</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"live",
    data(){
        return{
            recommend:[
                {
                    num: 1,
                    name:"课程1",
                    id:"1"
                },
                {
                    num: 2,
                    name:"课程2",
                    id:"2"
                },
                {
                    num: 3,
                    name:"课程3",
                    id:"3"
                },
                {
                    num: 4,
                    name:"课程4",
                    id:"4"
                },
                {
                    num: 5,
                    name:"课程5",
                    id:"5"
                },
                {
                    num: 6,
                    name:"课程6",
                    id:"6"
                },
                {
                    num: 7,
                    name:"课程7",
                    id:"7"
                },
                {
                    num: 8,
                    name:"课程8",
                    id:"8"
                },
            ],
            con1:[
                {
                    id:1,
                    img:'',
                    name:'课程1',
                    num:1000,
                },
                {
                    id:2,
                    img:'',
                    name:'课程2',
                    num:1000,
                },
                {
                    id:3,
                    img:'',
                    name:'课程3',
                    num:1000,
                },
                {
                    id:4,
                    img:'',
                    name:'课程4',
                    num:1000,
                },
                {
                    id:5,
                    img:'',
                    name:'课程5',
                    num:1000,
                }
            ],
            con2:[
                {
                    id:1,
                    img:'',
                    name:'课程1',
                    num:1000,
                },
                {
                    id:2,
                    img:'',
                    name:'课程2',
                    num:1000,
                },
                {
                    id:3,
                    img:'',
                    name:'课程3',
                    num:1000,
                },
                {
                    id:4,
                    img:'',
                    name:'课程4',
                    num:1000,
                },
                {
                    id:5,
                    img:'',
                    name:'课程5',
                    num:1000,
                }
            ],
            carousel:[
                {
                    id:1,
                    name:'课程1',
                },
                {
                    id:2,
                    name:'课程2',
                },
                {
                    id:3,
                    name:'课程3',
                },
                {
                    id:4,
                    name:'课程4',
                },
                {
                    id:5,
                    name:'课程5',
                }
            ]
        }
    },
    mounted(){
        this.$axios
        .post()
        .then((res)=>{
            this.recommend = res.recommend
            this.con1 = res.con1
            this.con2 = res.con2
            this.carousel = res.carousel
        })
    },
    methods:{
        toClass(id){
            this.$router.push('/live/'+id)
        }
    }
}
</script>

<style>
.c_img{
    cursor: pointer;
    width: 569px;
    height: 265px;
}
.l_c{
    margin-bottom: 44px;
    height: 151px;
}
.more{
    float: right;
    font-size: 10px;
    margin-top: 10px;
    cursor: pointer;
}
.con_num{
    margin: 10px 9px 0 0;
    height: 9px;
    float: right;
    font-size: 7px;
    color: #ADADAD;
}
.con_name{
    font-size: 9px;
    margin-left: 6px;
    margin-top: 3px;
}
.con_img img{
    width: 170px;
    height: 90px;
}
.con_img{
    background-color: #4DA0FF;
    font-size: 0;
    height: 90px;
}
.con_item{
    cursor: pointer;
    box-shadow: 0 3px 10px 1px rgb(138, 138, 138);
    float: left;
    width: 170px;
    height: 130px;
    margin-left: 40px;
    transition: box-shadow 0.5s;
    -moz-transition: box-shadow 0.5s;
    -webkit-transition: box-shadow 0.5s;
    -o-transition: box-shadow 0.5s;
}
.con_item:hover{
    box-shadow: 0 1px 4px 1px rgb(138, 138, 138);
}
#live_con{
    position: relative;
    width: 1140px;
    height: 347px;
    left: calc(50% - 1140px/2);
}
.con_main{
    float: left;
}
.class{
    border-radius: 2px;
    box-shadow: 1px 1px 2px #4DA0FF;
    line-height: 43px;
    text-align: center;
    padding: 20px 20px;
    margin-right: 10px;
    float: left;
    background-color: #4DA0FF;
    color: white;
    font-size: 31px;
    width: 40px;
    height: 90px;
}
.r-c{
    font-size: 13px;
    cursor: pointer;
    width: 100px;
    float: left;
}
.r-i{
    margin-right: 20px;
    line-height: 15px;
    text-align: center;
    color: white;
    font-size: 9px;
    background-color: #4DA0FF;
    width: 15px;
    height: 15px;
    float: left;
}
.remen{
    position: relative;
    left: calc(50% - 140px/2);
    margin-bottom: 7px;
    width: 140px;
    height: 15px;
}
#l_c_t{
    width: 62px;
    height: 19px;
    font-size: 14px;
    color: #808EA3;
    position: relative;
    left: calc(50% - 62px/2);
    margin: 13px 0 6px 0;
}
#live_r_contain{
    width: 230px;
    height: 262px;
    border: solid 2px #82BCFF;
    float: left;
}
#live_car{
    width: 569px;
    float: left;
    margin-right: 20px;
}
#live_recommend{
    width: 832px;
    height: 265px;
    position: relative;
    left: calc(50% - 832px/2);
    margin: 36px 0 80px 0;
}

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>