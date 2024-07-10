<template>
  <section class="offers">
    <div class="loader-container" v-if="loading">
      <LoaderComponent />
    </div>
    <div v-else class="offer-container">
      <div v-for="offer in filteredOffers" :key="offer.id" class="offer">
        <img :src="offer.foto_url ? require(`../assets/images/${offer.foto_url}`) : ''" :alt="`Oferta ${offer.id}`">
        <h3>{{ offer.titulo }}</h3>
        <p>{{ offer.informacion }}</p>
        <a @click="editOfferPackage(offer)">Editar</a>
        <a @click="confirmDelete(offer)">Eliminar</a>
      </div>
    </div>

    <!-- Componente CRUD -->
    <PaqueteForm
      :mode="crudMode"
      :selectedPackage="selectedPackage"
      @addPackage="addPackage"
      @editPackage="editPackage"
      @deletePackage="deletePackage"
      :switchMode="switchMode"
    />
  </section>
</template>

<script>
import ApiService from '../services/apiService';
import LoaderComponent from './LoaderComponet.vue';
import PaqueteForm from './PaqueteForm.vue';

export default {
  name: 'OfferComponent',
  components: {
    LoaderComponent,
    PaqueteForm,
  },
  props: {
    tipoDePaquete: {
      type: String,
      required: true,
    },
    paquetesAMostrar: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      offers: [],
      loading: true,
      crudMode: 'add',
      selectedPackage: null,
    };
  },
  computed: {
    filteredOffers() {
      if (this.paquetesAMostrar.length === 0) {
        return this.offers;
      } else {
        return this.offers.filter(offer => this.paquetesAMostrar.includes(offer.tipo));
      }
    },
  },
  watch: {
    tipoDePaquete(newTipoDePaquete) {
      this.loading = true;
      this.fetchOffers(newTipoDePaquete);
    },
  },
  created() {
    this.fetchOffers(this.tipoDePaquete);
  },
  methods: {
    fetchOffers(tipo) {
      ApiService.getPaquetesPorTipo(tipo)
        .then((response) => {
          this.offers = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error('Error al obtener ofertas:', error);
        });
    },

    editOfferPackage(offer) {
      if (offer) {
        this.selectedPackage = { ...offer };  // Hacemos una copia para evitar la referencia directa
        this.switchMode('edit');
      } else {
        console.error('Error: El paquete seleccionado es nulo.');
      }
    },

    confirmDelete(offer) {
      if (offer) {
        this.selectedPackage = offer;
        this.switchMode('delete');
      } else {
        console.error('Error: El paquete seleccionado para eliminar es nulo.');
      }
    },

    addPackage(newPackage) {
      this.offers.push(newPackage); // Añadir el nuevo paquete a la lista local
      setTimeout(() => {
        window.location.reload(); // Recargar la página después de un retraso de 2 segundos
      }, 0);
    },

    editPackage(updatedPackage) {
      const index = this.offers.findIndex(offer => offer.id === updatedPackage.id);
      if (index !== -1) {
        this.$set(this.offers, index, updatedPackage); // Actualizar el paquete en la lista local
      }
      setTimeout(() => {
        window.location.reload(); // Recargar la página después de un retraso de 2 segundos
      }, 0);
    },

    deletePackage(packageId) {
      this.offers = this.offers.filter(offer => offer.id !== packageId); // Eliminar el paquete de la lista local
      setTimeout(() => {
        window.location.reload(); // Recargar la página después de un retraso de 2 segundos
      }, 0);
    },

    switchMode(newMode) {
      this.crudMode = newMode;
    },
  },
};
</script>


<style scoped>
.offers {
  text-align: center;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.offer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.offer {
  background-color: #f5f5f5;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  width: 300px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.offer h3 {
  font-size: 1.5rem;
  margin: 10px 0;
}

.offer p {
  font-size: 1rem;
  margin: 10px 0;
}

.offer img {
  max-width: 100%;
  height: auto;
  width: 100%;
  max-height: 200px;
}

.offer a {
  display: block;
  color: #333;
  text-decoration: none;
  font-weight: bold;
  background-color: #fff;
  border: 1px solid #333;
  padding: 8px 16px;
  border-radius: 4px;
  text-align: center;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.offer a:hover {
  background-color: #333;
  color: #fff;
}
</style>
