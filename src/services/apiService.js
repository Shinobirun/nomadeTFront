import axios from 'axios';

const BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:4000/api';

export default {
  // Función para hacer una solicitud GET
  get(resource) {
    return axios.get(`${BASE_URL}/${resource}`);
  },
  
  getPaquetesPorTipo(tipo) {
    return axios.get(`${BASE_URL}/paquetes`, { params: { tipo: tipo } });
  },
  
  post(resource, data) {
    return axios.post(`${BASE_URL}/${resource}`, data);
  },
  
  put(resource, data) {
    return axios.put(`${BASE_URL}/${resource}`, data);
  },
  
  delete(resource) {
    return axios.delete(`${BASE_URL}/${resource}`);
  },

  addPaquete(data) {
    return this.post('paquetes', data);
  },

  updatePaquete(id, data) {
    return this.put(`paquetes/${id}`, data);
  },

  deletePaquete(id) {
    return this.delete(`paquetes/${id}`);
  },
};
