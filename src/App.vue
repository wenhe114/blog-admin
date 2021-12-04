<template>
  <a-config-provider :locale="zhCN">
    <router-view />
    </a-config-provider>
</template>

<script>
  import {defineComponent} from "vue"
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import moment from 'moment';
  import 'moment/dist/locale/zh-cn';
  moment.locale('en');
  export default defineComponent({
    setup(){
      return{
        zhCN
      }
    }
  })
</script>
<style lang="less">
html,body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
