import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'

const ENV = process.env.NODE_ENV

const config = {
  input: 'src/index.js',
  plugins: []
}

if (ENV === 'es' || ENV === 'cjs') {
  config.output = { format: ENV }
  config.plugins.push(
    babel({
      plugins: ['@babel/plugin-external-helpers']
    })
  )
}

if (ENV === 'development' || ENV === 'production') {
  config.output = { format: 'umd', name: 'createReducer' }
  config.plugins.push(
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['@babel/plugin-external-helpers']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    })
  )
}

if (ENV === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true
      },
      warnings: false
    })
  )
}

export default config
