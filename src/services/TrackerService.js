import * as API from "@/services/API";

export default {
  getTrackers() {
    return API.apiClient.get(`/trackers`);
  },
  createTrackers(payload) {
    return API.apiClient.post(`/trackers`, payload);
  },
  updateTrackers(categoryId, payload) {
    return API.apiClient.put(`/trackers/${categoryId}`, payload);
  },
  deleteTrackers(id) {
    return API.apiClient.delete(`/trackers/${id}`);
  },

};