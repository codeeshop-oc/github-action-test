<script>

export default {
  name: 'VueFullAutocomplete',
  data() {
    return {
      loading: false,
      search: '',
      url_params: '',
      list: [],
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    keyItem: {
      type: String,
      required: false,
      default: 'username'
    },
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: false,
      default: 'GET'
    },
    params: {
      type: Object,
      required: false,
      default: () => {}
    },
    headers: {
      type: Object,
      required: false,
      default: () => {}
    },
    closeOnClick: {
      type: Boolean,
      required: false,
      default: true
    },
    closeOutsideClick: {
      type: Boolean,
      required: false,
      default: true
    },
  },
  computed: {
    isPopup() {
      return this.visible
    }
  },
  methods: {
    selectedItem(item) {
      this.$emit('selected', item)
      if(this.closeOnClick) this.removeEvents()
    },
    searchResults() {
      this.loading = true
      this.list = []
      // Create URL
      var url = new URL(this.url)

      // Merge URL Data with Query Data
      this.url_params = { ...this.params, ...{ q: this.search }}
      url.search = new URLSearchParams(this.url_params).toString();
      fetch(url, {
        method: this.method,
        headers: this.headers,
      })
        .then(res => res.json())
        .then(json => {
          this.loading = false
          this.list = json
        })
    },
    closeIfEsc(event) {
      if(!event.isTrusted || !this.closeOutsideClick) return
      if(this.$el.contains(event.target)) {
        let bool = this.$el.childNodes[0].contains(event.target)
        if(!bool) this.removeEvents()
      }
    },
    removeEvents() {
      if(this.visible) {
        this.$emit('close', false)
      }
    }
  },
  created: function () {
    window.addEventListener('click', this.closeIfEsc)
  },
  beforeDestroy: function () {
    window.removeEventListener('click', this.closeIfEsc)
  },
};
</script>

<template>
  <div class="VueFullAutocomplete" v-if="isPopup">
    <div class="VueFullAutocompleteModal">
      <div>
        <input v-model="search" id="VueFullAutocompleteInput" @input="searchResults()">
      </div>
      <slot name="loading" v-if="loading">
        <div class="spinner"></div>
      </slot>
      <transition-group
        v-if="list.length"
        name="fade"
        tag="ul"
      >
        <a
          type="button"
          class="action-item"
          v-for="(item, index) in list"
          v-bind:key="item[keyItem]"
          v-bind:data-index="index"
          @click="selectedItem(item)"
        >
          <slot name="listItem" v-bind:item="item">
            <li class="list-item">{{ item[keyItem] }}</li>
          </slot>
        </a>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to, .fade-leave-active {
    opacity: 0;
  }
  .VueFullAutocomplete {
    width: 100%;
    top: 0;
    position: absolute;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .VueFullAutocompleteModal {
    position: fixed;
    bottom: 0;
    width: 100%;
    overflow-x: auto;
    height: calc(100% - 150px);
    background-color: rgb(255, 255, 255);
    border: 1px solid #ccc;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
  }
  #VueFullAutocompleteInput {
    border: 1px solid #ddd;
    width: calc(100% - 15px);
    padding: 5px;
  }
  .list-item {
    margin-top: 5px;
  }
  .spinner {
    height: 60px;
    width: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -30px 0 0 -30px;
    -webkit-animation: rotation 1s infinite linear;
    -moz-animation: rotation 1s infinite linear;
    -o-animation: rotation 1s infinite linear;
    animation: rotation 1s infinite linear;
    border: 6px solid rgba(0, 0, 0, 0.2);
    border-radius: 100%;
  }
  .spinner:before {
    content: "";
    display: block;
    position: absolute;
    left: -6px;
    top: -6px;
    height: 100%;
    width: 100%;
    border-top: 6px solid rgba(0, 0, 0, 0.8);
    border-left: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid transparent;
    border-radius: 100%;
  }
  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(359deg);
    }
  }
  @-moz-keyframes rotation {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(359deg);
    }
  }
  @-o-keyframes rotation {
    from {
      -o-transform: rotate(0deg);
    }
    to {
      -o-transform: rotate(359deg);
    }
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
</style>
