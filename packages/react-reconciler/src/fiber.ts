import type { Container } from 'hostConfig'
import type { Key, Props, ReactElement, Ref } from 'shared/ReactTypes'
import type { Flag } from './fiberFlags'
import { NoFlags } from './fiberFlags'
import { HostComponent, WorkTag } from './workTags'
import { FunctionComponent } from './workTags'

export class FiberNode {
  type: any
  tag: WorkTag
  pendingProps: Props
  key: Key
  stateNode: any

  return: FiberNode | null
  sibling: FiberNode | null
  child: FiberNode | null
  index: number
  ref: Ref

  memoizedProps: Props | null
  memoizedState: any
  alternate: FiberNode | null
  flags: Flag
  updateQueue: unknown

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    this.tag = tag
    this.key = key
    this.stateNode = null
    this.type = null

    this.return = null
    this.sibling = null
    this.child = null
    this.index = 0

    this.ref = null

    this.pendingProps = pendingProps
    this.memoizedProps = null
    this.memoizedState = null

    this.alternate = null
    this.flags = NoFlags
    this.updateQueue = null
  }
}

/**
 * React.createRoot(rootElement).render(<App />)
 * 1. createRoot 会创建一个 FiberRootNode。即当前应用统一的根节点
 * 2. rootElement hostRootFiber
 */

export class FiberRootNode {
  container: Container
  current: FiberNode
  finishedWork: FiberNode | null
  constructor(container: Container, hostRootFiber: FiberNode) {
    this.container = container
    this.current = hostRootFiber
    hostRootFiber.stateNode = this
    this.finishedWork = null
  }
}

/**
 * 创建 workInProgress FiberNode 
 * @param current 
 * @param pendingProps 
 * @returns 
 */
export const createWorkInProgress = (current: FiberNode, pendingProps: Props): FiberNode | null => {
  let wip = current.alternate
  if (wip === null) {
    // mount
    wip = new FiberNode(current.tag, pendingProps, current.key)
    wip.type = current.type
    wip.stateNode = current.stateNode

    wip.alternate = current
    current.alternate = wip
  }
  else {
    // update
    wip.pendingProps = pendingProps
    wip.flags = NoFlags
  }
  wip.type = current.type
  wip.updateQueue = current.updateQueue
  wip.child = current.child
  wip.memoizedProps = current.memoizedProps
  wip.memoizedState = current.memoizedState
  return wip
}

export function createFiberFromElement(element: ReactElement): FiberNode {
  const { type, key, props } = element
  let fiberTag: WorkTag = FunctionComponent
  if (typeof type === 'string') {
    fiberTag = HostComponent
  } else if (typeof type !== 'function' && __DEV__) {
    console.warn('未定义的type 类型', element)
  }
  const fiber = new FiberNode(fiberTag, props, key)
  fiber.type = type
  return fiber
}
