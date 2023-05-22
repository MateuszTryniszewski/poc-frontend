import * as API from "@/services/API";

export default {
  getPlaners() {
    return API.apiClient.get(`/planers`);
  },
  createPlaners(payload) {
    return API.apiClient.post(`/planers`, payload);
  },
  updatePlaners(categoryId, payload) {
    return API.apiClient.put(`/planers/${categoryId}`, payload);
  },
  deletePlaners(id) {
    return API.apiClient.delete(`/planers/${id}`);
  },

};