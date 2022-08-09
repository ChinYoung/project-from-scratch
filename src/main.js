import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/index.css'

const app = createApp(App)
app.use(router)
  .use(ElementPlus, { locale })
  .mount('#app')
