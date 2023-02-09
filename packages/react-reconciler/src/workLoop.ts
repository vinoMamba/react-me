import { beginWork } from './beginWork'
import { completeWork } from './completeWork'
import type { FiberNode, FiberRootNode } from './fiber'
import { createWorkInProgress } from './fiber'
import { HostRoot } from './workTags'

let workInProgress: FiberNode | null = null

function prepareRefreshStack(root: FiberRootNode) {
  workInProgress = createWorkInProgress(root.current, {})
}

/**
 * 在 fiber 中调度更新 
 * @param fiber 
 */
export function scheduleUpdateOnFiber(fiber: FiberNode) {
  // TODO: schedule
  const root = markUpdateFromFiberToRoot(fiber)
  renderRoot(root)
}

/**
 * 
 * @param fiber 
 * @returns 
 */
function markUpdateFromFiberToRoot(fiber: FiberNode) {
  let node = fiber
  let parent = node.return
  while (parent !== null) {
    node = parent
    parent = node.return
  }
  if (node.tag === HostRoot) {
    return node.stateNode
  }
  return null
}

function renderRoot(root: FiberRootNode) {
  prepareRefreshStack(root)
  do {
    try {
      workLoop()
      break
    }
    catch (error) {
      if (__DEV__) {
        console.warn('workLoop error: ', error)
      }
      workInProgress = null
    }
  } while (true)
}

function workLoop() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}

function performUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber)
  // ...
  fiber.memoizedProps = fiber.pendingProps

  if (next === null) {
    completeUnitOfWork(fiber)
  }
  else {
    workInProgress = next
  }
}

function completeUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber
  do {
    completeWork(node)
    const sibling = node.sibling

    if (sibling !== null) {
      workInProgress = sibling
    }
    else {
      node = node.return
      workInProgress = node
    }
  } while (node !== null)
}
