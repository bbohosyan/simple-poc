import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Quarkus backend-а

// Взимане на всички редове
export const fetchRows = async () => {
  const response = await axios.get(`${API_BASE_URL}/rows`);
  return response.data;
};

// Добавяне на нов ред
export const createRow = async (rowData) => {
  const response = await axios.post(`${API_BASE_URL}/rows`, rowData);
  return response.data;
};

// Изтриване на ред (optional)
export const deleteRowById = async (id) => {
  await axios.delete(`${API_BASE_URL}/rows/${id}`);
};