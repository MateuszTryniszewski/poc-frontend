import { defineStore } from "pinia";
import { getError } from "@/utils/helpers";
import CategoriesService from "@/services/CategoriesService";


export const useCategoryStore = defineStore({
  id: "categoryStore",
  persist: true,

  state: () => ({
    categories: []
  }),

  actions: {
    async fetchCategories() {
      try {
        const response = await CategoriesService.getCategories();
        this.categories = response.data;  
      } catch (error) {
        this.error = getError(error);
      }
    },
    async addCategory(payload) {
      try {
        await CategoriesService.createCategory(payload);
        await this.fetchCategories(); 
      } catch (error) {
        this.error = getError(error);
      }
    },
    async updateCategory(payload) {
      try {
        await CategoriesService.updateCategory(payload.id ,payload); 
        await this.fetchCategories();  
      } catch (error) {
        this.error = getError(error);
      }
    },
    async deleteCategory(id) {
      try {
        this.categories = this.categories.filter(item => item?.id !== id)
        await CategoriesService.deleteCategory(id);
      } catch (error) {
        this.error = getError(error);
      }
    },
  },
  

  getters: {
    getCategories(state){
      return state.categories
    }
  },
});