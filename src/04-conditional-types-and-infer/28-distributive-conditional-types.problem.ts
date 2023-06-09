import { Equal, Expect } from "../helpers/type-utils";

type Fruit = "apple" | "banana" | "orange";

//solution 1
// type AppleOrBanana = Fruit extends infer T
//   ? T extends "apple" | "banana"
//     ? T
//     : never
//   : never;

//solution 2
type GetAppleOrBanana<T> = T extends "apple" | "banana" ? T : never;
type AppleOrBanana = GetAppleOrBanana<Fruit>;

type tests = [Expect<Equal<AppleOrBanana, "apple" | "banana">>];
