<template>
  <div class="body">
    <HeaderComponent />
    <main>
      <ContactFormComponent />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import ContactFormComponent from '@/components/ContactFormComponent.vue';

export default {
  name: 'ToursView',
  components: {
    HeaderComponent,
    ContactFormComponent,
    FooterComponent
  },
  data() {
    return {
      mensaje: 'Componente Contacto'
    };
  },
  methods: {
    irAHome() {
      this.$router.push({ path: '/' });
    }
  }
}
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh; /* Ajusta la altura mínima al 100% de la altura de la ventana */
  background-image: url('../assets/images/playaMuelle.jpg');
  background-size: cover; /* Ajusta la imagen al tamaño del viewport */
  background-attachment: fixed; /* Fija la imagen de fondo para que no se desplace con el contenido */
}

main {
  flex: 1; /* Hace que el contenido principal crezca para ocupar el espacio disponible */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra verticalmente el contenido dentro del main */
  justify-content: center; /* Centra horizontalmente el contenido dentro del main */
  padding: 20px; /* Agrega un relleno para evitar que el contenido toque los bordes */
  box-sizing: border-box; /* Asegura que el padding se incluya en el tamaño total del elemento */
}

</style>
