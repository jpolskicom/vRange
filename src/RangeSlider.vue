<template>
  <div class="c-rangeSlider" ref="rangeSlider">
    <div class="c-rangeSlider__labelFrom">
      {{ label[0] }}
    </div>

    <template v-for="(handle, key) in value">
      <div :class="`c-rangeSlider__handleInput c-rangeSlider__handleInput--${key}`" :key="`i${key}`">
        <input
          type="number"
          v-model="params.inputValue[key]"
          v-on:input="setHandleByInput()"
          :step="step"
          :min="key - 1 < !0 ? params.values[key - 1] : range[0]"
          :max="
            key + 1 < params.inputValue.length
              ? params.values[key + 1]
              : range[1]
          "
        />
        {{ unit }}
      </div>
    </template>

    <div class="c-rangeSlider__wrap">
      <div class="c-rangeSlider__track"></div>
      <div class="c-rangeSlider__bar"></div>
      <div
        class="c-rangeSlider__mid"
        :style="{ left: `${params.middlePrecentage}%` }"
      ></div>
      <template v-for="(handle, key) in value">
        <div
          class="c-rangeSlider__handle"
          :key="`h${key}`"
          draggable="false"
        ></div>
      </template>
      <div class="c-rangeSlider__steps" v-if="showSteps">
        <div
          v-for="step in steps"
          class="c-rangeSlider__step"
          :key="`step${step}`"
        ></div>
      </div>
    </div>
    <div class="c-rangeSlider__labelTo">
      {{ label[1] }}
    </div>
  </div>
</template>
<script>
export default {
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
    }
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
        ? Math.round(value * (Math.log(value + 1) / Math.log(this.range[1])))
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
          this.$emit("change", Object.values(this.params.inputValue));
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
};
</script>
<style lang="scss">
$orange: #ff7300;
$white: #fff;
$gray: #676767;

.c-rangeSlider {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1.5rem;
  position: relative;
  &__labelFrom,
  &__labelTo {
    padding: 0.25rem 0.5rem;
  }
  &__wrap {
    width: 100%;
    margin: 0.25rem 0.5rem;
    position: relative;
    cursor: pointer;
  }
  &__track {
    width: 100%;
    height: 10px;
    background-color: $gray;
    border-radius: 5px;
  }
  &__bar {
    height: 10px;
    background-color: $orange;
    border-radius: 5px;
    position: absolute;
    top: 0;
  }
  &__mid {
    height: 10px;
    background-color: $white;
    border-radius: 5px;
    position: absolute;
    width: 1px;
    top: 0;
    z-index: 999;
  }
  &__steps {
    display: flex;
    justify-content: space-around;
  }
  &__step {
    width: 100%;
    &:after {
      content: "";
      display: block;
      background: $white;
      height: 15px;
      width: 1px;
      margin: 0 auto;
    }
  }
  &__handle {
    width: 18px;
    height: 18px;
    background: $white;
    border-radius: 50%;
    position: absolute;
    top: -4px;
    transform: translateX(-50%);
  }
  &__handleInput {
    user-select: none;
    position: absolute;
    top: -35px;
    background: transparent;
    border: 1px solid $gray;
    color: $white;
    padding: 0.25rem;
    border-radius: 0.25rem;
    width: 110px;
    left: 0;
    font-size: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &--1 {
      right: 0;
      left: auto;
    }
    input {
      border: 0;
      background: transparent;
      width: 100%;
      color: $white;
      outline: none;
      -webkit-appearance: none;
      -moz-appearance: textfield;
      &::selection {
        background: transparent;
      }
    }
  }
}
</style>
