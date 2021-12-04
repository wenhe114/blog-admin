<template>
    <div class="admin-top">
        <div>
            <span class="iconfont open-or-close-icon" :class="collapsed?'icon-daohangshouqi-':'icon-daohangzhankai-'" @click="collapsed=!collapsed"></span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,inject } from 'vue'

export default defineComponent({
    setup() {
        const collapsed=inject("collapsed")
        return {
            collapsed
        }
    },
})
</script>

<style lang="less">
.admin-top{
    >div{
        height: 100%;
    }
    .open-or-close-icon{
        font-size: 35px;
    }
}
</style>
