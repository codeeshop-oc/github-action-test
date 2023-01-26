'use strict';function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}var script = {
  name: 'VueFullAutocomplete',
  data: function data() {
    return {
      loading: false,
      search: '',
      url_params: '',
      list: []
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
      required: true
    },
    method: {
      type: String,
      required: false,
      default: 'GET'
    },
    params: {
      type: Object,
      required: false,
      default: function _default() {}
    },
    headers: {
      type: Object,
      required: false,
      default: function _default() {}
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
    }
  },
  computed: {
    isPopup: function isPopup() {
      return this.visible;
    }
  },
  methods: {
    selectedItem: function selectedItem(item) {
      this.$emit('selected', item);
      if (this.closeOnClick) this.removeEvents();
    },
    searchResults: function searchResults() {
      var _this = this;
      this.loading = true;
      this.list = [];
      // Create URL
      var url = new URL(this.url);

      // Merge URL Data with Query Data
      this.url_params = _objectSpread2(_objectSpread2({}, this.params), {
        q: this.search
      });
      url.search = new URLSearchParams(this.url_params).toString();
      fetch(url, {
        method: this.method,
        headers: this.headers
      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this.loading = false;
        _this.list = json;
      });
    },
    closeIfEsc: function closeIfEsc(event) {
      if (!event.isTrusted || !this.closeOutsideClick) return;
      if (this.$el.contains(event.target)) {
        var bool = this.$el.childNodes[0].contains(event.target);
        if (!bool) this.removeEvents();
      }
    },
    removeEvents: function removeEvents() {
      if (this.visible) {
        this.$emit('close', false);
      }
    }
  },
  created: function created() {
    window.addEventListener('click', this.closeIfEsc);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('click', this.closeIfEsc);
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isPopup ? _c('div', {
    staticClass: "VueFullAutocomplete"
  }, [_vm._ssrNode("<div class=\"VueFullAutocompleteModal\" data-v-111d72af>", "</div>", [_vm._ssrNode("<div data-v-111d72af><input id=\"VueFullAutocompleteInput\"" + _vm._ssrAttr("value", _vm.search) + " data-v-111d72af></div> "), _vm.loading ? _vm._t("loading", function () {
    return [_c('div', {
      staticClass: "spinner"
    })];
  }) : _vm._e(), _vm._ssrNode(" "), _vm.list.length ? _c('transition-group', {
    attrs: {
      "name": "fade",
      "tag": "ul"
    }
  }, _vm._l(_vm.list, function (item, index) {
    return _c('a', {
      key: item[_vm.keyItem],
      staticClass: "action-item",
      attrs: {
        "type": "button",
        "data-index": index
      },
      on: {
        "click": function click($event) {
          return _vm.selectedItem(item);
        }
      }
    }, [_vm._t("listItem", function () {
      return [_c('li', {
        staticClass: "list-item"
      }, [_vm._v(_vm._s(item[_vm.keyItem]))])];
    }, {
      "item": item
    })], 2);
  }), 0) : _vm._e()], 2)]) : _vm._e();
};
var __vue_staticRenderFns__ = [];

/* style */
var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-111d72af_0", {
    source: ".fade-enter-active[data-v-111d72af],.fade-leave-active[data-v-111d72af]{transition:opacity .5s}.fade-enter[data-v-111d72af],.fade-leave-active[data-v-111d72af],.fade-leave-to[data-v-111d72af]{opacity:0}.VueFullAutocomplete[data-v-111d72af]{width:100%;top:0;position:absolute;height:100%;background-color:rgba(0,0,0,.3)}.VueFullAutocompleteModal[data-v-111d72af]{position:fixed;bottom:0;width:100%;overflow-x:auto;height:calc(100% - 150px);background-color:#fff;border:1px solid #ccc;overflow:hidden;padding:10px;box-sizing:border-box}#VueFullAutocompleteInput[data-v-111d72af]{border:1px solid #ddd;width:calc(100% - 15px);padding:5px}.list-item[data-v-111d72af]{margin-top:5px}.spinner[data-v-111d72af]{height:60px;width:60px;position:absolute;top:50%;left:50%;margin:-30px 0 0 -30px;-webkit-animation:rotation-data-v-111d72af 1s infinite linear;-moz-animation:rotation-data-v-111d72af 1s infinite linear;-o-animation:rotation-data-v-111d72af 1s infinite linear;animation:rotation-data-v-111d72af 1s infinite linear;border:6px solid rgba(0,0,0,.2);border-radius:100%}.spinner[data-v-111d72af]:before{content:\"\";display:block;position:absolute;left:-6px;top:-6px;height:100%;width:100%;border-top:6px solid rgba(0,0,0,.8);border-left:6px solid transparent;border-bottom:6px solid transparent;border-right:6px solid transparent;border-radius:100%}@-webkit-keyframes rotation-data-v-111d72af{from{-webkit-transform:rotate(0)}to{-webkit-transform:rotate(359deg)}}@-moz-keyframes rotation-data-v-111d72af{from{-moz-transform:rotate(0)}to{-moz-transform:rotate(359deg)}}@-o-keyframes rotation-data-v-111d72af{from{-o-transform:rotate(0)}to{-o-transform:rotate(359deg)}}@keyframes rotation-data-v-111d72af{from{transform:rotate(0)}to{transform:rotate(359deg)}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__ = "data-v-111d72af";
/* module identifier */
var __vue_module_identifier__ = "data-v-111d72af";
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);
var component$1 = __vue_component__;// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = component$1;

  // Attach install function executed by Vue.use()
  installable.install = function (Vue) {
    Vue.component('VueFullAutocomplete', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// Attach named exports directly to component. IIFE/CJS will
// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)
Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    exportName = _ref2[0],
    exported = _ref2[1];
  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;