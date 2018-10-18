<template>
  <div id="app">
    <mu-appbar style="width: 100%;">
      <mu-button  @click="backHome" flat slot="left">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
    </mu-appbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    backHome(){
      this.requestHybird({
        action:'backHome',
        param:{}
      })
    }
  }
}
</script>

<style>

</style>
