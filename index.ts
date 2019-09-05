import reduceValues from "@unction/reducevalues";
import upTo from "@unction/upto";
import {MapperFunctionType} from "./types";
import {EnumerableType} from "./types";

export default function nestedApply<A, B> (iterator: (a: MapperFunctionType<A, B>) => (b: EnumerableType<A>) => EnumerableType<B>) {
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
