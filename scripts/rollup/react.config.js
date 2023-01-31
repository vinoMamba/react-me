import pkgJsonPlugin from 'rollup-plugin-generate-package-json'
import { getBaseRollupPlugins, getPkgJson, resolvePath } from './utils'

const { name, module } = getPkgJson('react')
const pkgPath = resolvePath(name)
const pkgDistPath = resolvePath(name, true)

export default [
  {
    input: `${pkgPath}/${module}`,
    output: {
      file: `${pkgDistPath}/index.js`,
      name: 'react.js',
      format: 'umd',
    },
    plugins: [...getBaseRollupPlugins(), pkgJsonPlugin({
      inputFolder: pkgPath,
      outputFolder: pkgDistPath,
      baseContents: ({ name, description, version }) => ({
        name,
        description,
        version,
        main: 'index.js',
      }),
    })],
  },
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [
      {
        file: `${pkgDistPath}/jsx-runtime.js`,
        name: 'jsx-runtime.js',
        format: 'umd',
      },
      {
        file: `${pkgDistPath}/jsx-dev-runtime.js`,
        name: 'jsx-dev-runtime.js',
        format: 'umd',
      },
    ],
    plugins: getBaseRollupPlugins(),
  },
]
