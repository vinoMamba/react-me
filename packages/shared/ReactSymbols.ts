const symbolSupport = typeof Symbol === 'function' && Symbol.for

export const REACT_ELEMENT_TYPE = symbolSupport ? Symbol.for('react.element') : 0xEAC7
