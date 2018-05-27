import reduceValues from "@unction/reducevalues"
import upTo from "@unction/upto"

import type {UnaryFunctionType} from "types"
import type {MapFunctionType} from "types"
import type {EnumerableType} from "types"

type IteratorFunctionType = MapFunctionType => EnumerableType => EnumerableType;

export default function nestedApply (iterator: IteratorFunctionType): UnaryFunctionType {
  return function nestedApplyIterator (unction: MapFunctionType): UnaryFunctionType {
    return function nestedApplyIteratorUnction (depth: number): UnaryFunctionType {
      return reduceValues(
        (accumulatedUnction: IteratorFunctionType): UnaryFunctionType =>
          (): IteratorFunctionType =>
            iterator(accumulatedUnction)
      )(
        iterator(unction)
      )(
        upTo(depth)
      )
    }
  }
}
