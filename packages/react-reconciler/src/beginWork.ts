import { ReactElement } from 'shared/ReactTypes'
import { mountChildFibers, reconcileChildFibers } from './childFibers'
import type { FiberNode } from './fiber'
import { processUpdateQueue, UpdateQueue } from './updateQueue'
import { HostComponent, HostRoot, HostText } from './workTags'

export const beginWork = (wip: FiberNode) => {
  // return child FiberNode
  switch (wip.tag) {
    case HostRoot:
      return updateHostRoot(wip)
    case HostComponent:
      return updateHostComponent(wip)
    case HostText:
      return null
    default:
      if (__DEV__) {
        console.warn('beginWork未实现的类型: ', wip)
      }
      break
  }
}

function updateHostRoot(wip: FiberNode) {
  const baseState = wip.memoizedState
  const updateQueue = wip.updateQueue as UpdateQueue<Element>
  const pending = updateQueue.shared.pending
  updateQueue.shared.pending = null
  const { memorizedState } = processUpdateQueue(baseState, pending)
  wip.memoizedState = memorizedState
  const nextChildren = wip.memoizedState
  reconcileChildren(wip, nextChildren)
  return wip.child
}

function updateHostComponent(wip: FiberNode) {
  const nextProps = wip.pendingProps
  const nextChildren = nextProps.children
  reconcileChildren(wip, nextChildren)
  return wip.child
}


function reconcileChildren(wip: FiberNode, children?: ReactElement) {
  const current = wip.alternate
  if (current !== null) {
    wip.child = reconcileChildFibers(wip, current?.child, children)
  } else {
    wip.child = mountChildFibers(wip, null, children)
  }
}

