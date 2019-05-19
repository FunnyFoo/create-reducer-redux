import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'

const ENV = process.env.NODE_ENV

const config = {
  input: 'src/index.ts',
  plugins: [sizeSnapshot()]
}

if (ENV === 'es' || ENV === 'cjs') {
  config.output = { format: ENV }
  config.plugins.push(typescript())
}

if (ENV === 'development' || ENV === 'production') {
  config.output = { format: 'umd', name: 'createReducer' }
  config.plugins.push(
    nodeResolve({
      mainFields: ['jsnext:main', 'main']
    }),
    typescript({ module: 'CommonJS' }),
    commonjs({ extensions: ['.js', '.ts'] }),
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
