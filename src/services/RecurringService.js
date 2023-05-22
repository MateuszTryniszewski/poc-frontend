import * as API from "@/services/API";

export default {
  getRecurrings() {
    return API.apiClient.get(`/harmonograms`);
  },
  createRecurrings(payload) {
    return API.apiClient.post(`/harmonograms`, payload);
  },
  updateRecurrings(categoryId, payload) {
    return API.apiClient.put(`/harmonograms/${categoryId}`, payload);
  },
  deleteRecurrings(id) {
    return API.apiClient.delete(`/harmonograms/${id}`);
  },

};