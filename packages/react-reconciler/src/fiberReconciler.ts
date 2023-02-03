import type { Container } from 'hostConfig'
import type { ReactElement } from 'shared/ReactTypes'
import { FiberNode, FiberRootNode } from './fiber'
import { createUpdate, createUpdateQueue, enqueueUpdate } from './updateQueue'
import type { UpdateQueue } from './updateQueue'
import { HostRoot } from './workTags'
import { scheduleUpdateOnFiber } from './workLoop'

export function createContainer(container: Container): FiberRootNode {
  const hostRootFiber = new FiberNode(HostRoot, {}, null)
  const root = new FiberRootNode(container, hostRootFiber)
  hostRootFiber.updateQueue = createUpdateQueue()
  return root
}
export function updateContainer(element: ReactElement | null, root: FiberRootNode) {
  const hostRootFiber = root.current
  const update = createUpdate<ReactElement | null>(element)
  enqueueUpdate(hostRootFiber.updateQueue as UpdateQueue<ReactElement | null>, update)
  scheduleUpdateOnFiber(hostRootFiber)
  return element
}
