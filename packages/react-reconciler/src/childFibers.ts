import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import { ReactElement } from "shared/ReactTypes";
import { createFiberFromElement, FiberNode } from "./fiber";
import { Placement } from "./fiberFlags";
import { HostText } from "./workTags";

function ChildReconciler(shouldTrackEffects: boolean) {

  function reconcileSingleElement(returnFiber: FiberNode, currentFiber: FiberNode | null, element: ReactElement) {
    const fiber = createFiberFromElement(element)
    fiber.return = returnFiber
    return fiber
  }

  function reconcileSinglgeTextNode(returnFiber: FiberNode, currentFiber: FiberNode | null, content: string | number) {
    const fiber = new FiberNode(HostText, { content }, null)
    fiber.return = returnFiber
    return fiber
  }

  function placeSingleChild(fiber: FiberNode) {
    if (shouldTrackEffects && fiber.alternate === null) {
      fiber.flags |= Placement
    }
    return fiber
  }

  return function reconcileChildFibers(returnFiberNode: FiberNode, currentFiberNode: FiberNode | null, newChild?: ReactElement) {
    // TODO
    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE: {
          return placeSingleChild(reconcileSingleElement(returnFiberNode, currentFiberNode, newChild))
        }
        default: {
          if (__DEV__) {
            console.warn('未实现的reconciler类型', newChild)
          }
          break
        }
      }
    }
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      return placeSingleChild(reconcileSinglgeTextNode(returnFiberNode, currentFiberNode, newChild))
    }
    if (__DEV__) {
      console.warn('未实现的reconciler类型', newChild)
    }
    return null
  }
}




export const reconcileChildFibers = ChildReconciler(true)
export const mountChildFibers = ChildReconciler(false)
