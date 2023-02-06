# Vue Full Autocomplete

## Props
### Passing Setting Props

```html
<template>
  <VueFullAutocomplete url="https://your_api_url.com" :visible="visible" />
</template>
```

### All Props

Check out [Live Demo](https://codeeshop-oc.github.io/vue-full-autocomplete/) for settings usage.

| Prop name         | Description                                      | Type    | Values                   | Default      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------- | ------------ |
| visible           | show popup or not                                | Boolean | -                        | false    |
| keyItem           | key to be used to show listing data ( just one ) | String  | -                        | username |
| url               | URL of the API                                   | String  | https://google.com       | -        |
| method            | Method of the API Request                        | String  | GET, POST                | GET      |
| params            | Other params to pass in API                      | Object  | {key: value, key: value} | {}       |
| headers           | Headers in the API Request                       | Object  | {}                       | -        |
| closeOnClick      | close the popup on select from listting          | Boolean | -                        | true     |
| closeOutsideClick | close the popup on outside modal click           | Boolean | -                        | true     |

### Listening to Events

```html
<template>
  <VueFullAutocomplete url="https://your_api_url.com" :visible="visible" @selected="selected" @close="close" />
</template>
<script>
  export default {
    data() {
      return() {
        visible: false
      },
    },
    methods: {
      selected(v) {
        console.log(`Event Emmited....`)
        console.log(`Return Value: ${v}`)
      },
      close(v) {
        console.log(`Event Emmited....`)
        console.log(`Return Value: ${v}`)
      }
    },
  }
</script>
```

### All Events

| Event name    | Description                                      | Arguments |
| ------------- | ------------------------------------------------ | --------- |
| selected      | return selected array index values               | -         |
| close         | event on outside click or click on listing value | -         |

### Slots

```html
<template>
  <VueFullAutocomplete>
    <template #listItem="slotProps">
      <li>{{slotProps.item.name}} <small>({{slotProps.item.username}})</small></li>
    </template>
    <template #loading>
      <div class="your_spinner"></div>
    </template>
  </Clipboard>
</template>
```

### All Slots

| Slot name     | Description                                      | Bindings  |
| ------------- | ------------------------------------------------ | --------- |
| listItem      | return listing element                           | item      |
| loading       | loader when request is fetching                  | -         |
