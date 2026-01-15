import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const fetchRows = async (page = 0, size = 10) => {
  const response = await axios.get(`${API_BASE_URL}/rows?page=${page}&size=${size}`);
  return response.data;
};

export const createRow = async (rowData) => {
  const response = await axios.post(`${API_BASE_URL}/rows`, rowData);
  return response.data;
};

export const deleteRowById = async (id) => {
  await axios.delete(`${API_BASE_URL}/rows/${id}`);
};