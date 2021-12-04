<template>
  <div class="login-bg">
    <a-form class="login-box" :model="formState" :rules="rules">
      <a-form-item has-feedback label="账号" name="user">
        <a-input
          v-model:value="formState.user"
        />
      </a-form-item>
      <a-form-item has-feedback label="账号" name="password">
        <a-input
          v-model:value="formState.password"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <div class="login-btn">
          <a-button type="primary" @click="login">登录</a-button>
      </div>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import {useRouter} from "vue-router"

export default defineComponent({
  setup() {
      const router=useRouter()
    const reactiveData = reactive({
      formState: {
        user: "",
        password: "",
      },
      rules: {
        user: [],
        password: [],
      },
    });
    function login() {
        router.push({
            path:"/admin"
        })
    }
    return {
      ...toRefs(reactiveData),
      login
    };
  },
});
</script>

<style lang="less">
.login-bg{
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: row;
    height: 100%;
    .login-box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 300px;
        // height: 300px;
        .login-btn{
            text-align: center;
        }
    }
}
</style>
