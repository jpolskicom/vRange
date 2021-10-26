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
//
//
//
//

var script = {
  data: function data() {
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
      default: function () { return [0, 100]; },
    },
    label: {
      type: Array,
      default: function () { return ["from", "to"]; },
    },
    unit: {
      type: String,
      default: function () { return "PLN"; },
    },
    range: {
      type: Array,
      default: function () { return [0, 100]; },
    },
    step: {
      type: Number,
      default: function () { return 1; },
    },
    showSteps: {
      type: Boolean,
      default: function () { return false; },
    },
    lazy: {
      type: Number,
      default: function () { return 500; },
    },
    logarithmic: {
      type: Boolean,
      default: function () { return false; },
    },
  },
  computed: {
    steps: function steps() {
      return (this.range[1] - this.range[0]) / this.step;
    },
  },
  methods: {
    addEventsToHandlers: function addEventsToHandlers() {
      var this$1 = this;

      this.sliderHandlers.forEach(function (handle, key) {
        handle.addEventListener(
          "mousedown",
          function () { return (this$1.params.dragging[key] = true); },
          false
        );
        this$1.slider.addEventListener(
          "mouseup",
          function () { return (this$1.params.dragging[key] = false); },
          false
        );
        this$1.slider.addEventListener(
          "mousemove",
          function (event) {
            if (this$1.params.dragging[key]) {
              this$1.handleDragging(event, key);
            }
          },
          false
        );
      });

      var track = this.slider.querySelector(".c-rangeSlider__wrap");
      track.addEventListener("click", this.handleClick);
    },
    handleDragging: function handleDragging(event, index) {
      var precentage = this.getPrecentageFromTrack(event.clientX);
      this.params.inputValue = [].concat( this.params.values );
      this.setHandlePosition(precentage, this.sliderHandlers[index], index);
    },
    handleClick: function handleClick(event) {
      var precentage = this.getPrecentageFromTrack(event.clientX);
      this.params.inputValue = [].concat( this.params.values );
      var handleIndex = precentage > this.params.middlePrecentage ? 1 : 0;
      this.setHandlePosition(
        precentage,
        this.sliderHandlers[handleIndex],
        handleIndex
      );
    },
    getPrecentageFromTrack: function getPrecentageFromTrack(position) {
      var track = this.sliderTrack.getBoundingClientRect();
      var relativePosition = position - track.left;
      var precentage = Math.round((100 * relativePosition) / track.width);
      return precentage;
    },
    getPrecentageFromValue: function getPrecentageFromValue(value) {
      var val =  Math.round((100 * value) / this.range[1]);

      return val;
    },
    getValue: function getValue(precentage) {
      var val = this.logarithmic
        ? Math.round(precentage * (Math.log(precentage + 1) / Math.log(100)))
        : precentage;

      return Math.round(this.range[1] * (val / this.steps));
    },
    setHandleByInput: function setHandleByInput() {
      var this$1 = this;

      this.params.inputValue.forEach(function (e, k) {
        this$1.setHandlePosition(
          this$1.getPrecentageFromValue(e),
          this$1.sliderHandlers[k],
          k
        );
      });
    },
    setHandlePosition: function setHandlePosition(precentage, element, index) {
      var prevHandleValue = this.params.precentage[index - 1]
        ? this.params.precentage[index - 1]
        : 0;
      var nextHandleValue = this.params.precentage[index + 1]
        ? this.params.precentage[index + 1]
        : 100;

      if (
        precentage >= 0 &&
        precentage <= 100 &&
        precentage >= prevHandleValue &&
        precentage <= nextHandleValue
      ) {
        element.style.left = precentage + "%";

        this.params.precentage[index] = precentage;
        this.params.values[index] = this.getValue(precentage);

        this.setBarPosition();
      }
    },
    initHandlesPositions: function initHandlesPositions() {
      var this$1 = this;

      this.params.precentage = this.value.map(function (e) { return this$1.getPrecentageFromValue(e); }
      );

      this.params.precentage.forEach(function (value, k) { return this$1.setHandlePosition(value, this$1.sliderHandlers[k], k); }
      );

      this.params.values = this.value;
      this.params.inputValue = [].concat( Object.values(this.params.values) );
    },
    setBarPosition: function setBarPosition() {
      this.sliderBar.style.left = (this.params.precentage[0]) + "%";
      this.sliderBar.style.right = (100 - this.params.precentage[1]) + "%";

      this.params.middlePrecentage =
        (this.params.precentage[1] + this.params.precentage[0]) / 2;
    },
  },
  watch: {
    params: {
      handler: function handler() {
        var this$1 = this;

        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.timer = setTimeout(function () {
          this$1.$emit("change", Object.values(this$1.params.values));
        }, this.lazy);
      },
      deep: true,
    },
    value: {
      handler: function handler() {
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
      handler: function handler() {
        this.initHandlesPositions();
      },
      deep: true,
    },
  },
  mounted: function mounted() {
    this.slider = this.$refs.rangeSlider;
    this.sliderTrack = this.slider.querySelector(".c-rangeSlider__track");
    this.sliderBar = this.slider.querySelector(".c-rangeSlider__bar");
    this.sliderHandlers = this.slider.querySelectorAll(".c-rangeSlider__handle");
    this.sliderInputs = this.slider.querySelectorAll(".c-rangeSlider__input");

    this.initHandlesPositions();

    this.addEventsToHandlers();
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
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
    var hook;
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
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { ref: "rangeSlider", staticClass: "c-rangeSlider" },
    [
      _c("div", { staticClass: "c-rangeSlider__labelFrom" }, [
        _vm._v("\n    " + _vm._s(_vm.label[0]) + "\n  ")
      ]),
      _vm._v(" "),
      _vm._l(_vm.value, function(handle, key) {
        return [
          _c(
            "div",
            {
              key: "i" + key,
              class:
                "c-rangeSlider__handleInput c-rangeSlider__handleInput--" + key
            },
            [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.params.inputValue[key],
                    expression: "params.inputValue[key]"
                  }
                ],
                attrs: {
                  type: "number",
                  min: key - 1 < !0 ? _vm.params.values[key - 1] : _vm.range[0],
                  max:
                    key + 1 < _vm.params.inputValue.length
                      ? _vm.params.values[key + 1]
                      : _vm.range[1]
                },
                domProps: { value: _vm.params.inputValue[key] },
                on: {
                  input: [
                    function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.params.inputValue, key, $event.target.value);
                    },
                    function($event) {
                      return _vm.setHandleByInput()
                    }
                  ]
                }
              }),
              _vm._v("\n      " + _vm._s(_vm.unit) + "\n    ")
            ]
          )
        ]
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "c-rangeSlider__wrap" },
        [
          _c("div", { staticClass: "c-rangeSlider__track" }),
          _vm._v(" "),
          _c("div", { staticClass: "c-rangeSlider__bar" }),
          _vm._v(" "),
          _c("div", {
            staticClass: "c-rangeSlider__mid",
            style: { left: _vm.params.middlePrecentage + "%" }
          }),
          _vm._v(" "),
          _vm._l(_vm.value, function(handle, key) {
            return [
              _c("div", {
                key: "h" + key,
                staticClass: "c-rangeSlider__handle",
                attrs: { draggable: "false" }
              })
            ]
          }),
          _vm._v(" "),
          _vm.showSteps
            ? _c(
                "div",
                { staticClass: "c-rangeSlider__steps" },
                _vm._l(_vm.steps, function(step) {
                  return _c("div", {
                    key: "step" + step,
                    staticClass: "c-rangeSlider__step"
                  })
                }),
                0
              )
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _c("div", { staticClass: "c-rangeSlider__labelTo" }, [
        _vm._v("\n    " + _vm._s(_vm.label[1]) + "\n  ")
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

/* eslint-disable import/prefer-default-export */

// Declare install function executed by Vue.use()
function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Vue.component('VRangeComponent', __vue_component__);
}

// Create module definition for Vue.use()
var plugin = {
    install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default __vue_component__;
export { install };
