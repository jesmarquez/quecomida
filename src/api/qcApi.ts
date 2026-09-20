import axios from 'axios'

const qcApi = axios.create({
  baseURL: import.meta.env.VITE_QC_API_URL,
});

qcApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // const token = '999384.yryyrr.88686';

  if (token) {
    config.headers.Authorization = `Bearer ${ token }`
  }
  return config;
})
export { qcApi };