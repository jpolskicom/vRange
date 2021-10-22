(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vRangeSlider"] = factory();
	else
		root["vRangeSlider"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fe4d");
/******/ })
/************************************************************************/
/******/ ({

/***/ "c5ab":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "cac4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_RangeSlider_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e037");
/* harmony import */ var _C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_RangeSlider_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_webwizards_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_RangeSlider_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e037":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fe4d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "RangeSlider", function() { return /* reexport */ RangeSlider; });

// CONCATENATED MODULE: C:/Users/webwizards/AppData/Roaming/npm/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("c5ab")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: C:/Users/webwizards/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"63ee5cb4-vue-loader-template"}!C:/Users/webwizards/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!C:/Users/webwizards/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!C:/Users/webwizards/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/RangeSlider.vue?vue&type=template&id=191a2726&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"rangeSlider",staticClass:"c-rangeSlider"},[_c('div',{staticClass:"c-rangeSlider__labelFrom"},[_vm._v(" "+_vm._s(_vm.label[0])+" ")]),_c('div',{staticClass:"c-rangeSlider__wrap"},[_c('div',{staticClass:"c-rangeSlider__track"}),_c('div',{staticClass:"c-rangeSlider__bar"}),_c('div',{staticClass:"c-rangeSlider__mid",style:({ left: ((_vm.params.middlePrecentage) + "%") })}),_vm._l((_vm.value),function(handle,key){return [_c('div',{key:("h" + key),staticClass:"c-rangeSlider__handle",attrs:{"draggable":"false"}}),_c('div',{key:("i" + key),staticClass:"c-rangeSlider__handleInput"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.params.inputValue[key]),expression:"params.inputValue[key]"}],attrs:{"type":"number","min":key - 1 < !0 ? _vm.params.values[key - 1] : _vm.range[0],"max":key + 1 < _vm.params.inputValue.length
              ? _vm.params.values[key + 1]
              : _vm.range[1]},domProps:{"value":(_vm.params.inputValue[key])},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.params.inputValue, key, $event.target.value)},function($event){return _vm.setHandleByInput()}]}}),_vm._v(" "+_vm._s(_vm.unit)+" ")])]}),(_vm.showSteps)?_c('div',{staticClass:"c-rangeSlider__steps"},_vm._l((_vm.steps),function(step){return _c('div',{key:("step" + step),staticClass:"c-rangeSlider__step"})}),0):_vm._e()],2),_c('div',{staticClass:"c-rangeSlider__labelTo"},[_vm._v(" "+_vm._s(_vm.label[1])+" ")])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/RangeSlider.vue?vue&type=template&id=191a2726&

