<template>
  <div>
    <div v-if="isloading" style="height:200px;display: flex;align-items: center;justify-content: center;">
      <mu-circular-progress class="demo-circular-progress" :size="36"></mu-circular-progress>
    </div>
    <div v-else>
      <mu-list textline="two-line">
        <mu-sub-header inset>通讯录</mu-sub-header>
        <mu-list-item avatar button v-for="(people,index) in address" @click="getCurrentUser(people)" :key="index" :ripple="true">
          <mu-list-item-action>
            <mu-avatar>
              <mu-icon value="person"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{Object.keys(people)[0]}}</mu-list-item-title>
            <mu-list-item-sub-title>{{Object.values(people)[0]}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="info"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
      <mu-sub-header inset>共<span>{{address.length}}条记录</span></mu-sub-header>
      <div style="text-align:center;margin-top:80px;margin-bottom:20px;">
        <mu-button @click="toHomePage" color="primary">
          <span style="margin-right:10px;">进入首页</span>
          <mu-icon left value="send"></mu-icon>
        </mu-button>
      </div>
      <mu-dialog :title="Object.keys(currentUse)[0]" width="360" :open.sync="openSimple">
        <div style="display:flex;">
          <mu-icon value="stay_current_portrait"></mu-icon><span style="margin-left:10px;">{{Object.values(currentUse)[0]}}</span>
        </div>
        <mu-button slot="actions" flat color="primary" @click="openSimple = false">OK</mu-button>
      </mu-dialog>
    </div>
  
  </div>
</template>

<script>
export default {
  name: "Address",
  data() {
    return {
      address:[],
      // [{"marco":"13218038888"}]
      openSimple:false,
      currentUse:{},
      isloading:true,
    };
  },
  created(){
    this.getUserAddress()
  },
  mounted(){
    
  },
  methods:{
    getCurrentUser(people){
      this.currentUse = people;
      this.openSimple = true;
    },
    toHomePage(){
      this.requestHybird({
        action:'forwardHome',
        param:{}
      })
    },
    getUserAddress(){
      this.requestHybird({
        action:'getAddressList',
        param:{},
        callback:function(data){
          this.address = JSON.parse(data);
          this.isloading = false;
        }.bind(this)
      })
    }
  },
  computed:{

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
