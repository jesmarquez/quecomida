import axios from 'axios'

const qcApi = axios.create({
  baseURL: import.meta.env.VITE_QC_API_URL,
});

export { qcApi };