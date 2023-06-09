import { Equal, Expect } from "../helpers/type-utils";

const parser1 = {
  parse: () => 1,
};

const parser2 = () => "123";

const parser3 = {
  extract: () => true,
};

// type GetParserResult<T> = T extends () => infer Res
//   ? Res
//   : T extends {
//       parse: infer TRes extends (...args: any) => any;
//     }
//   ? ReturnType<TRes>
//   : T extends {
//       extract: infer TRes extends (...args: any) => any;
//     }
//   ? ReturnType<TRes>
//   : never;

// type GetParserResult<T> = T extends () => infer Res
//   ? Res
//   : T extends {
//       parse: () => infer TRes;
//     }
//   ? TRes
//   : T extends {
//       extract: () => infer TRes;
//     }
//   ? TRes
//   : never;

type GetParserResult<T> = T extends
  | (() => infer TRes)
  | {
      parse: () => infer TRes;
    }
  | {
      extract: () => infer TRes;
    }
  ? TRes
  : never;

type tests = [
  Expect<Equal<GetParserResult<typeof parser1>, number>>,
  Expect<Equal<GetParserResult<typeof parser2>, string>>,
  Expect<Equal<GetParserResult<typeof parser3>, boolean>>
];
