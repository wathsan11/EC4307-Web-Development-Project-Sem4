import axios from "axios";

const API_URL = "http://localhost:8080/api/paintings";

export const getAllPaintings = () => axios.get(API_URL);

export const getPaintingById = (id) => axios.get(`${API_URL}/${id}`);

export const createPainting = (paintingData) =>
  axios.post(`${API_URL}/upload`, paintingData);

export const updatePainting = (id, updatedData) =>
  axios.put(`${API_URL}/update/${id}`, updatedData);

export const deletePainting = (id) =>
  axios.delete(`${API_URL}/delete/${id}`);
