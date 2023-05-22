import { defineStore } from "pinia";
import { getError } from "@/utils/helpers";
import TrackerService from "@/services/TrackerService";


export const useTrackerStore = defineStore({
  id: "trackerStore",
  persist: true,

  state: () => ({
    trackers: []
  }),

  actions: {
    async fetchTrackers() {
      try {
        const response = await TrackerService.getTrackers();
        this.trackers = response.data;  
      } catch (error) {
        this.error = getError(error);
      }
    },
    async addTrackers(payload) {
      try {
        await TrackerService.createTrackers(payload);
        await this.fetchTrackers(); 
      } catch (error) {
        this.error = getError(error);
      }
    },
    async updateTrackers(payload) {
      try {
        await TrackerService.updateTrackers(payload.id ,payload); 
        await this.fetchTrackers();  
      } catch (error) {
        this.error = getError(error);
      }
    },
    async deleteTrackers(id) {
      try {
        this.trackers = this.trackers.filter(item => item?.id !== id)
        await TrackerService.deleteTrackers(id);
      } catch (error) {
        this.error = getError(error);
      }
    },
  },
  

  getters: {
    getTrackers(state){
      return state.trackers
    },
    
    getRowCount(state) {
      return state.trackers.length
    },

    getIncoming(state) {
      return state.trackers.filter((item) => item.group_id === 1)
    },

    getRevenues(state) {
      return state.trackers.filter((item) => item.group_id === 2)
    },

    getIncomingCount(state) {
      return state.trackers.filter((item) => item.group_id === 1).length
    },
    
    getRevenuesCount(state) {
      return state.trackers.filter((item) => item.group_id === 2).length
    },

    getIncomingSum() {
      const summ = this.getIncoming.reduce((acc, obj) => {
        return acc + (obj.amount * 1)
      }, 0)
      return summ
    },

    getRevenuesSum() {
      const summ =  this.getRevenues.reduce((acc, obj) => {
        return acc + (obj.amount * 1)
      },0)
      return summ
    },

    saldo() {
      return this.getIncomingSum - this.getRevenuesSum
    }
  },
});