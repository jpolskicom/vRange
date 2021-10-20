# vRange

### Ussage

Just import module into your component.
Build in styles are not required, but without any styling component will not work as expected.

```
    import vRangeSlider from 'v-range'
    import 'v-range/dist/vRangeSlider.css'

```

### Avaible options: 

| Prop | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| value | Array | [0, 100] | Privides initial values |
| label | Array | ["from", "to"] | Labels for min,max values |
| unit | String | 'PLN' | Unit display at input fields |
| range | Array | [0, 100] | Min-max slider values |
| step | Number | 1 | Number of steps between min-max values |
| showSteps | Boolean | false | That option generates div for each step that may be used for show track step points |
| lazy | Number | 500 | Delay (ms) before emit value by component after change |
| logarithmic | Boolean | false| Makes values growth logarithmic |