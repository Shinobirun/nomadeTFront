<template>
  <div class="body">
    <HeaderComponent />
    <main>
      <BannerComponent />
      <div>
        <!-- Agregar el desplegable para seleccionar el tipo de paquete -->
        <div class="filter-container">
          <label for="tipoPaquete">Selecciona un tipo de paquete:</label>
          <select id="tipoPaquete" v-model="selectedTipoPaquete" @change="filtrarPaquetes">
            <option v-for="tipo in tiposDePaquetes" :key="tipo" :value="tipo">{{ tipo }}</option>
          </select>
        </div>
        <OffertComponent :tipoDePaquete="selectedTipoPaquete" :paquetesAMostrar="paquetesFiltrados" />
      </div>
      <WhatsappComponent />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import BannerComponent from '@/components/BannerComponent.vue'
import OffertComponent from '@/components/OffertsComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import WhatsappComponent from '@/components/WhatsappComponent.vue'

export default {
  name: 'ToursView',
  components: {
    HeaderComponent,
    BannerComponent,
    OffertComponent,
    WhatsappComponent,
    FooterComponent,
  },
  data() {
    return {
      selectedTipoPaquete: 'aventura', // Tipo de paquete seleccionado
      tiposDePaquetes: ['aventura', 'cultural', 'relajacion', 'naturaleza'], // Tipos de paquetes disponibles
      paquetesAMostrar: [], // Paquetes filtrados a mostrar
      paquetesFiltrados: [],
    };
  },
  props: {
    tipoDePaquete: {
      type: String,
      default: 'aventura'
    }
  },
  methods: {
    filtrarPaquetes() {
      // Filtrar los paquetes según el tipo seleccionado
      this.paquetesFiltrados = this.paquetesAMostrar.filter(paquete => paquete.tipo === this.selectedTipoPaquete);
    }
  },
  mounted() {
    // Inicializar la lista de paquetes a mostrar
    this.paquetesAMostrar = [
      { tipo: 'aventura', nombre: 'Paquete Aventura 1' },
      { tipo: 'cultural', nombre: 'Paquete Cultural 1' },
      { tipo: 'relajacion', nombre: 'Paquete Relajación 1' },
      { tipo: 'naturaleza', nombre: 'Paquete Naturaleza 1' },
      // Agrega más paquetes según sea necesario
    ];
    // Aplicar el filtro inicial
    this.filtrarPaquetes();
  }
}
</script>

<style scoped>
.body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f09012;
  background-size: cover;
  background-attachment: fixed;
}

.filter-container {
  margin: 20px;
  text-align: center;
}

.filter-container label {
  margin-right: 10px;
}

.filter-container select {
  padding: 5px;
}
</style>
