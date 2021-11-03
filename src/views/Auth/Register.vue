<template>
  <div class="container mx-auto flex flex-col p-6">
    <h1 class="text-xl">Register An Account</h1>
    <div class="flex flex-col">
        <div class="my-2 flex flex-col">
            <label for="name">Name</label>
            <input class="border-2 border-black" type="text" id="name" v-model="name" />
        </div>
        <div class="my-2 flex flex-col">
            <label for="email">Email Address</label>
            <input class="border-2 border-black" type="email" id="email" v-model="email" />
        </div>
        <div class="my-2 flex flex-col">
            <label for="password">Password</label>
            <input class="border-2 border-black" type="password" id="password" v-model="password" />
        </div>
        <div class="my-2 flex flex-col">
            <button @click="Register" class="border-2 border-black">Register</button>
        </div>
        <div class="my-2 flex flex-col">
            <router-link :to="{path:'/login'}" >Already have an account? Login here.</router-link>
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
    name: 'Register',
    data: () => {
        return {
            loading: false,
            name:'',
            email: '',
            password: '',
            message: '',
        }
    },
    setup () {
      const router = useRouter();
      const store = useStore()
      if(store.getters.isAuthenticated) router.push({path:'/'});
    },
    methods: {
        async Register() {
            try {
                this.loading = true
                const { user,error } = await this.$store.state.supabase.auth.signUp({ email: this.email,password:this.password })
                if (error) {
                    throw error
                }else{
                    const updates = {
                        id: user.id,
                        username: this.name,
                        updated_at: new Date(),
                    }
                    await this.$store.state.supabase.from("profiles").upsert(updates, {
                        returning: "minimal",
                    })
                    user.username = this.name
                    this.$store.commit('SetState',{key:'user',value:user})
                    this.$router.push({path:'/'});
                }
            } catch (error) {
                this.message = (error.error_description || error.message)
            } finally {
                this.loading = false
            }
        },
    },
    components: {
    },
}
</script>
<style>
</style>
