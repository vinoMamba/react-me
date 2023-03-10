import path from 'path'
import fs from 'fs'
import tsPlugin from 'rollup-plugin-typescript2'
import cjsPlugin from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'

const pkgPath = path.resolve(__dirname, '../../packages')
const distPath = path.resolve(__dirname, '../../dist/node_modules')

export function resolvePath(pkgName, isDist) {
  if (isDist) {
    return `${distPath}/${pkgName}`
  }
  return `${pkgPath}/${pkgName}`
}

export function getPkgJson(pkgName) {
  const path = `${resolvePath(pkgName)}/package.json`
  const pkgStr = fs.readFileSync(path, 'utf-8')
  return JSON.parse(pkgStr)
}

export function getBaseRollupPlugins({ alias = {
  __DEV__: true
} }, tsConfig = {}) {
  return [
    replace(alias),
    cjsPlugin(),
    tsPlugin(tsConfig),
  ]
}
