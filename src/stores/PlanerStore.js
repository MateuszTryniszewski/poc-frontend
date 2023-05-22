import { defineStore } from "pinia";
import { getError } from "@/utils/helpers";
import PlanerService from "@/services/PlanerService";


export const usePlanerStore = defineStore({
  id: "PlanerStore",
  persist: true,

  state: () => ({
    Planers: []
  }),

  actions: {
    async fetchPlaners() {
      try {
        const response = await PlanerService.getPlaners();
        this.Planers = response.data;  
      } catch (error) {
        this.error = getError(error);
      }
    },
    async addPlaners(payload) {
      try {
        payload.m01 = payload.m01 * 1,
        payload.m02 = payload.m02 * 1,
        payload.m03 = payload.m03 * 1,
        payload.m04 = payload.m04 * 1,
        payload.m05 = payload.m05 * 1,
        payload.m06 = payload.m06 * 1,
        payload.m07 = payload.m07 * 1,
        payload.m08 = payload.m08 * 1,
        payload.m09 = payload.m09 * 1,
        payload.m10 = payload.m10 * 1,
        payload.m11 = payload.m11 * 1,
        payload.m12 = payload.m12 * 1,
        
        await PlanerService.createPlaners(payload);
        await this.fetchPlaners(); 
      } catch (error) {
        this.error = getError(error);
      }
    },
    async updatePlaners(payload) {
      try {
        await PlanerService.updatePlaners(payload.id ,payload); 
        await this.fetchPlaners();  
      } catch (error) {
        this.error = getError(error);
      }
    },
    async deletePlaners(id) {
      try {
        this.Planers = this.Planers.filter(item => item?.id !== id)
        await PlanerService.deletePlaners(id);
      } catch (error) {
        this.error = getError(error);
      }
    },
  },
  

  getters: {
    getPlaners(state){
      return state.Planers
    }
  },
});