import * as API from "@/services/API";

export default {
  getCategories() {
    return API.apiClient.get(`/categories`);
  },
  updateCategory(categoryId, payload) {
    return API.apiClient.put(`/categories/${categoryId}`, payload);
  },
  createCategory(payload) {
    return API.apiClient.post(`/categories`, payload);
  },
  deleteCategory(id) {
    return API.apiClient.delete(`/categories/${id}`);
  },

};