<template>
  <div id="app">
    <el-container id="app-body">
      <el-header id="header" height='100px'>
        <img id="logo" src="./assets/logo.png" alt="logo">
        <img id="search" src="./assets/search.png" alt="search">
        <input placeholder="查找课程" id="s-i" type="text">
      </el-header>
      <el-container id="contain">
        <el-aside id="side" width='105px'>
          <div id="nav-box">
            <div id="nav">
              <div>
                <div class="line"></div>
                <router-link style="float:left" to="/live">
                  <img @mouseover="over(0)" @mouseleave="out(0)" @click="down(0)"  class="nav" src="./assets/live.png" alt="live" >
                </router-link>
              </div>
              <div>
                <div class="line"></div>
                <router-link to="/course">
                  <img @mouseover="over(1)" @mouseleave="out(1)" @click="down(1)" class="nav" src="./assets/course.png" alt="live" >
                </router-link>
              </div>
              <div>
                <div class="line"></div>
                <router-link to="/user">
                  <img @mouseover="over(2)" @mouseleave="out(2)" @click="down(2)" class="nav-t" src="./assets/userL.png" alt="live" >
                </router-link>
              </div>
              <div>
                <div class="line"></div>
                <router-link to="/homework">
                  <img @mouseover="over(3)" @mouseleave="out(3)" @click="down(3)" class="nav-s" src="./assets/homework.png" alt="live" >
                </router-link>
              </div>
              <div>
                <div class="line"></div>
                <router-link to="/community">
                  <img @mouseover="over(4)" @mouseleave="out(4)" @click="down(4)" class="nav-l" src="./assets/community.png" alt="live" >
                </router-link>
              </div>
            </div>
          </div>
        </el-aside>
        <el-main id="main">
          <login v-if="!this.$store.state.isLogin" />
          <router-view v-if="this.$store.state.isLogin"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import login from '@/components/login'

export default {
  data () {
    return {
      nav : 10,
    }
  },
  components:{
    login
  },
  methods:{
    over (index) {
      let line = document.getElementsByClassName("line")
      line[index].style.opacity = "100%"
    },
    out (index) {
      let line = document.getElementsByClassName("line")[index]
      if(this.nav!=index)line.style.opacity = "0"
    },
    down (index) {
      let line = document.getElementsByClassName("line")
      this.nav = index
      for(let i = 0; i<5 ; i++){
        if(i==index)line[i].style.opacity="100%"
        else line[i].style.opacity="0"
      }
    }
  }
}
</script>

<style>
#main::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
#main{
  padding: 0;
}
#s-i{
  padding: 0 0 0 10px;
  font-size: 16px;
  border: none;
  margin: 30px 0;
  height: 30px;
  float: left;
  width: 400px;
}
#search{
  opacity: 50%;
  cursor: pointer;
  float: left;
  margin: 15px 0 15px 40px;
}
#search:hover{
  opacity: 100%;
}
#logo{
  float: left;
  width: 29px;
  margin: 29px 22px;
}
.line{
  opacity: 0;
  border-radius: 0 4px 4px 0;
  box-shadow: 3px 0 4px 1px rgb(149, 192, 241) ;
  margin: 16px 37px 16px 0;
  float: left;
  width: 5px;
  height: 44px;
  background-color: #4191EC;
}
#nav-box{
  font-size: 0;
  position: relative;
  width: 105px;
}
.nav-t{
  float: left;
  width: 20px;
  margin: 27px 1px 27px 1px;
}
.nav-s{
  float: left;
  width: 16px;
  margin: 27px 3px 27px 3px;
}
.nav{
  float: left;
  margin: 27px 0;
  width: 22px;
}
.nav-l{
  float: left;
  margin: 27px 0;
  width: 22px;
}
#nav{
  width: 64px;
  margin-top: 84px;
}
#side{
  background-color: #fff;
}
#contain{
  padding-top: 2px;
  background-color: #F3F7F9;
}
#app-body{
  border: solid 1px #F3F7F9;
  width: 1440px;
  height: 900px;
}
</style>
