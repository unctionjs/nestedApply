import reduceValues from "@unction/reducevalues";
import upTo from "@unction/upto";
import {MapperFunctionType} from "./types";

export default function nestedApply<A, B> (iterator: (a: MapperFunctionType<A, B>) => (b: Array<A> | Set<A> | Record<string | number | symbol, B> | Map<B, A> | string) => Array<B> | Set<B> | RecordType<B, unknown> | string) {
  return function nestedApplyIterator (unction: MapperFunctionType<A, B>) {
    return function nestedApplyIteratorUnction (depth: number) {
      return reduceValues(
        (accumulatedUnction: MapperFunctionType<A, B>) =>
          () =>
            iterator(accumulatedUnction)
      )(
        iterator(unction)
      )(
        upTo(depth)
      );
    };
  };
}
