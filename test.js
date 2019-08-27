/* eslint-disable no-magic-numbers */
import {indexBy} from "ramda";
import {groupBy} from "ramda";
import dig from "@unction/dig";
import get from "@unction/get";
import mapValues from "@unction/mapvalues";

import nestedApply from "./";

test("works", () => {
  expect(
    nestedApply(mapValues)((value) => `${value}`)(0)([1])
  ).toEqual(
    ["1"]
  );
});


test("works", () => {
  expect(
    nestedApply(mapValues)((value) => `${value}`)(1)([[1]])
  ).toEqual(
    [["1"]]
  );
});

test("works", () => {
  expect(
    nestedApply(mapValues)((value) => `${value}`)(2)([[[1]]])
  ).toEqual(
    [[["1"]]]
  );
});

test("works", () => {
  expect(
    nestedApply(mapValues)(indexBy(get("id")))(0)(
      [
        [
          {
            id: "a1",
            type: "commercial",
          },
          {
            id: "a2",
            type: "commercial",
          },
        ],
        [
          {
            id: "b1",
            type: "residential",
          },
          {
            id: "b2",
            type: "residential",
          },
        ],
      ]
    )
  ).toEqual(
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
  );
});
test("works", () => {
  expect(
    nestedApply(mapValues)(groupBy(dig(["attributes", "version"])))(1)(
      {
        res: {
          accounts: [{
            id: "a1",
            type: "res",
            attributes: {
              version: "v1",
              namespace: "accounts",
            },
          }, {
            id: "a2",
            type: "res",
            attributes: {
              version: "v1",
              namespace: "accounts",
            },
          }],
          profiles: [{
            id: "b1",
            type: "res",
            attributes: {
              version: "v1",
              namespace: "profiles",
            },
          }, {
            id: "b1",
            type: "res",
            attributes: {
              version: "v2",
              namespace: "profiles",
            },
          }],
        },
      }
    )
  ).toEqual(
    {
      res: {
        accounts: {
          v1: [
            {
              id: "a1",
              type: "res",
              attributes: {
                version: "v1",
                namespace: "accounts",
              },
            },
            {
              id: "a2",
              type: "res",
              attributes: {
                version: "v1",
                namespace: "accounts",
              },
            },
          ],
        },
        profiles: {
          v1: [
            {
              id: "b1",
              type: "res",
              attributes: {
                version: "v1",
                namespace: "profiles",
              },
            },
          ],
          v2: [
            {
              id: "b1",
              type: "res",
              attributes: {
                version: "v2",
                namespace: "profiles",
              },
            },
          ],
        },
      },
    }
  );
});
