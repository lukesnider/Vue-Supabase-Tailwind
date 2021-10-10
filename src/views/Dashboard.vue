<template>
  <div class="container mx-auto p-6">
    <div class="flex">
      <button @click="Logout" class="border-2 border-black p-2">Logout</button>
    </div>
    Dashboard
  </div>
</template>
<script>
export default {
    name: 'Dashboard',
    data: () => {
        return {
        }
    },
    methods: {
      async Logout() {
        const { error } = await this.$store.state.supabase.auth.signOut()
        if(error) {
          console.log(error)
          return;
        }
        this.$store.dispatch('Logout')
        this.$router.push({path:'/login'})
      },
    },
    components: {
    },
}
</script>
<style>
</style>