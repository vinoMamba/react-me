import type { Key, Props, Ref } from 'shared/ReactTypes'
import type { Flag } from './fiberFlags'
import { NoFlags } from './fiberFlags'
import type { WorkTag } from './workTags'

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
  alternate: FiberNode | null
  flags: Flag

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

    this.alternate = null
    this.flags = NoFlags
  }
}
