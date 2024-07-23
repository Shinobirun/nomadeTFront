<template>
  <header>
    <div class="logo">
      <img src="../assets/images/Logotipo_Nomade.png" alt="Logo de Nosotros">
    </div>
    <nav class="normal-menu">
      <ul>
        <li><a href="/"><img src="../assets/images/icons/travelling_2060284.png" alt="Inicio"> Inicio</a></li>
        <li><a href="/tours"><img src="../assets/images/icons/map_1934285.png" alt="Tours"> Tours</a></li>
        <li><a href="/contacto"><img src="../assets/images/icons/reception_1934306.png" alt="Contacto"> Contacto</a></li>
        <li><a href="#" @click="abrirModal"><img src="../assets/images/icons/luggage_1934282.png" alt="Login"> Login</a></li>
        <li><a href="/registro"><img src="../assets/images/icons/rating_1934299.png" alt="Contacto"> Registro</a></li>
        <li v-if="user"><span>Hola, {{ user.first_name }}</span> <button @click="logout">Logout</button></li>
      </ul>
    </nav>
    <div class="hamburger-menu">
      <li v-if="user"><span>Hola, {{ user.first_name }}</span> <button @click="logout">Logout</button></li>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <nav class="nav-hamburguer">
      <ul>
        <li><a href="/"><img src="../assets/images/icons/travelling_2060284.png" alt="Inicio"> Inicio</a></li>
        <li><a href="/tours"><img src="../assets/images/icons/map_1934285.png" alt="Tours"> Tours</a></li>
        <li><a href="/contacto"><img src="../assets/images/icons/reception_1934306.png" alt="Contacto"> Contacto</a></li>
        <li><a href="#" @click="abrirModal"><img src="../assets/images/icons/luggage_1934282.png" alt="Login"> Login</a></li>
        <li v-if="user"><span>Hola, {{ user.first_name }}</span> <button @click="logout">Logout</button></li>
      </ul>
    </nav>
    <LoginModalComponent v-show="mostrarModal" @close="cerrarModal" @login="mounted" />   
  </header>
</template>


<script>
  import LoginModalComponent from './LoginModalComponent.vue';

  export default {
  name: 'HeaderComponent',
  components: {
    LoginModalComponent,
  },
  data() {
    return {
      mensaje: 'Componente Contacto',
      mostrarModal: false,
      user: null,
    };
  },
  methods: {
    abrirModal() {
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
      location.reload(); // Recargar la página
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      location.reload(); // Recargar la página
    }
  },
  mounted() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navHamburguer = document.querySelector('.nav-hamburguer');

    hamburgerMenu.addEventListener('click', function() {
      if (window.getComputedStyle(navHamburguer).display !== 'none') {
        navHamburguer.classList.toggle('active');
      }
    });

    // Obtener los datos del usuario desde localStorage
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/Variables.css';

header {
  display: grid;
  grid-template-columns: 1fr auto; /* Divide el espacio en dos columnas, una para el logo y otra para el menú */
  align-items: center; /* Centra verticalmente los elementos en el header */
  background-color: #008E75;
  opacity: 1;
  padding: 10px 0;
}   

header:hover {
  opacity: .9;
}

.logo {
  text-align: left; /* Alinea el logo a la izquierda */
  padding-left: 10%;
  width: 40%; /* Ajusta el tamaño del contenedor del logo */
}

.logo img {
  width: 100%; /* Ajusta el tamaño de la imagen del logo */
  max-width: 150px; /* Tamaño máximo del logo */
}

nav {
  text-align: right; /* Alinea el menú a la derecha */
}

.normal-menu {
  display: block;
}

.hamburger-menu {
  display: none; 
  cursor: pointer;
}
  
.nav-hamburguer {
  max-height: 0;
  overflow: hidden;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: #f09012;
  margin: 5px auto;
  transition: 0.4s;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline;
  margin-right: 20px; /* Espacio entre elementos del menú */
}

a , span {
  text-decoration: none;
  color: #ffff;
  font-weight: bold;
}

a:hover {
  text-decoration: none;
  color: var(--color-secondary); /* Color del texto del menú */
  font-weight: bold;
}

li a img {
  height: 30px;
}

/* Media query para pantallas pequeñas */
@media (max-width: 768px) {
  header {
      padding: 5px 0;
  }

  .hamburger-menu {
      display: block;
      min-height: 50px;
      margin-right: 20px;
  }

  .normal-menu {
      display: none;
  }

  .nav-hamburguer.active {
      max-height: 800px;
      background-color: #008E75;
      box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
      text-align: left;
      margin-left: 70%;
  }

  .nav-hamburguer li {
      display: flex;
      flex-direction: column;
  }
}

/* Media query para pantallas medianas */
@media (min-width: 769px) and (max-width: 1024px) {
  header {
      padding: 10px 0;
  }

  .normal-menu {
      display: none;
  }

  .hamburger-menu {
      display: block;
      margin-right: 20px;
  }

  .nav-hamburguer.active {
      max-height: 800px;
      background-color: #008E75;
      box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
      text-align: left;
      margin-left: 60%;
  }

  .nav-hamburguer li {
      display: flex;
      flex-direction: column;
  }
}

/* Media query para pantallas grandes */
@media (min-width: 1025px) {
  header {
      padding: 15px 0;
  }
}
</style>
