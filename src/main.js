import { createApp } from 'vue'
import './style.css'
import ElementPlus, { ElMessage } from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/index.css'
import mitt from 'mitt'

const app = createApp(App)
app.use(router)
  .use(ElementPlus, { locale })

app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$eventBus = mitt()

app.mount('#app')
