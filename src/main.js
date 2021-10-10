import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { createClient } from '@supabase/supabase-js'
import './index.css'
const supabaseUrl = "";
const supabaseAnonKey = "";
store.commit('SetState',{key:'supabase',value:createClient(supabaseUrl, supabaseAnonKey)})
const user = store.state.supabase.auth.user()
if(user) store.commit('SetState',{key:'user',value:user})
router.beforeEach((to, from,next) => {
    if(to.meta.private && !store.getters.isAuthenticated) return next({path:'/login'});
    return next();
})
createApp(App).use(router).use(store).mount('#app')