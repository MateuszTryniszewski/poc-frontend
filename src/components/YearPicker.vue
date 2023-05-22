<template>
  <div class="a">
    <input type="text" v-model="selectedYear" @click="showPicker = true" readonly>
    <div v-if="showPicker" class="year-picker">
      <ul>
        <li v-for="year in years" :key="year" @click="selectYear(year)">{{ year }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedYear: null,
      showPicker: false
    }
  },
  computed: {
    years() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = currentYear - 2; year <= currentYear + 2; year++) {
        years.push(year);
      }
      return years;
    }
  },
  methods: {
    selectYear(year) {
      this.selectedYear = year;
      this.showPicker = false;
    }
  }
}
</script>

<style>
.a {
  display: flex;
}
.year-picker {
  flex: 1 0 100%;
  position: absolute;
  background-color: #fff;
  z-index: 1;
  width: 100%;
}

.year-picker ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.year-picker li {
  cursor: pointer;
  padding: 5px;
}

.year-picker li:hover {
  background-color: #f2f2f2;
}
</style>
