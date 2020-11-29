# @unction/nestedApply

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (MapperFunctionType<A, B> => Array<A> | Set<A> | Record<string | number | symbol, B> | Map<B, A> | string => Array<B> | Set<B> | RecordType<B, unknown> | string) =>
>   MapperFunctionType<A, B> =>
>     number =>
>       Array<A> | Set<A> | Record<string | number | symbol, B> | Map<B, A> | string =>
>         Array<A> | Set<A> | Record<string | number | symbol, B> | Map<B, A> | string

Takes a function (the application) that takes function(s) (later referred to as
the inner) and value(s) (`mapValues()`, `forEach()`, `selectValues()`), a function (the inner)
that will be applied to a value(s), and finally a number (depth) to apply that
applicator around the inner.

In the below example we want to take two sets of records and index them by id:

``` javascript
const records = [
  [
    {
      id: "a1",
      type: "commercial",
    },
    {
      id: "a2",
      type: "commercial",
    }
  ],
  [
    {
      id: "b1",
      type: "residential",
    },
    {
      id: "b2",
      type: "residential",
    }
  ]
]
```

Normally we'd just do `mapValues(indexBy(key("id")))`, however we can make this easier and dynamic:

``` javascript
const nestedIndexById = nestedApply(mapValues)(indexBy(key("id")))(1)

nestedIndexById(records)
```

And the result:

``` javascript
[
  {
    a1: {
      id: "a1",
      type: "commercial",
    },
    a2: {
      id: "a2",
      type: "commercial",
    },
  },
  {
    b1: {
      id: "b1",
      type: "residential",
    },
    b2: {
      id: "b2",
      type: "residential",
    },
  },
]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/nestedApply.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/nestedApply.svg?maxAge=2592000&style=flat-square
