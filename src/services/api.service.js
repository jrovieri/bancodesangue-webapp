import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';

class ApiService {

  getStats = ({ path }) => axios.get(`${API_URL}/stats/${path}`);

  listCandidatos = ({ page, size }) => axios.get(`${API_URL}/candidatos`, {
    page,
    size
  });

  getCandidatoById = id => axios.get(`${API_URL}/candidatos/${id}`, {
    headers: authHeader()
  });

  updateCandidato = data => axios.post(`${API_URL}/candidatos`, data, {
    headers: authHeader()
  });

  deleteCandidato = id => axios.get(`${API_URL}/candidatos/${id}`, {
    headers: authHeader()
  });

  loadCandidatos = file => {
    const formData = new FormData();
    formData.append('file', file);
    
    return axios.post(`${API_URL}/candidatos/load`, formData, {
      headers: {
        ...authHeader(),
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default new ApiService();