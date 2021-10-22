// import necessary dependencies
import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble'; // Transpile/polyfill with reasonable browser support
import postcss from 'rollup-plugin-postcss'

export default {
    input: 'src/index.js', // entry file for our components
    output: {
        name: 'VRangeComponent',
        exports: 'named',
    },
    plugins: [
        commonjs(),
        vue({
            css: false, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        postcss({
            extract: 'styles.css'
        }),
        buble(), // Transpile to ES5
    ],
}