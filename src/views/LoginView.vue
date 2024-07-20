<template>
    <div>
      <HomeView @show-login="mostrarModal = true" />
      <LoginModalComponent v-if="mostrarModal" @close="mostrarModal = false" />
    </div>
  </template>
  
  <script>
  import HomeView from '@/views/HomeView.vue';
  import LoginModalComponent from '@/components/LoginModalComponent.vue';
  
  export default {
    components: {
      HomeView,
      LoginModalComponent
    },
    data() {
      return {
        mostrarModal: false
      };
    }
  };
  </script>
  
  <style scoped>
  /* Agrega los estilos necesarios aquí */
  </style>
  