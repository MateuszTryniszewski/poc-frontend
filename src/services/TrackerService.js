import * as API from "@/services/API";

export default {
  getCategories() {
    return API.apiClient.get(`/trackers`);
  },
  updateCategory(categoryId, payload) {
    return API.apiClient.put(`/trackers/${categoryId}`, payload);
  },
  createCategory(payload) {
    return API.apiClient.post(`/trackers`, payload);
  },
  deleteCategory(id) {
    return API.apiClient.delete(`/trackers/${id}`);
  },

};