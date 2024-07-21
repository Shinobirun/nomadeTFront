<template>
  <div class="modal" v-show="mostrarModal">
    <!-- Contenido de inicio de sesión -->
    <div class="modal-content">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="iniciarSesion">
        <input v-model="email" type="text" name="email" placeholder="Correo electrónico">
        <input v-model="password" type="password" name="password" placeholder="Contraseña">
        <button type="submit">Iniciar Sesión</button>
      </form>
      <button @click="cerrarModal">Cerrar</button>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/services/interceptorService';

export default {
  name: 'LoginModalComponent',
  data() {
    return {
      mostrarModal: false,
      email: '',
      password: ''
    };
  },
  methods: {
    cerrarModal() {
      this.$emit('close');
    },
    async iniciarSesion() {
      try {
        const response = await axiosInstance.post('/login', {
          email: this.email,
          password: this.password
        });

        console.log('Datos de inicio de sesión:', this.email, this.password);
        console.log('Respuesta del servidor:', response.data);

        if (response.status >= 200 && response.status < 300) {
          // Almacenar el token JWT en localStorage o Vuex
          localStorage.setItem('token', response.data.token);
          
          localStorage.setItem('user', JSON.stringify(response.data.user));

          this.cerrarModal();
          this.$emit('login');
          window.location.reload(); 
        }
      } catch (error) {
        console.error('Error en la respuesta:', error.response);

        if (error.response && error.response.status === 401) {
          alert(`Error: ${error.response.data.error || 'Correo electrónico o contraseña incorrectos.'}`);
        } else {
          alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
      }
    }
  }
};
</script>

<style scoped>
/* Estilos para el modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
}

.modal-content {
  background: #f09012;
  padding: 20px;
  border-radius: 8px;
  border-color: blue;
  text-align: center;
}

form {
  margin-bottom: 20px;
}
</style>
