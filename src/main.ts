import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 完整引入
import antd from 'ant-design-vue/es';
import 'ant-design-vue/dist/antd.css';

import "../public/iconfont/iconfont.css"

import VueMarkdownEditor from '@kangc/v-md-editor/lib/base-editor.js';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
// highlightjs
VueMarkdownEditor.use(vuepressTheme, {
    Prism,
  });
// 按需引入
// import {Button} from 'ant-design-vue';

createApp(App).use(store).use(antd).use(router).use(VueMarkdownEditor).mount("#app");
