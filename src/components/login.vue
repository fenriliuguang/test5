<template>
  <el-container id="a">
    <el-main id="b">
      <el-tabs :stretch="true" id="tab" v-model="activeName">
      <el-tab-pane label="登录" name="first">
        <el-form id="form" label-width="auto" :model="form">
          <el-form-item required>
            <el-input class="item" v-model="form.name" placeholder="邮箱/手机号">
              <img style="width:32px;margin: 7px 0 0 10px;" slot="prefix" src="../assets/user.png">
            </el-input>
          </el-form-item>
          <el-form-item required>
            <el-input :show-password="true" class="item" v-model="form.passWord" placeholder="密码">
              <img style="width:32px;margin: 15px 0 0 10px;"  slot="prefix" src="../assets/password.png">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="item" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <div>
              <i @click="check1" id="check" class="el-icon-check"></i>
              <div id="for">
                <span class="for">十天内免密登录</span>
                |
                <span @click="forget" style="cursor: pointer;" class="for">忘记密码？</span>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="教师注册" name="second">
        <el-form id="form2" label-width="auto" :model="form2" status-icon :rules="rule" ref="form2">
         <el-form-item prop="mail">
            <el-input class="item" v-model="form2.mail" placeholder="请输入邮箱地址"></el-input>
         </el-form-item>
         <el-form-item prop="pass">
            <el-input class="item" v-model="form2.password" placeholder="请输入8-16位密码"></el-input>
         </el-form-item>
         <el-form-item prop="name">
            <el-input class="item" v-model="form2.name" placeholder="请输入昵称"></el-input>
         </el-form-item>
         <el-form-item prop="school">
            <el-input class="item" v-model="form2.school" placeholder="请输入完整学校名称"></el-input>
         </el-form-item>
         <el-form-item prop="phone">
            <el-input class="item" v-model="form2.phone" placeholder="请输入手机号"></el-input>
         </el-form-item>
         <el-form-item>
            <div id="cd">
              <el-input class="item" v-model="form2.key" placeholder="请输入验证码"></el-input>
            </div>
            <div id="ce">
              <el-button @click="verification(1)" type="primary">{{this.form2.time}}{{this.form2.message}}</el-button>
            </div>
         </el-form-item>
         <el-form-item>
            <div>
              <i @click="check3" id="check3" class="el-icon-check"></i>
              <div class="forS">
                <span class="for">勾选及表示同意用户协议</span>
              </div>
            </div>
            <el-button class="item" type="primary" @click="formB('form2')">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="学生注册" name="third">
        <el-form id="form1" label-width="auto" :model="form1" status-icon :rules="rule" ref="form1">
         <el-form-item prop="mail">
            <el-input class="item" v-model="form1.mail" placeholder="请输入邮箱地址"></el-input>
         </el-form-item>
         <el-form-item prop="pass">
            <el-input class="item" v-model="form1.password" placeholder="请输入8-16位密码"></el-input>
         </el-form-item>
         <el-form-item prop="name">
            <el-input class="item" v-model="form1.name" placeholder="请输入昵称"></el-input>
         </el-form-item>
         <el-form-item prop="school">
            <el-input class="item" v-model="form1.school" placeholder="请输入完整学校名称"></el-input>
         </el-form-item>
         <el-form-item prop="phone">
            <el-input class="item" v-model="form1.phone" placeholder="请输入手机号"></el-input>
         </el-form-item>
         <el-form-item>
            <div id="cd">
              <el-input class="item" v-model="form2.key" placeholder="请输入验证码"></el-input>
            </div>
            <div id="ce">
              <el-button @click="verification(0)" type="primary">{{this.form1.time}}{{this.form1.message}}</el-button>
            </div>
         </el-form-item>
         <el-form-item>
            <div>
              <i @click="check2" id="check2" class="el-icon-check"></i>
              <div class="forS">
                <span class="for">勾选及表示同意用户协议</span>
              </div>
            </div>
            <el-button class="item" type="primary" @click="formA('form1')">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    </el-main>
    <el-aside width="253px" style="background:white">
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name:"login",
  data () {
    var name = (rule,value,callback) => {
      if(value===''){
        callback(new Error('昵称不能为空'))
      }else callback()
    }
    var school = (rule,value,callback) => {
      if(!value){
        callback(new Error('学校不能为空'))
      }else callback()
    }
    var phone = (rule,value,callback) => {
      if(!value){
        callback(new Error('手机号不能为空'))
      }else
      if(value.length!=11){
        callback(new Error('请输入正确手机号'))
      }else callback()
    }
    var mail = (rule,value,callback) => {
      if(!value){
        callback(new Error('邮箱不能为空'))
      }else callback()
    }
    var pass = (rule,value,callback) => {
      console.log('pass')
      if(!value){
        callback(new Error('密码不能为空'))
      }else
      if(value.length<8||value.length>16){
        callback(new Error('密码必须为8-16位'))
      }else callback()
    }
    
    return {
      ACL: true,
      c2:true,
      activeName : "third",
      form: {
        name:'',
        passWord:''
        },
      form1:{
        message:'获取验证码',
        c:60,
        time:'',
        name:'',
        password:'',
        phone:'',
        school:'',
        mail:'',
        name:'',
        key:'',
        isKeyUp: false,
        isKeyDone:false
      },
      form2:{
        message:'获取验证码',
        c:60,
        time:'',
        name:'',
        password:'',
        phone:'',
        school:'',
        mail:'',
        name:'',
        key:'',
        isKeyUp: false,
        isKeyDone:false
      },
      rule:{
        pass:[
          { validator : pass,trigger:'blur'}
        ],
        school:[
          {validator:school,trigger:'blur'}
        ],
        mail:[
          {validator:mail,trigger:'blur'}
        ],
        phone:[
          {validator:phone,trigger:'blur'}
        ],
        name:[
          {validator:name,trigger:'blur'}
        ]
      }
    }
  },
  methods: {
    verification(value){
      if(value === 0){
        if(!this.form1.isKeyUp){
          if(this.form1.phone != ''){
            let num = Math.floor(Math.random()*10) + '' +
                      Math.floor(Math.random()*10) + 
                      Math.floor(Math.random()*10) +
                      Math.floor(Math.random()*10)
            // this.$axios
            //   .post(
            //     'https://open.ucpaas.com/ol/sms/sendsms',{
            //       sid:"56c4c9494fa34f145e8ee8bad60b095b",
            //       token:"5aab059cf5a5f75d2c701d383c2c7563",
            //       appid:"f28eaaefcb3f459f88fb0fadd6425174",
            //       templateid:"547064",
            //       param: num ,
            //       mobile:this.form1.phone
            //     }
            //   ).then((res)=>{
                
            //   })
            this.form1.isKeyDone = true
            /* 
                验证码功能替代区域：：
            */
            this.form1.message = ' 秒后重新获取'
            this.form1.isKeyUp = !this.form1.isKeyUp
            let a = setInterval(()=>{
              this.form1.time = this.form1.c
              this.form1.c--
              if(this.form1.time === 0){
                this.form1.time = ''
                this.form1.c = 60
                this.form1.message = '获取验证码'
                this.form1.isKeyUp = false
                window.clearInterval(a)
              }
            },1000)
          }else{
            this.$message.error('请填写正确的手机号')
          }
        }
      }else {
        if(!this.form2.isKeyUp){
          if(this.form2.phone != ''){
            let num = Math.floor(Math.random()*10) + '' +
                      Math.floor(Math.random()*10) + 
                      Math.floor(Math.random()*10) +
                      Math.floor(Math.random()*10)
            // this.$axios
            //   .post(
            //     'https://open.ucpaas.com/ol/sms/sendsms',{
            //       sid:"56c4c9494fa34f145e8ee8bad60b095b",
            //       token:"5aab059cf5a5f75d2c701d383c2c7563",
            //       appid:"f28eaaefcb3f459f88fb0fadd6425174",
            //       templateid:"547064",
            //       param: num ,
            //       mobile:this.for21.phone
            //     }
            //   ).then((res)=>{
                
            //   })
            this.form2.isKeyDone = true
            /* 
                验证码功能替代区域：：
            */
            this.form2.message = ' 秒后重新获取'
            this.form2.isKeyUp = !this.form1.isKeyUp
            let a = setInterval(()=>{
              this.form2.time = this.form1.c
              this.form2.c--
              if(this.form2.time === 0){
                this.form2.time = ''
                this.form2.c = 60
                this.form2.message = '获取验证码'
                this.form2.isKeyUp = false
                window.clearInterval(a)
              }
            },1000)
          }else{
            this.$message.error('请填写正确的手机号')
          }
        }
      }
    },
    formA(value){
      console.log(this.$refs[value])
      this.$refs[value].validate((valid) => {
        if(valid){
          if(this.form1.isKeyDone==true){
            console.log(valid)
            this.$axios
            .post()
            .then(()=>{

            })
          }else{
            alert('验证码错误')
          }
        }
      })
    },
    formB(value){
      console.log(this.$refs[value])
      this.$refs[value].validate((valid) => {
        if(valid){
          if(this.form2.isKeyDone==true){
            console.log(valid)
            this.$axios
            .post()
            .then(()=>{

            })
          }else{
            alert('验证码错误')
          }
        }
      })
    },
    submitForm(value){
      this.$axios
      .post()
      .then(()=>{

      })
    },
    check1(){
      let check = document.getElementById("check")
      this.ACL = ! this.ACL
      console.log(this.ACL)
      if(check.style.backgroundColor=="white")check.style.backgroundColor = "#70B3FF"
      else check.style.backgroundColor = "white"
    },
    forget(){

    },
    check2(){
      let check = document.getElementById("check2")
      this.c2 = ! this.c2
      console.log(this.ACL)
      if(check.style.backgroundColor=="white")check.style.backgroundColor = "#70B3FF"
      else check.style.backgroundColor = "white"
    },
    check3(){
      let check = document.getElementById("check2")
      this.c3 = ! this.c3
      console.log(this.ACL)
      if(check.style.backgroundColor=="white")check.style.backgroundColor = "#70B3FF"
      else check.style.backgroundColor = "white"
    },
    submitForm1(value){
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#check3{
  cursor: pointer;
  border: solid 1px #70B3FF;
  margin: 11px 1px;
  text-align: center;
  width: 10px;
  height: 10px;
  font-size: 8px;
  border-radius: 100%;
  color: white;
  float: left;
  background-color: #70B3FF;
}
#check2{
  cursor: pointer;
  border: solid 1px #70B3FF;
  margin: 11px 1px;
  text-align: center;
  width: 10px;
  height: 10px;
  font-size: 8px;
  border-radius: 100%;
  color: white;
  float: left;
  background-color: #70B3FF;
}
#form1{
  margin-top: 76px;
  width: 400px;
  position: relative;
  left: calc(50% - 400px/2);
}
#form2{
  margin-top: 76px;
  width: 400px;
  position: relative;
  left: calc(50% - 400px/2);
}
#ce{
  width: 147px;
  float: left;
}
#cg{
  width: 147px;
  float: left;
}
#cd{
  float: left;
  width: 210px;
  margin-right: 42px;
}
#cf{
  float: left;
  width: 210px;
  margin-right: 42px;
}
.for{
  font-size: 12px;
}
.forS{
  margin: 10px 20px;
  line-height: 12px;
  float: left;
  font-size: 12px;
}
#check{
  cursor: pointer;
  border: solid 1px #70B3FF;
  margin: 11px 1px;
  text-align: center;
  width: 10px;
  height: 10px;
  font-size: 8px;
  border-radius: 100%;
  color: white;
  float: left;
  background-color: #70B3FF;
}
#form1 .el-form-item{
  margin-bottom: 20px;
}
#form1 .el-input__inner{
  height: 48px;
}
#form2 .el-form-item{
  margin-bottom: 20px;
}
#form2 .el-input__inner{
  height: 48px;
}
#form .el-form-item{
  margin-bottom: 40px;
}
#form .el-input__inner{
  padding-left: 67px;
  height: 48px;
}
.item{
  width: 100%;
  height: 48px;
}
#form{
  position: relative;
  margin-top: 102px;
  left: calc(50% - 400px/2);
  width: 400px;
  height: 240px;
}
#tab{
  padding: 23px 56px;
  height: 100%;
  background-color: #fff;
}
.el-tabs__item{
  font-size: 20px;
}
#b{
  padding: 78px 82px 122px 82px;
}
#a{
  padding: 0;
  height: 100%;
}
</style>
