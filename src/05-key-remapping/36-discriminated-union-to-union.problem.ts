import { Equal, Expect } from "../helpers/type-utils";

type Fruit =
  | {
      name: "apple";
      color: "red";
    }
  | {
      name: "banana";
      color: "yellow";
    }
  | {
      name: "orange";
      color: "orange";
    };

// type TransformedFruit = keyof {
//   [F in Fruit as `${F["name"]}:${F["color"]}`]: F;
// };

type TransformedFruit = {
  [F in Fruit as F["name"]]: `${F["name"]}:${F["color"]}`;
}[Fruit["name"]];

type tests = [
  Expect<
    Equal<TransformedFruit, "apple:red" | "banana:yellow" | "orange:orange">
  >
];