// CONCATENATED MODULE: C:/Users/webwizards/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!C:/Users/webwizards/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/RangeSlider.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var RangeSlidervue_type_script_lang_js_ = ({
  data() {
    return {
      slider: null,
      sliderTrack: null,
      sliderBar: null,
      sliderHandlers: null,
      sliderInputs: null,
      timer: null,
      params: {
        precentage: [],
        middlePrecentage: 50,
        inputValue: [],
        values: [],
        dragging: [false, false],
      },
    };
  },
  props: {
    value: {
      type: Array,
      default: () => [0, 100],
    },
    label: {
      type: Array,
      default: () => ["from", "to"],
    },
    unit: {
      type: String,
      default: () => "PLN",
    },
    range: {
      type: Array,
      default: () => [0, 100],
    },
    step: {
      type: Number,
      default: () => 1,
    },
    showSteps: {
      type: Boolean,
      default: () => false,
    },
    lazy: {
      type: Number,
      default: () => 500,
    },
    logarithmic: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    steps() {
      return (this.range[1] - this.range[0]) / this.step;
    },
  },
  methods: {
    addEventsToHandlers() {
      this.sliderHandlers.forEach((handle, key) => {
        handle.addEventListener(
          "mousedown",
          () => (this.params.dragging[key] = true),
          false
        );
        this.slider.addEventListener(
          "mouseup",
          () => (this.params.dragging[key] = false),
          false
        );
        this.slider.addEventListener(
          "mousemove",
          (event) => {
            if (this.params.dragging[key]) {
              this.handleDragging(event, key);
            }
          },
          false
        );
      });

      const track = this.slider.querySelector(".c-rangeSlider__wrap");
      track.addEventListener("click", this.handleClick);
    },
    handleDragging(event, index) {
      let precentage = this.getPrecentageFromTrack(event.clientX);
      this.params.inputValue = [...this.params.values];
      this.setHandlePosition(precentage, this.sliderHandlers[index], index);
    },
    handleClick(event) {
      let precentage = this.getPrecentageFromTrack(event.clientX);
      this.params.inputValue = [...this.params.values];
      let handleIndex = precentage > this.params.middlePrecentage ? 1 : 0;
      this.setHandlePosition(
        precentage,
        this.sliderHandlers[handleIndex],
        handleIndex
      );
    },
    getPrecentageFromTrack(position) {
      let track = this.sliderTrack.getBoundingClientRect();
      let relativePosition = position - track.left;
      let precentage = Math.round((100 * relativePosition) / track.width);
      return precentage;
    },
    getPrecentageFromValue(value) {
      let val = false
        ? undefined
        : Math.round((100 * value) / this.range[1]);

      return val;
    },
    getValue(precentage) {
      let val = this.logarithmic
        ? Math.round(precentage * (Math.log(precentage + 1) / Math.log(100)))
        : precentage;

      return Math.round(this.range[1] * (val / this.steps));
    },
    setHandleByInput() {
      this.params.inputValue.forEach((e, k) => {
        this.setHandlePosition(
          this.getPrecentageFromValue(e),
          this.sliderHandlers[k],
          k
        );
      });
    },
    setHandlePosition(precentage, element, index) {
      let prevHandleValue = this.params.precentage[index - 1]
        ? this.params.precentage[index - 1]
        : 0;
      let nextHandleValue = this.params.precentage[index + 1]
        ? this.params.precentage[index + 1]
        : 100;

      if (
        precentage >= 0 &&
        precentage <= 100 &&
        precentage >= prevHandleValue &&
        precentage <= nextHandleValue
      ) {
        element.style.left = `${precentage}%`;

        this.params.precentage[index] = precentage;
        this.params.values[index] = this.getValue(precentage);

        this.setBarPosition();
      }
    },
    initHandlesPositions() {
      this.params.precentage = this.value.map((e) =>
        this.getPrecentageFromValue(e)
      );

      this.params.precentage.forEach((value, k) =>
        this.setHandlePosition(value, this.sliderHandlers[k], k)
      );

      this.params.values = this.value;
      this.params.inputValue = [...Object.values(this.params.values)];
    },
    setBarPosition() {
      this.sliderBar.style.left = `${this.params.precentage[0]}%`;
      this.sliderBar.style.right = `${100 - this.params.precentage[1]}%`;

      this.params.middlePrecentage =
        (this.params.precentage[1] + this.params.precentage[0]) / 2;
    },
  },
  watch: {
    params: {
      handler() {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.timer = setTimeout(() => {
          this.$emit("change", Object.values(this.params.values));
        }, this.lazy);
      },
      deep: true,
    },
    value: {
      handler() {
        if (
          this.value[0] == this.params.values[0] &&
          this.value[1] == this.params.values[1]
        ) {
          return;
        }
        this.initHandlesPositions();
      },
      deep: true,
    },
    range: {
      handler() {
        this.initHandlesPositions();
      },
      deep: true,
    },
  },
  mounted() {
    this.slider = this.$refs.rangeSlider;
    this.sliderTrack = this.slider.querySelector(".c-rangeSlider__track");
    this.sliderBar = this.slider.querySelector(".c-rangeSlider__bar");
    this.sliderHandlers = this.slider.querySelectorAll(".c-rangeSlider__handle");
    this.sliderInputs = this.slider.querySelectorAll(".c-rangeSlider__input");

    this.initHandlesPositions();

    this.addEventsToHandlers();
  },
});

// CONCATENATED MODULE: ./src/RangeSlider.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_RangeSlidervue_type_script_lang_js_ = (RangeSlidervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/RangeSlider.vue?vue&type=style&index=0&lang=scss&
var RangeSlidervue_type_style_index_0_lang_scss_ = __webpack_require__("cac4");

// CONCATENATED MODULE: C:/Users/webwizards/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/RangeSlider.vue






/* normalize component */

var component = normalizeComponent(
  src_RangeSlidervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var RangeSlider = (component.exports);
// CONCATENATED MODULE: ./src/index.js

// CONCATENATED MODULE: C:/Users/webwizards/AppData/Roaming/npm/node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js




/***/ })

/******/ });
});
//# sourceMappingURL=vRangeSlider.umd.js.map