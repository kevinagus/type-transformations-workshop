import { Equal, Expect } from "../helpers/type-utils";

const getServerSideProps = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const json: { title: string } = await data.json();
  return {
    props: {
      json,
    },
  };
};

// type InferPropsFromServerSideFunction<T extends (...args: any) => any> =
//   Awaited<ReturnType<T>> extends {
//     props: infer TFuncResult;
//   }
//     ? TFuncResult
// : never;

type InferPropsFromServerSideFunction<T> = T extends () => Promise<{
  props: infer TFuncResult;
}>
  ? TFuncResult
  : never;

type tests = [
  Expect<
    Equal<
      InferPropsFromServerSideFunction<typeof getServerSideProps>,
      { json: { title: string } }
    >
  >
];
