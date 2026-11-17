import alias from '@rollup/plugin-alias'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import copy from 'rollup-plugin-copy'
import cleaner from 'rollup-plugin-cleaner'
import { mkdirSync } from 'fs'

const production = !process.env.ROLLUP_WATCH
const port = 8001
const livereloadPort = 35739
const outputDir = 'dist/2ring'

// livereload can't watch a directory that doesn't exist yet
if (!production) {
  mkdirSync(outputDir, { recursive: true })
}

export default {
  input: 'src/main.js',
  output: {
    dir: outputDir,
    entryFileNames: 'app.js',
    format: 'iife',
    sourcemap: !production ? 'inline' : false,
    name: 'app',
  },
  plugins: [
    // cleaning on every watch rebuild deletes the served files and breaks the
    // livereload watcher, so only clean for production builds
    production &&
      cleaner({
        targets: [
          'dist'
        ]
      }),
    copy({
      targets: [
        { src: 'src/index.html', dest: outputDir }
      ],
      // re-copying on every watch rebuild triggers a livereload per file
      copyOnce: !production
    }),
    json(),
    alias({
      entries: [{ find: '@', replacement: __dirname + '/src' }],
    }),
    postcss({
      extract: 'app.css',
      to: `${outputDir}/app.css`,
      config: { path: 'postcss.config.js' }
    }),
    nodeResolve({
      browser: true,
      extensions: ['.js', '.json', '.vue']
    }),
    commonjs(),
    vue({
      css: false,
      needMap: false,
      template: {
        compilerOptions: {
          preserveWhitespace: false,
        },
      },
    }),
    replace({
      'process.env.NODE_ENV': production ? '"production"' : '"development"',
      preventAssignment: true,
    }),
    esbuild({
      minify: production,
      target: 'es2015',
    }),
    !production &&
      serve({
        open: true,
        openPage: '/2ring/',
        contentBase: 'dist',
        historyApiFallback: '/2ring/',
        port,
      }),
    !production &&
      livereload({
        watch: outputDir,
        port: livereloadPort,
        // let rollup finish writing the bundle before the browser fetches it
        delay: 300
      }),
  ],
  watch: {
    clearScreen: true,
  },
}
