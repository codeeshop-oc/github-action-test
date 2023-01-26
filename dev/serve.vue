<script>
import Vue from 'vue';
import VueFullAutocomplete from '@/VueFullAutocomplete.vue';

export default Vue.extend({
  name: 'ServeDev',
  data() {
    return {
      selected_item: {},
      visible: false,
      visible2: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  components: {
    VueFullAutocomplete
  },
  mounted() {
    console.log(this.$refs.VueFullAutocomplete.searchResults())
  },
  methods: {
    selected(item) {
      this.selected_item = item
      console.log(item, 'item')
    }
  }
});
</script>

<template>
  <div id="app">
    <div class="text-center">
      <button
        @click="visible = true; selected_item = {}"
        class="newbutton"
        >Open Popup <small>( Load on Start )</small></button>

      <button
        @click="visible2 = true; selected_item = {}"
        class="newbutton"
        >Open Popup 2 <small>( Not Load on Start )</small></button>
    </div>

      <p v-if="selected_item">Results: {{this.selected_item}}</p>

    <VueFullAutocomplete
      ref="VueFullAutocomplete"
      :visible="visible"
      @close="visible = false"
      @selected="selected"
      :headers="headers"
      url="https://jsonplaceholder.typicode.com/users"
      />

    <VueFullAutocomplete
      ref="VueFullAutocomplete2"
      :visible="visible2"
      @close="visible2 = false"
      @selected="selected"
      url="https://jsonplaceholder.typicode.com/users"
      />
  </div>
</template>

<style type="text/css">
  body {
    display: block;
    margin: 0;
  }
  .newbutton {
    margin: auto;
    display: inline-block;
    margin: 15px 15px 0;
  }
  .text-center {
    text-align: center;
  }
</style>