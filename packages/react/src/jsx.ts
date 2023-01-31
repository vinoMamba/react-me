import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols'
import type { ElementType, Key, Props, ReactElement, Ref, Type } from 'shared/ReactTypes'

export const reactElement = function (type: Type, key: Key, ref: Ref, props: Props): ReactElement {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: 'vino',
  }
  return element
}

export const jsx = function (type: ElementType, config: any, ...mabyeChildren: any) {
  let key: Key = null
  const porps: Props = {}
  let ref: Ref = null
  for (const prop in config) {
    const val = config[prop]

    if (prop === 'key') {
      if (prop !== undefined) {
        key = `${val}`
      }
      continue
    }

    if (prop === 'ref') {
      if (prop !== undefined) {
        ref = val
      }
      continue
    }

    if ({}.hasOwnProperty.call(config, prop)) {
      porps[prop] = val
    }
  }

  const mabyeChildrenLength = mabyeChildren.length
  if (mabyeChildrenLength) {
    if (mabyeChildrenLength === 1) {
      porps.children = mabyeChildren[0]
    }
    else {
      porps.children = mabyeChildren
    }
  }

  return reactElement(type, key, ref, porps)
}

export const jsxDEV = function (type: ElementType, config: any) {
  let key: Key = null
  const porps: Props = {}
  let ref: Ref = null
  for (const prop in config) {
    const val = config[prop]

    if (prop === 'key') {
      if (prop !== undefined) {
        key = `${val}`
      }
      continue
    }

    if (prop === 'ref') {
      if (prop !== undefined) {
        ref = val
      }
      continue
    }

    if ({}.hasOwnProperty.call(config, prop)) {
      porps[prop] = val
    }
  }

  return reactElement(type, key, ref, porps)
}
