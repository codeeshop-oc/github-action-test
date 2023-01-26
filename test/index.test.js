/* global describe, test, expect */
'use strict';

import { mount, createLocalVue } from '@vue/test-utils';
// import VueFullAutocomplete from '../src/VueFullAutocomplete.vue'

const localVue = createLocalVue();
// localVue.component('VueFullAutocomplete', VueFullAutocomplete);
// describe('Testing VueFullAutocomplete component', () => {
//   const wrapper = mount({
//     template: `
//       <VueFullAutocomplete
//           ref="VueFullAutocomplete"
//           :visible="true"
//           @close="visible = false"
//           @selected="selected"
//           :headers="{
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//           }"
//           url="https://jsonplaceholder.typicode.com/users"
//       />
//     `
//   }, { localVue });

  test('default slot', () => {

    // console.log(this.$refs.VueFullAutocomplete.searchResults())

    // const slides = wrapper.findAll('.hooper-slide');
    // expect(slides.length).toEqual(3);
    // expect(wrapper.find('.hooper-navigation').exists()).toBe(true);
    // expect(wrapper.find('.hooper-next').exists()).toBe(true);
    // expect(wrapper.find('.hooper-prev').exists()).toBe(true);
  });
// });