import { ReactElement } from "shared/ReactTypes";
import { FiberNode } from "./fiber";

function ChildReconciler(shouldTrackEffects: boolean) {

  return function reconcileChildFibers(returnFiberNode: FiberNode, currentFiberNode: FiberNode | null, newChild?: ReactElement) {
    // TODO
    return new FiberNode(0, {}, null)
  }
}
export const reconcileChildFibers = ChildReconciler(true)
export const mountChildFibers = ChildReconciler(false)
