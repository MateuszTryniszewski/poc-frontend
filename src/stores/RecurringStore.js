import { defineStore } from "pinia";
import { getError } from "@/utils/helpers";
import RecurringService from "@/services/RecurringService";


export const useRecurringStore = defineStore({
  id: "recurringStore",
  persist: true,

  state: () => ({
    recurrings: []
  }),

  actions: {
    async fetchRecurrings() {
      try {
        const response = await RecurringService.getRecurrings();
        this.recurrings = response.data;  
      } catch (error) {
        this.error = getError(error);
      }
    },
    async addRecurrings(payload) {
      try {
        await RecurringService.createRecurrings(payload);
        await this.fetchRecurrings(); 
      } catch (error) {
        this.error = getError(error);
      }
    },
    async updateRecurrings(payload) {
      try {
        await RecurringService.updateRecurrings(payload.id ,payload); 
        await this.fetchRecurrings();  
      } catch (error) {
        this.error = getError(error);
      }
    },
    async deleteRecurrings(id) {
      try {
        console.log('id', id)
        this.recurrings = this.recurrings.filter(item => item?.id !== id)
        await RecurringService.deleteRecurrings(id);
      } catch (error) {
        this.error = getError(error);
      }
    },
  },
  

  getters: {
    getRecurrings(state){
      return state.recurrings
    }
  },
});