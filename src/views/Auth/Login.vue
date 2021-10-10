<template>
  <div class="container mx-auto flex flex-col p-6">
    <h1 class="text-xl">Login</h1>
    <div class="flex flex-col">
        <div class="my-2 flex flex-col">
            <label for="email">Email Address</label>
            <input class="border-2 border-black" type="email" id="email" v-model="email" />
        </div>
        <div class="my-2 flex flex-col">
            <label for="password">Password</label>
            <input class="border-2 border-black" type="password" id="password" v-model="password" />
        </div>
        <div class="my-2 flex flex-col">
            <button @click="Login" class="border-2 border-black">Login</button>
        </div>
        <div class="my-2 flex flex-col">
            <router-link :to="{path:'/register'}" >Register a new account here.</router-link>
        </div>
        <div class="my-2 flex flex-col">
            <p>{{message}}</p>
        </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
    name: 'Login',
    setup () {
      const router = useRouter();
      const store = useStore()
      if(store.getters.isAuthenticated) router.push({path:'/'});
    },
    data: () => {
        return {
            loading:false,
            email: '',
            password: '',
            message: '',
        }
    },
    methods: {
      async Login() {
        const { user, error } = await this.$store.state.supabase.auth.signIn({
          email: this.email,
          password: this.password,
        })
        if(error){
          this.message = error.message;
          return;
        }
        this.$store.commit('SetState',{key:'user',value:user})
        this.$router.push({path:'/'})
      },
    },
    components: {
    },
}
</script>
<style>
</style>