import reduceValues from "@unction/reducevalues";
import upTo from "@unction/upto";
export default function nestedApply(iterator) {
  return function nestedApplyIterator(unction) {
    return function nestedApplyIteratorUnction(depth) {
      return reduceValues(accumulatedUnction => () => iterator(accumulatedUnction))(iterator(unction))(upTo(depth));
    };
  };
}
